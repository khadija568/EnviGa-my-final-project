import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// router.get("/dashboard", authMiddleware, (req, res) => {
//   res.json({ message: "Bienvenue dans votre dashboard", user: req.user });
// });

router.post("/register" , registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware);
router.get('/register', (req, res)=>{
    res.send('GET request to /api/auth/register is working')
})

export default router;