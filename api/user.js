import express from "express";

import UserModel from '../models/user.model.js'
import { upload } from '../middlewares.js'

const router = express.Router();

router.put("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const data = await UserModel.update({
      name: req.body.name,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    },{
      where: {
        id_user: userId
      }
    })

    if(!data) {
      return res.status(401).json('Something went wrong!');
    }


    return res.status(200).json({ data, token: `${data.email}_${data.password}` })

  } catch (e) {
    res.json(e);
  }
});


router.delete("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    await UserModel.destroy({
        where: {
          id_user: userId
        }
    })

    return res.status(200);

  } catch (e) {
    res.json(e);
  }
});

router.post('/user/:userId/upload-photo', upload.single('image'), async (req, res) => {
  const userId = req.params.userId;

  const data =  await UserModel.update({
    image: req.file.path,
  },{
    where: {
      id_user: userId
    }
  })

  if(!data) {
    return res.status(401).json('Something went wrong!');
  }


  return res.status(200).json({ data, token: `${data.email}_${data.password}` });
})


router.get('/recipes/user/:userId',async (req, res) =>{
  const userId = req.params.userId;

  const data =  await UserModel.findOne({
    id_user: userId,
  })

  if(!data) {
    return res.status(401).json('Something went wrong!');
  }

  return res.status(200).json(data)
})
export default router;