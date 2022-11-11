const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Abilities extends Model {}

Abilities.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ability_desc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        character_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'character',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'abilities',
    }
)

module.exports = Abilities;