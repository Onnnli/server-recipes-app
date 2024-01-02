import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const IngredientRecipeModel = sequelize.define("IngredientsRecipe", {
  id_ingredient_recipe: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false,
    autoIncrement: false,
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false,
    autoIncrement: false,
  },
  amount: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: false,
    autoIncrement: false,
  }
}, {
  timestamps: false
});

export default IngredientRecipeModel;