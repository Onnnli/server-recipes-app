import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const RecipeModel = sequelize.define("Recipes", {
  id_recipe: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  hours:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  minutes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false,
    autoIncrement: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  servings: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: false
});

export default RecipeModel;