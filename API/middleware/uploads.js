import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Temporary storage for chunks
const chunksStorage = {};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
        cb(null, Date.now() + "-" + sanitizedFileName);
    },
});

const upload = multer({ storage });

// Middleware to handle chunked uploads
export const handleChunkedUpload = (req, res, next) => {
    const { fileId, chunkNumber, totalChunks } = req.body;

    if (!fileId || !chunkNumber || !totalChunks) {
        return res.status(400).json({ error: "Missing required fields: fileId, chunkNumber, or totalChunks" });
    }

    if (!chunksStorage[fileId]) {
        chunksStorage[fileId] = [];
    }

    upload.single("file")(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const chunk = req.file;
        chunksStorage[fileId][chunkNumber] = chunk.path;

        if (chunksStorage[fileId].length === parseInt(totalChunks)) {
            // All chunks uploaded, reassemble the file
            const filePath = path.join(__dirname, "../uploads", `${fileId}_final.mp4`);
            const writeStream = fs.createWriteStream(filePath);

            for (let i = 0; i < chunksStorage[fileId].length; i++) {
                const chunkPath = chunksStorage[fileId][i];
                const chunkData = fs.readFileSync(chunkPath);
                writeStream.write(chunkData);
                fs.unlinkSync(chunkPath); // Delete the chunk after reassembly
            }

            writeStream.end();
            delete chunksStorage[fileId]; // Clean up

            req.finalFilePath = filePath; // Attach the final file path to the request object
        }

        next();
    });
};

export default upload;