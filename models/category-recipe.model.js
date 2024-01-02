import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CategoryRecipeModel = sequelize.define("CategoryRecipe", {
  id_category_recipe: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  category_id: {
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
}, {
  timestamps: false
});


export default CategoryRecipeModel;