import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sankalp1606:mongodb22@cluster0.negqt.mongodb.net/zwiggy').then(()=>console.log("DB Connected"));
}