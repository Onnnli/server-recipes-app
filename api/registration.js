import express from "express";

import UserModel from '../models/user.model.js'

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const data = await UserModel.create({
      name: req.body.name,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })

    if(!data) {
      return res.status(401).json('Something went wrong!');
    }

    return res.status(200)
  } catch (e) {
    res.json(e);
  }
});

export default router;