import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item

const addFood = async (req, res) => {
    let image_filename = "default.jpg"; // Set a default image filename
    if (req.file) {
        image_filename = req.file.filename; // Use uploaded file if available
    }

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding food item" });
    }
};


export {addFood}