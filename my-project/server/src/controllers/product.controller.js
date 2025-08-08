import ProductModel from '../models/product.modal.js';

import { v2 as cloudinary } from 'cloudinary';
import { error } from "console";
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

export async function createProduct(request, response){
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage);
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPages / perPage);

        if(page > totalPages) {
            return response.status(404).json({
                message: "Page not Found",
                error:true,
                success:false
            });
        }

        const products = await ProductModel.find().populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

        let product = new ProductModel({
            name: request.body.name,
            description: request.body.description,
            images: imagesArr,
            brand: request.body.brand,
            price: request.body.price,
            oldPrice: request.body.oldPrice,
            catName: request.body.catName,
            catId: request.body.catId,
            subCatId: request.body.subCatId,
            subCat: request.body.subCat,
            thirdsubCat: request.body.thirdsubCat,
            thirdsubCatId: request.body.thirdsubCatId,
            countInStock: request.body.countInStock,
            rating: request.body.rating,
            isFeatured: request.body.isFeatured,
            discount: request.body.discount,
            productRam: request.body.productRam,
            size: request.body.size,
            productWeight: request.body.productWeight
            
        });

        product = await product.save();

        if(!product) {
            response.status(500).json({
                error: true,
                success: false,
                message: "Product Not created"
            });
        }

        imagesArr = [];

        response.status(200).json({
                error: false,
                success: true,
                message: "Product created successfully"
            });

    } catch (error) {
         return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getAllProducts(request, response){
    try {
        const products = await ProductModel.find();

        if(!products){
            response.status(500).json({
            error: true,
            success: false
        }) 
        }

         return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page
        })
        
    } catch (error) {
         return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
 
 