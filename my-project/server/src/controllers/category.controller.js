import CategoryModel from "../models/category.model.js";

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

        
    });

    const rootCategories = [];
        categories.forEach(cat => {
            if(cat.parentId){
                categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
            } else {
                rootCategories.push(categoryMap[cat._id]);

            }
        });

return response.status(200).json({
           error: false,
            success: true,
            data: rootCategories
        })

 } catch (error) {
    return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
 }

 }

 export async function getCategoriesCount(request, response){
try {
   const categoryCount = await CategoryModel.countDocuments({parentId:undefined});
   if(!categoryCount){
    response.status(500).json({ 
        success: false,
    error: true 
});

   } 
   else{
    response.send({
        categoryCount: categoryCount
    })
   }
} catch (error) {
    return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
}
 }

 export async function getSubCategoriesCount(request, response){
try {
   const categories = await CategoryModel.find();
   if(!categories){
    response.status(500).json({ 
        success: false,
    error: true 
});

   } 
   else{
    const subCatList = [];
    for(let cat of categories){
        if(cat.parentId!==undefined){
            subCatList.push(cat);
        }
    }
    
    response.send({
        SubcategoryCount: subCatList.length
    })

   }
} catch (error) {
    return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
}
 }

 //get single category

 export async function getCategory(request, response){
try {
    const category = await CategoryModel.findById(request.params.id);
     
    if(!category){
    return response.status(500).json({ 
        message: "The category with the given ID was not found",
        error: true,
            success: false
});
}

    return response.status(500).json({
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

export async function removeImageFromCloudinary(request, response) {
    const imgUrl = request.query.img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1]; //last value of array

    const imageName = image.split(".")[0];

    if (imageName) {
        const res = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {

            }
        );
        if (res) {
            response.status(200).send(res);
        }
    }

}

export async function deleteCategory(request, response) {

   
        const category = await CategoryModel.findById(request.params.id);
        const images = category.images;
        let img="";
        for (img of images) {
            const imgUrl = img;
            const urlArr = imgUrl.split("/");
            const image = urlArr[urlArr.length - 1];

            const imageName = image.split(".")[0];

            if(imageName){
                cloudinary.uploader.destroy(imageName, (error, result) => {
            
                })

            }

            
            
    
    }
    const subCategory = await CategoryModel.find({
                parentId: request.params.id
            });

            for (let i=0; i < subCategory.length; i++){
                
                const thirdsubCategory = await CategoryModel.find({
                    parentId: subCategory[i]._id
            });

            for(let i=0; i < thirdsubCategory.length; i++) {
                const deletedThirdSubCat = await CategoryModel.findByIdAndDelete(thirdsubCategory[i]._id);
                        }
                const deleteSubCat = await CategoryModel.findByIdAndDelete(subCategory[i]._id);
            
        }

        const deletedCat = await CategoryModel.findByIdAndDelete(request.params.id);

        if(!deletedCat){
            response.status(404).json({
                message:"Category not found!",
                success: false,
                error: true
            });


        }

        response.status(200).json({
            success: true,
            error: false,
            messsage: "Category Deleted!"
        })

}

export async function updatedCategory(request, response) {
    const category = await CategoryModel.findByIdAndUpdate(
        request.params.id,
        {
            name:request.body.name,
            images:imagesArr.length>0 ? imagesArr[0] : request.body.images,
            parentId:request.body.parentId,
            parentCatName:request.body.parentCatName
        },
        { new : true }
    );

    if(!category) {
        return response.status(500).json({
            message:"Category cannot be updated!",
            success: false
        })
    }

    imagesArr = [];

     response.status(200).json({
            success: true,
            error: false,
            category:category
        })
}