import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('User', userSchema)
