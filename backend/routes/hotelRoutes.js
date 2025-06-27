import express from 'express';
import {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel
} from '../controllers/hotelController.js';
import validateObjectId from '../middlewares/validateObjectId.js';
import verifyToken from '../middlewares/verifyToken.js'; // JWT auth middleware

const router = express.Router();

// @route   POST /api/hotels/
// @desc    Create a new hotel
// @access  Private (requires authentication)
router.post("/", verifyToken, createHotel);

// @route   GET /api/hotels/
// @desc    Get all hotels
// @access  Public
router.get("/", getAllHotels);

// @route   GET /api/hotels/:id
// @desc    Get hotel by ID
// @access  Public
router.get("/:id", validateObjectId, getHotelById);

// @route   PUT /api/hotels/:id
// @desc    Update hotel by ID
// @access  Private (requires authentication)
router.put("/:id", verifyToken, validateObjectId, updateHotel);

// @route   DELETE /api/hotels/:id
// @desc    Delete hotel by ID
// @access  Private (requires authentication)
router.delete("/:id", verifyToken, validateObjectId, deleteHotel);

export default router;
