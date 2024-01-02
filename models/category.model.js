import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CategoryModel = sequelize.define("Categorie", {
  id_category: {
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

export default CategoryModel;