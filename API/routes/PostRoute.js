import express from "express";
import {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
} from "../controller/PostController.js";
import  upload from "../middleware/uploads.js";

const router = express.Router();

router.post("/posts", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
]), createPost);


router.get("/posts", getPosts);


router.get("/posts/:id", getPost);


router.put("/posts/:id", upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
]), updatePost);


router.delete("/posts/:id", deletePost);

export default router;