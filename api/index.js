import express from "express";

import loginApi from './login.js'
import registrationApi from './registration.js'
import userApi from './user.js'
import categoryApi from './category.js'
import ingredientApi from './ingredient.js'
import recipeApi from './recipe.js'
import nutritionApi from './nutrition.js'

const router = express.Router();

//auth user
router.use(loginApi);
router.use(registrationApi);

//profile
router.use(userApi)

//recipes
router.use(categoryApi)
router.use(ingredientApi)
router.use(recipeApi)
router.use(nutritionApi)

export default router;