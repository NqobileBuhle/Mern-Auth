// models/Car.js
import { Schema, model as _model } from 'mongoose';
import express from 'express';
import mongoose from 'mongoose';

const CarSchema = mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  image:{type:String,required:true}
}, { timestamps: true });

export default _model('Car', CarSchema);
