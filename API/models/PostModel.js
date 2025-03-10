import {DataTypes, Sequelize} from "sequelize"
import  database from "../config/database.js"
import  User from "./UserModel.js"
import Category from "./CategoryModel.js"

const Post = database.define("Post", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,

    },
   
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageURL: {
        type: DataTypes.STRING
    },
    videoURL: {
        type: DataTypes.STRING
    }


});

Post.belongsTo(User, {foreignKey: "userId", onDelete: "CASCADE"});
User.hasMany(Post, {foreignKey: "userId"})

Post.belongsTo(Category, {foreignKey: "categoryId", onDelete: "CASCADE"})

export default Post;