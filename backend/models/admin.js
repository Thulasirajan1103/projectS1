const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('admin_db', 'admin', 'adminpassword', {
    host: 'db', // Use the service name from docker-compose.yml
    dialect: 'mysql',
});

// Define the Admin Model
const Admin = sequelize.define('Admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure unique emails
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Sync models with the database
const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        // Sync the Admin model with the database
        await Admin.sync({ alter: true }); // Use `alter: true` in development for schema updates
        console.log('Admin table has been created/updated.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, Admin, initDb };
