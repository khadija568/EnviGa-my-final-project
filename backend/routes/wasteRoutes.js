// routes/wasteRoutes.ts
import express from "express";
const router = express.Router();
import Waste from "../models/Waste.js";
import { getAllWasteRequests, updateWasteStatus, deleteWasteById, getWasteByHotelId } from '../controllers/wasteController.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { weight, notes } = req.body;
    const hotelId = req.user.id;
    if (!weight) {
      return res.status(400).json({ error: "Weight is required" });
    }

    console.log("Hotel ID:", hotelId);

    const newWaste = new Waste({ weight, notes, hotel: hotelId });
    await newWaste.save();

    res.status(201).json({ message: "Waste submitted successfully" });
  } catch (error) {
    console.error("Error submitting waste:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// routes/wasteRoutes.js

router.get("/statistics", async (req, res) => {
  try {
    const stats = await Waste.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalWeight: { $sum: "$weight" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    res.json(stats);
  } catch (err) {
    console.error("Error fetching statistics:", err);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

// جلب كل الطلبات (لجمعية)
router.get('/requests', getAllWasteRequests);

// تحديث حالة الطلب
router.patch('/:id/status', updateWasteStatus);

// delet wast
router.delete('/:id', deleteWasteById)

//hotel wast
router.get("/hotel", getWasteByHotelId);

export default router;