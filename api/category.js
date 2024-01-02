import express from 'express'

import { CategoryRecipeModel, CategoryModel } from '../models/index.js'
import RecipeModel from '../models/recipe.model.js'
import UserModel from '../models/user.model.js'
const router = express.Router();

router.post('/category', async (req, res) => {
  const data =  await CategoryModel.create({
    name: req.body.name,
    slug: req.body.slug
  })

  if(!data) {
    return res.status(401).json('Something went wrong!');
  }


  return res.status(200).json(data);
})

router.get('/categories', async (req, res) => {
  const data =  await CategoryModel.findAll()

  if(!data) {
    return res.status(401).json('Something went wrong!');

  }

  return res.status(200).json(data);
})

router.get('/category/:categoryId/recipes', async (req, res) => {

  const categoryId = req.params.categoryId;

  const data =  await CategoryRecipeModel.findAll({
    where: {
      category_id: categoryId,
    },
    include: [{
      model: RecipeModel,
      include: UserModel
    },
      CategoryModel
    ],
  })

  if(!data) {
    return res.status(401).json('Something went wrong!');
  }

  return res.status(200).json(data);
})

router.get('/recipes/:recipeId/categories', async (req, res) => {

  const recipeId = req.params.recipeId;

  const data =  await CategoryRecipeModel.findAll({
    where: {
      recipe_id: recipeId,
    },
    include: CategoryModel,
  })


  if(!data) {
    return res.status(401).json('Something went wrong!');
  }

  return res.status(200).json(data);
})

export default router;