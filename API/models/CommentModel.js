import DataTypes from "sequelize"
import sequelize from "../config/database.js"
import Post from "./PostModel.js"
import  User from "./UserModel.js"

const Comment = sequelize.define("Comment", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId : {
        type: DataTypes.UUID,
        allowNull: false
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Comment.belongsTo(User, {foreignKey: "userId", onDelete: "CASCADE"});
User.hasMany(Comment, {foreignKey: "userId"});

Comment.belongsTo(Post, {foreignKey: "postId", onDelete: "CASCADE"});
Post.hasMany(Comment, {foreignKey: "postId"});

export default Comment;