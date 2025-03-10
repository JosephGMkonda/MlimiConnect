import  DataTypes from "sequelize"
import database from "../config/database.js"
import User from "./UserModel.js"
import Post from "./PostModel.js"

const UserReaction = database.define("UserReaction", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  postId: { type: DataTypes.UUID, allowNull: false },
  reaction: { type: DataTypes.ENUM("like", "dislike"), allowNull: false },
});

UserReaction.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(UserReaction, { foreignKey: "userId" });

UserReaction.belongsTo(Post, { foreignKey: "postId", onDelete: "CASCADE" });
Post.hasMany(UserReaction, { foreignKey: "postId" });

export default UserReaction;
