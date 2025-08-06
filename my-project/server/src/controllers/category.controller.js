import CategoryModel from "../models/category.model.js";

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: "dfsumz4wl",
    api_key: "731292745923114",
    api_secret: "_jbNc_Zv_cAdBfXi9mHO8l98MRU",
    secure: true
});

var imagesArr = [];
//image upload
export const uploadImages = async (request, response) => {


    try {
        imagesArr = [];


        
        const image = request.files;




        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false
        };
        for (let i = 0; i < image?.length; i++) {

            const result = await cloudinary.uploader.upload(image[i].path, options);
            imagesArr.push(result.secure_url);
            try {
                fs.unlinkSync(`uploads/${request.files[i].filename}`);
            } catch (err) {
                console.error("File deletion error:", err.message);
            }



        }

        return response.status(200).json({
            images: imagesArr
        });

    } catch (error) {


        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })



    }
}

export async function createCategory(request, response){
    try {
        let category = new CategoryModel({
            name: request.body.name,
            images: imagesArr,
            color: request.body.color,
            parentId: request.body.parentId,
            parentCatName: request.body.parentCatName,
        });

        if(!category){
            return response.status(500).json({
                message: "Category not created",
                error: true,
                success: false
            })
        }

        category = await category.save();
        imagesArr = [];
        
        return response.status(500).json({
                message: "Category created",
                error: false,
                success: true,
                category: category
            })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getCategories(request, response){
 try {
    const categories = await CategoryModel.find();
    const categoryMap = {};

    categories.forEach(cat => {
        categoryMap[cat._id] = {...cat._doc, children: []};

        const rootCategories = [];
    });
 } catch (error) {
    return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
 }

 }