import express from "express";

import loginApi from './login.js'
import registrationApi from './registration.js'
import userApi from './user.js'

const router = express.Router();

//auth user
router.use(loginApi);
router.use(registrationApi);

//profile
router.use(userApi)

export default router;