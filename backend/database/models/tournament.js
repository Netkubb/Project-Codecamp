module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('tournament', {
        name: {
            type: DataTypes.STRING(255)
        },
        content: {
            type: DataTypes.STRING(5000)
        },
        contact: {
            type: DataTypes.STRING(5000)
        },
        image: {
            type: DataTypes.STRING(5000)
        }
    }, {
        tableName: "tournaments",
        timestamps: false
    })

    model.associate = models => {
        model.belongsToMany(models.user, { through: models.own });
    }

    return model;
}