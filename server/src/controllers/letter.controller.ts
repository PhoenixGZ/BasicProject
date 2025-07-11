import Income from '../models/Income';
import Envelope from '../models/Envelope';
import { Request, Response } from 'express';

async function getEnvelopes(req: Request, res: Response) {
    const envelopes = await Envelope.find();
    res.json(envelopes);
  }


//   Assumes only one income object exists
async function addIncome(req: Request, res: Response) {
    const { amount } = req.body;
    const existing = await Income.findOne();
    
    if (existing) {
        existing.amount += amount
        await existing.save()
        res.json(existing)
    } else {
        const income = await Income.create({ amount })
        res.json(income)
    }
}

async function getIncomeAndEnvelopes(req: Request, res: Response) {
    const [amount, envelopes] = await Promise.all([Income.findOne(), Envelope.find()]);
    const data = {amount, envelopes}
    
    if (amount) {
        res.json(data);
    } else {
        res.status(500);
    }
}

async function allocateIncome (req: Request, res: Response){
    const { envelopeId, amount } = req.body
    const income = await Income.findOne()
    const envelope = await Envelope.findById(envelopeId)
  
    if (!income || !envelope || income.amount < amount) {
      return res.status(400).json({ error: 'Invalid allocation' })
    }
  
    income.amount -= amount
    envelope.balance += amount
  
    await income.save()
    await envelope.save()
  
    res.json({ income, envelope })
}

async function spendFromEnvelope (req: Request, res: Response){
    const { envelopeId, amount } = req.body
    const envelope = await Envelope.findById(envelopeId)
  
    if (!envelope || envelope.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' })
    }
  
    envelope.balance -= amount
    await envelope.save()
  
    res.json(envelope)
  }

  async function createEnvelope(req: Request, res: Response) {
    try {
      const { name, balance = 0 } = req.body;
  
      if (!name) {
        return res.status(400).json({ error: 'Envelope name is required' });
      }
  
      const envelope = new Envelope({ name, balance });
      await envelope.save();
  
      res.status(201).json(envelope);
    } catch (error) {
      console.error('Error creating envelope:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

export {getEnvelopes, addIncome, allocateIncome, spendFromEnvelope, getIncomeAndEnvelopes, createEnvelope};