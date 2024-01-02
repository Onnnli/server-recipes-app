import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const NutritionModel = sequelize.define("Nutrition", {
  id_nutrition: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: false,
  },
  serving: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calories: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  carbohydrates: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  protein: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fat: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  saturatedFat : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cholesterol: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sodium: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  potassium: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fiber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sugar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vitaminA: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vitaminC: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  calcium: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  iron: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false
});


export default NutritionModel;