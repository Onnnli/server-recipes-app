import RecipeModel from './recipe.model.js'
import CategoryModel from './category.model.js'
import CategoryRecipeModel from './category-recipe.model.js'
import IngredientRecipeModel from './ingredient-recipe.model.js'
import IngredientModel from './ingredient.model.js'
import UserModel from './user.model.js'

RecipeModel.hasMany(CategoryModel, {
  onUpdate: 'CASCADE',
})

CategoryModel.hasMany(RecipeModel, {
  onUpdate: 'CASCADE',
})


IngredientRecipeModel.belongsTo(RecipeModel, {foreignKey: 'recipe_id'});

CategoryRecipeModel.belongsTo(CategoryModel, {foreignKey: 'category_id'});
CategoryRecipeModel.belongsTo(RecipeModel, {foreignKey: 'recipe_id'});

IngredientRecipeModel.belongsTo(IngredientModel, {foreignKey: 'ingredient_id'});
IngredientRecipeModel.belongsTo(RecipeModel, {foreignKey: 'recipe_id'});
RecipeModel.belongsTo(UserModel, {foreignKey: 'user_id'});

export { RecipeModel, CategoryModel, CategoryRecipeModel, IngredientRecipeModel };


