import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema({
  amount: { type: Number, required: true, default: 0 }
})

export default mongoose.model('Income', incomeSchema)