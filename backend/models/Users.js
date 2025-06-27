import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  isValidated: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['admin', 'hotel', 'association', 'user'],
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);
export default User;
