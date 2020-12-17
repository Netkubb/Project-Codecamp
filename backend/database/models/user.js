module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('user', {
        name: {
            type: DataTypes.STRING(255)
        },
        username: {
            type: DataTypes.STRING(255)
        },
        password: {
            type: DataTypes.STRING(255)
        }
    }, {
        tableName: "users",
        timestamps: false
    })

    model.associate = models => {
        model.belongsToMany(models.tournament, { through: models.own })
    }

    return model;
}