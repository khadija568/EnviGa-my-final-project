import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  description: String,
  wasteTypes: [String], // ["Plastique", "Organique"]
  certified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
