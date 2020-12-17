module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('own', {}, { tableName: 'owns', timestamps: false });

    return model;
}