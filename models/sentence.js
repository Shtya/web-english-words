import mongoose from "mongoose";
const { Schema } = mongoose;

const sentence = new Schema({
    title_en: String,
    type: String,
}, { timestamps: true });

export default mongoose.models.sentence || mongoose.model('sentence', sentence);
