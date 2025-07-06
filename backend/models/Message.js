// backend/models/Message.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String, 
    enum: ['hotel', 'association'],// مثال: "hotel" أو "association"
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", MessageSchema);