import express from 'express'
import NutritionModel from '../models/nutrition.model.js'
const router = express.Router();

router.get('/nutrition/:recipeId', async (req, res) => {
  const { recipeId } = req.params

  const data =  await NutritionModel.findOne({
    where: {
      recipe_id: recipeId
    }
  })

  if(!data) {
    return res.status(401).json('Something went wrong!');
  }


  return res.status(200).json(data);
})

export default router;