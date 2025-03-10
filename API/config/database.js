import { Sequelize } from "sequelize";

const db = new Sequelize('MlimiConnectDB','root','', {
    host: "localhost",
    dialect: "mysql"
})

export default db;