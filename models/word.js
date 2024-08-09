import mongoose from "mongoose";
const { Schema } = mongoose;

const word = new Schema({
    title_ar: String,
    title_en: String,
    type: String ,
}, { timestamps: true });

export default mongoose.models.word || mongoose.model('word', word);
