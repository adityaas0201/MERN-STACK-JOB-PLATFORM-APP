import { Router } from "express";
import {login,logout,register}from './../controllers/authController.js';
import { validateLoginInput, validateRegisterInput } from './../middleware/validationMiddleware.js';
import rateLimiter from 'express-rate-limit'

const router=Router();
const apiLimiter=rateLimiter({
    windowMs:15*60*1000,
    max:100,
    message:{msg:'IP rate limit exceeded, retry in 15 minutes'}
});

router.post('/register',apiLimiter,validateRegisterInput,register);
router.post('/login',apiLimiter,validateLoginInput,login);
router.get('/logout',logout)

export default router;
