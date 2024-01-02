import IngredientModel from '../models/ingredient.model.js'

import express from 'express'
import { RecipeModel, IngredientRecipeModel } from '../models/index.js'
import CategoryModel from '../models/category.model.js'
import CategoryRecipeModel from '../models/category-recipe.model.js'
import NutritionModel from '../models/nutrition.model.js'
import UserModel from '../models/user.model.js'
import { upload } from '../middlewares.js'

const router = express.Router();



router.post('/recipes',async (req, res) => {
  const hour = +req.body.hour > 0 ? `${ req.body.hour } час(а/ов) ` : null;

    const data =  await RecipeModel.create({
      name: req.body.name,
      description: req.body.description,
      hours: req.body.hour,
      minutes: `${hour}${req.body.min} минут`,
      user_id: req.body.userId,
      servings: req.body.servings,
    });


    req.body.ingredients.map(async ing => {
      const findIng =  await IngredientModel.findOne({
        where: {
          id_ingredient: ing.ingredient
        }
      });

      await IngredientRecipeModel.create({
        ingredient_id: findIng.dataValues.id_ingredient,
        recipe_id: data.dataValues.id_recipe,
        amount: ing.amount,
      })
    });


    req.body.categories.map(async cat => {
      const findCat =  await CategoryModel.findOne({
        where: {
          id_category: cat
        }
      });

      if(!findCat) {
        return;
      }

      if(findCat) {
        await CategoryRecipeModel.create({
          category_id: findCat.dataValues.id_category,
          recipe_id: data.dataValues.id_recipe,
        })
      }
    })

    const nutr = await NutritionModel.create({
      recipe_id: data.dataValues.id_recipe,
      serving: req.body.nutrition.serving,
      calories: req.body.nutrition.calories,
      carbohydrates: req.body.nutrition.carbohydrates,
      protein: req.body.nutrition.protein,
      fat: req.body.nutrition.fat,
      saturatedFat: req.body.nutrition.saturatedFat,
      cholesterol: req.body.nutrition.cholesterol,
      sodium: req.body.nutrition.sodium,
      potassium: req.body.nutrition.potassium,
      fiber: req.body.nutrition.fiber,
      sugar: req.body.nutrition.sugar,
      vitaminA: req.body.nutrition.vitaminA,
      vitaminC: req.body.nutrition.vitaminC,
      calcium: req.body.nutrition.calcium,
      iron: req.body.nutrition.iron,
    });

  return res.status(200).json(data);
})


router.post('/recipes/:recipeId/upload-image',  upload.single('image'), async (req, res) => {
  const recipeId = req.params.recipeId;

  const data =  await RecipeModel.update({
    image: req.file.path,
  },{
    where: {
      id_recipe: recipeId
    }
  })

  if(!data) {
    return res.status(401).json('Something went wrong!');
  }


  return res.status(200).json( data);
})

router.get('/recipes', async (req, res) => {
  const data =  await RecipeModel.findAll({
    include: [UserModel]
  });

  if(!data) {
    return res.status(404).json('Something went wrong!');
  }

  return res.status(200).json(data)
})

router.get('/recipes/by-user/:userId', async (req, res) => {
  const data =  await RecipeModel.findAll({
    where: {
      user_id: req.params.userId
    },
    include: [UserModel]
  });

  if(!data) {
    return res.status(404).json('Something went wrong!');
  }

  return res.status(200).json(data)
})

router.post('/recipes/filter', async (req, res) => {
  const searchTitle = req.body.searchTitle;

  const whereSearch = req.body.searchIngredients.length ? {ingredient_id: req.body.searchIngredients}: {}

  const data = await IngredientRecipeModel.findAll({
    where: whereSearch,
    include: [{
      model: RecipeModel,
      include: UserModel
    }]
  })

  const findRecipes = searchTitle
    ? data.filter(recipe => recipe.Recipe.name.toLowerCase().includes(searchTitle.toLowerCase()))
    : data;


  const dataFindRecipe = findRecipes.map(rec => rec.Recipe)

  const dataUniq = dataFindRecipe.reduce((acc, el) => {
    if(acc.length > 0 && acc.find(accEl => accEl.id_recipe === el.id_recipe)) {
      return acc;
    }

    acc.push(el)

    return acc;
  }, [])

  if(!data) {
    return res.status(404).json('Something went wrong!');
  }

  return res.status(200).json(dataUniq)
})

router.delete('/recipes/:recipeId/delete',async (req, res) => {
  const recipeId = req.params.recipeId;



  await IngredientRecipeModel.destroy({
    where: {
      recipe_id: recipeId
    }
  })

  await CategoryRecipeModel.destroy({
    where: {
      recipe_id: recipeId
    }
  })

  await NutritionModel.destroy({
    where: {
      recipe_id: recipeId
    }
  })

  await RecipeModel.destroy({
    where: {
      id_recipe: recipeId,
    }
  })

  return res.status(200).json("done");
})


router.put('/recipes/:recipeId/edit',async (req, res) => {
  const recipeId = req.params.recipeId;


  const hour = +req.body.hour > 0 ? `${ req.body.hour } час(а/ов) ` : null;

  const data =  await RecipeModel.update({
    name: req.body.name,
    description: req.body.description,
    hours: req.body.hour,
    minutes: `${hour}${req.body.min} минут`,
    user_id: req.body.userId,
    servings: req.body.servings,
  }, {
    where: {
      id_recipe: recipeId
    }
  });

  await IngredientRecipeModel.destroy({
    where: {
      recipe_id: recipeId
    }
  })

  for (const ing of req.body.ingredients) {

    if(ing.ingredient) {
      await IngredientRecipeModel.create({
        ingredient_id: ing.ingredient,
        amount: ing.amount,
        recipe_id: recipeId
      })
    }
  }

  await CategoryRecipeModel.destroy({
    where: {
      recipe_id: recipeId
    }
  })


  req.body.categories.map(async cat => {
    if(cat) {
      await CategoryRecipeModel.create({
        category_id: cat,
        recipe_id: recipeId,
      })
    }
  })

   await NutritionModel.update({
    serving: req.body.nutrition.serving,
    calories: req.body.nutrition.calories,
    carbohydrates: req.body.nutrition.carbohydrates,
    protein: req.body.nutrition.protein,
    fat: req.body.nutrition.fat,
    saturatedFat: req.body.nutrition.saturatedFat,
    cholesterol: req.body.nutrition.cholesterol,
    sodium: req.body.nutrition.sodium,
    potassium: req.body.nutrition.potassium,
    fiber: req.body.nutrition.fiber,
    sugar: req.body.nutrition.sugar,
    vitaminA: req.body.nutrition.vitaminA,
    vitaminC: req.body.nutrition.vitaminC,
    calcium: req.body.nutrition.calcium,
    iron: req.body.nutrition.iron,
  }, {
    where: {
      recipe_id: recipeId
    }
  });

  return res.status(200).json(data);
})




export default router;