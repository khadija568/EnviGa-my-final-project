// models/Waste.js
import mongoose from "mongoose";

const WasteSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
  type: String,
  enum: ['pending', 'accepted', 'picked_up'],
  default: 'pending',
  },
});

const Wast = mongoose.model('Waste', WasteSchema);
export default Wast;