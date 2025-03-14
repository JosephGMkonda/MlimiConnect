import express from "express";
import cors from "cors";
import session, { Store } from "express-session";
import SequelizeStore from "connect-session-sequelize";
import database from "./config/database.js";
import dotenv from 'dotenv';
import AuthRoute from "./routes/AuthRoute.js";
import PostRoute from "./routes/PostRoute.js"
import commentRoute from "./routes/commentsRoute.js";
import UserModel from "./models/UserModel.js";
import PostModel from "./models/PostModel.js";
import CommentModel from "./models/CommentModel.js";
import CategoryModel from "./models/CategoryModel.js";
import PostTag from "./models/PostTag.js";
import UserProfile from "./models/UserProfileModel.js";
import UserReaction from "./models/UserReactionModel.js";

dotenv.config();

const app = express();

const SequelizeSessionStore = SequelizeStore(session.Store);
const store = new SequelizeSessionStore({
    db: database
});

(async () => {
    try {
        await database.sync({ force: false });  
        console.log("Database synced successfully");
    } catch (error) {
        console.error("Error syncing database", error);
    }
})();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 5173
}));

app.use(express.json());

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/post", PostRoute);
app.use("/api/v1/comments", commentRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
});
