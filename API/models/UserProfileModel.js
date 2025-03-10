import DataTypes from "sequelize"
import  sequelize from "../config/database.js"
import  User  from "./UserModel.js"


const UserProfile = sequelize.define("UserProfile", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    farmLocation: {
        type: DataTypes.STRING
    },
    farmSize: {
        type: DataTypes.STRING
    },
    farmingType: {
        type: DataTypes.ENUM("Crop","Livestock","Mixed")
    },
    bio: {
        type: DataTypes.TEXT
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true
        
    }
})
UserProfile.belongsTo(User, {foreignKey: "userId", onDelete: "CASCADE"});
User.hasOne(UserProfile, {"foreignKey": "userIs"});

export default UserProfile;
