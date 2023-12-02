import express from "express";

import UserModel from '../models/user.model.js'

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const data = await UserModel.findOne({
            where: {
                email: req.body.email,
                password: req.body.password,
            }
        })

        if(!data) {
            return res.status(401).json('User not found!');
        }

        return res.status(200).json( {
            ...data.dataValues, token: `${data.email}_${data.password}`});
    } catch (e) {
        res.json(e);
    }
});

export default router;