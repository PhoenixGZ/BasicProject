import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: ['checking', 'savings'],
    required: true
  },
  balance: { type: Number, default: 0 },
  userId: { type: String, required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Account', accountSchema)
