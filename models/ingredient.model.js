import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const IngredientModel = sequelize.define("Ingredient", {
  id_ingredient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

export default IngredientModel;