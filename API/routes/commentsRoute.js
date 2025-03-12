import express from "express";
import {
    createComment,
    getCommentsByPost,
    getCommentById,
    updateComment,
    deleteComment,
} from "../controller/CommentController.js";

const router = express.Router();


router.post("/comments", createComment);


router.get("/posts/:postId/comments", getCommentsByPost);


router.get("/comments/:id", getCommentById);


router.put("/comments/:id", updateComment);


router.delete("/comments/:id", deleteComment);

export default router;