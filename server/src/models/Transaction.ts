import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  accountNumber: { type: String, required: true, ref: 'Account' },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal'],
    required: true
  },
  amount: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Transaction', transactionSchema)
