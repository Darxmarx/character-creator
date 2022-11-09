const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.VARCHAR(50),
            allowNull: false,
        },
        alignment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        personality: {
            type: DataTypes.STRING,
        },
        physical_descbription: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },
        backstory: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        abilities_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'abilities',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'character',
    }
)

module.exports = Character;