// models/Envelope.ts
import mongoose from 'mongoose'

const envelopeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 }
})

export default mongoose.model('Envelope', envelopeSchema)