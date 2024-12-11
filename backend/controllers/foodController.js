import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item

const addFood = async (req, res) => {
    let image_filename = "default.jpg"; // Set a default image filename
    if (req.file) {
        image_filename = `${req.file.filename}`; // Use uploaded file if available
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

//  all food list
const listFood = async(req,res) => {

    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// remove food item
const removeFood = async(req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);   // to find the foodmodel using the id
        fs.unlink(`uploads/${food.image}`, ()={})     // to delete image from uploads folder

        await foodModel.findByIdAndDelete(req.body.id)   //  Our foodData will be deleted from database
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


export {addFood,listFood, removeFood}