import IngredientModel from '../models/ingredient.model.js'

import express from 'express'
import IngredientRecipeModel from '../models/ingredient-recipe.model.js'
import { RecipeModel } from '../models/index.js'
import UserModel from '../models/user.model.js'
const router = express.Router();

router.get('/ingredients/recipes/:recipeId', async (req, res) => {
  const recipeId = req.params.recipeId;


  const data = await IngredientRecipeModel.findAll({
    where: {
      recipe_id: recipeId
    },
    include: [IngredientModel]
  })

  if(!data) {
    return res.status(401).json('Something went wrong!');
  }


  return res.status(200).json(data);
})

router.post('/ingredients', async (req, res) => {
  const data =  await IngredientModel.create({
    name: req.body.name,
    slug: req.body.slug
  })

  if(!data) {
    return res.status(401).json('Something went wrong!');
  }


  return res.status(200).json('data');
})

router.get('/ingredients', async (req, res) => {
  const data =  await IngredientModel.findAll()

  if(!data) {
    return res.status(401).json('Something went wrong!');
  }


  return res.status(200).json(data);
})

router.get('/ingredients/:slug', async (req, res) => {

  const slug = req.params.slug;

  const data =  await IngredientModel.findOne({
    where: {
      slug: slug
    }
  })

  if(!data) {
    return res.status(401).json('Something went wrong!');
  }


  return res.status(200).json(data);
})

router.post('/ingredients/shop-list', async (req, res) => {
  const whereSearch = req.body.length ? {ingredient_id: req.body}: {}

  const data = await IngredientRecipeModel.findAll({
    where: whereSearch,
    include: [IngredientModel]
  })

  if(!data) {
    return res.status(404).json('Something went wrong!');
  }
  return res.status(200).json(data)
})



export default router;