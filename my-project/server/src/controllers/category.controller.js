import CategoryModel from "../models/category.model";

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



        //remove image from cloudinary




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
            
            avtar: imagesArr[0]
        });

    } catch (error) {


        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })



    }
}