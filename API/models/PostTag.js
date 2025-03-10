import  DataTypes from "sequelize"
import  database from "../config/database.js"
import  Post from "./PostModel.js"

const Tag = database.define("Tag", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const PostTag = database.define("PostTag", {});

Post.belongsToMany(Tag, { through: PostTag });
Tag.belongsToMany(Post, { through: PostTag });

export default { Tag, PostTag };
