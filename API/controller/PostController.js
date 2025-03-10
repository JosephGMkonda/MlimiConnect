
import User from "../models/UserModel.js";
import sharp from "sharp";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import Post from "../models/PostModel.js";
import { rimraf } from "rimraf";
import { handleChunkedUpload } from "../middleware/uploads.js";

// Compress image
const compressImage = async (filePath) => {
    const compressedFilePath = filePath.replace(/\.[^/.]+$/, "_compressed.jpg");
    try {
        await sharp(filePath)
            .jpeg({ quality: 80 }) 
            .toFile(compressedFilePath);
        return compressedFilePath;
    } finally {
        sharp.cache(false); 
    }
};

// Delete file with retry mechanism
const deleteFile = async (filePath, retries = 3, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await rimraf(filePath); // Forcefully delete the file
            console.log("File deleted successfully:", filePath);
            return;
        } catch (err) {
            if (i === retries - 1) {
                console.error("Error deleting file after retries:", err);
            } else {
                console.warn(`Retrying file deletion (${i + 1}/${retries})...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }
};

// Upload to Cloudinary
const uploadToCloudinary = async (filePath, resourceType = "image") => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: resourceType === "image" ? "mlimiconnect/images" : "mlimiconnect/videos",
            resource_type: resourceType,
        });
        return result.secure_url;
    } catch (error) {
        console.error(`Error uploading to Cloudinary (${resourceType}):`, error);
        throw error;
    }
};

export const createPost = async (req, res) => {
    try {
        const { userId, content } = req.body;

        // Check if files were uploaded
        const imageFile = req.files?.image?.[0];
        const videoFile = req.finalFilePath; // Reassembled video file path

        let imageURL = null;
        let videoURL = null;

        // Upload image to Cloudinary if provided
        if (imageFile) {
            const compressedImagePath = await compressImage(imageFile.path);
            imageURL = await uploadToCloudinary(compressedImagePath, "image");
            await deleteFile(compressedImagePath); // Delete the compressed file
            await deleteFile(imageFile.path); // Delete the original file
        }

        // Upload video to Cloudinary if provided
        if (videoFile) {
            videoURL = await uploadToCloudinary(videoFile, "video");
            await deleteFile(videoFile); // Delete the reassembled file
        }

        // Create the post with the Cloudinary URLs
        const post = await Post.create({
            userId,
            content,
            imageURL,
            videoURL,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Endpoint for chunked video uploads
export const uploadVideoChunk = async (req, res) => {
    try {
        handleChunkedUpload(req, res, async () => {
            if (req.finalFilePath) {
                res.json({ success: true, filePath: req.finalFilePath });
            } else {
                res.json({ success: true, message: "Chunk uploaded" });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [User],
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getPost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [User],
        });

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const updatePost = async (req, res) => {
    try {
        const { userId, content } = req.body;
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        
        const imageFile = req.files?.image?.[0];
        const videoFile = req.files?.video?.[0];

        
        if (imageFile) {
            const imageResult = await cloudinary.uploader.upload(imageFile.path, {
                folder: "mlimiconnect/images",
                quality: "auto",
            });
            post.imageURL = imageResult.secure_url;
            fs.unlinkSync(imageFile.path); 
        }

        
        if (videoFile) {
            const videoResult = await cloudinary.uploader.upload(videoFile.path, {
                folder: "mlimiconnect/videos",
                resource_type: "video",
            });
            post.videoURL = videoResult.secure_url;
            fs.unlinkSync(videoFile.path);
        }

        
        post.userId = userId;
        post.content = content;

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        
        if (post.imageURL) {
            const publicId = post.imageURL.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`mlimiconnect/images/${publicId}`);
        }

        if (post.videoURL) {
            const publicId = post.videoURL.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`mlimiconnect/videos/${publicId}`, {
                resource_type: "video",
            });
        }

    
        await post.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};