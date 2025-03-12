import DataTypes from "sequelize"
import sequelize from "../config/database.js"

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

User.belongsToMany(User, {
    through: "UserFollowers", 
    as: "Followers", 
    foreignKey: "followingId", 
});

User.belongsToMany(User, {
    through: "UserFollowers", 
    as: "Following", 
    foreignKey: "followerId", 
});

export default User;