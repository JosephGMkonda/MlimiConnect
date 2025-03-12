import Comment from "../models/CommentModel.js";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";


export const createComment = async (req, res) => {
    try {
        const { userId, postId, text } = req.body;

        
        if (!userId || !postId || !text) {
            return res.status(400).json({ error: "userId, postId, and text are required" });
        }

        
        const user = await User.findByPk(userId);
        const post = await Post.findByPk(postId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        
        const comment = await Comment.create({
            userId,
            postId,
            text,
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        
        if (!postId) {
            return res.status(400).json({ error: "postId is required" });
        }

        
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        
        const comments = await Comment.findAll({
            where: { postId },
            include: [
                {
                    model: User,
                    attributes: ["id", "username"], 
                },
            ],
        });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;

        
        if (!id) {
            return res.status(400).json({ error: "Comment ID is required" });
        }

        
        const comment = await Comment.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ["id", "username"], 
                },
                {
                    model: Post,
                    attributes: ["id", "content"], 
                },
            ],
        });

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

    
        if (!id || !text) {
            return res.status(400).json({ error: "Comment ID and text are required" });
        }

        
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

    
        comment.text = text;
        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        
        if (!id) {
            return res.status(400).json({ error: "Comment ID is required" });
        }

        
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        
        await comment.destroy();

        res.status(204).json(); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};