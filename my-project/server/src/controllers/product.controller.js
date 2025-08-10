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

         const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage);
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

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
 
 
export async function getAllProductsByCatId(request, response){
    try {

         const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 1000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if(page > totalPages) {
            return response.status(404).json({
                message: "Page not Found",
                error:true,
                success:false
            });
        }

        const products = await ProductModel.find({
                catId:request.params.id
            }
        ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();


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
 
export async function getAllProductsByCatName(request, response){
    try {

         const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 1000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if(page > totalPages) {
            return response.status(404).json({
                message: "Page not Found",
                error:true,
                success:false
            });
        }

        const products = await ProductModel.find({
                catName:request.query.catName
            }
        ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();


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

export async function getAllProductsBySubCatId(request, response){
    try {

         const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 1000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if(page > totalPages) {
            return response.status(404).json({
                message: "Page not Found",
                error:true,
                success:false
            });
        }

        const products = await ProductModel.find({
                subCatId:request.params.id
            }
        ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();


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

export async function getAllProductsBySubCatName(request, response){
    try {

         const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 1000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if(page > totalPages) {
            return response.status(404).json({
                message: "Page not Found",
                error:true,
                success:false
            });
        }

        const products = await ProductModel.find({
                subCat:request.query.subCat
            }
        ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();


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

export async function getAllProductsByThirdSubCatId(request, response){
    try {

         const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 1000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if(page > totalPages) {
            return response.status(404).json({
                message: "Page not Found",
                error:true,
                success:false
            });
        }

        const products = await ProductModel.find({
                thirdsubCatId:request.params.id
            }
        ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();


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

export async function getAllProductsByThirdSubCatName(request, response){
    try {

         const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 1000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if(page > totalPages) {
            return response.status(404).json({
                message: "Page not Found",
                error:true,
                success:false
            });
        }

        const products = await ProductModel.find({
                thirdsubCat:request.query.thirdsubCat
            }
        ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();


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

export async function getAllProductsByPrice(request, response){

    let productsList = [];

    if(request.query.catId !== "" && request.query.catId !== undefined) {
        const productListArr = await ProductModel.find({
            catId: request.query.catId,
        }).populate("category");

        productsList = productListArr;
    }

    if(request.query.subCatId !== "" && request.query.subCatId !== undefined) {
        const productListArr = await ProductModel.find({
            subCatId: request.query.subCatId,
        }).populate("category");

        productsList = productListArr;
    }

    if(request.query.thirdsubCatId !== "" && request.query.thirdsubCatId !== undefined) {
        const productListArr = await ProductModel.find({
            thirdsubCatId: request.query.thirdsubCatId,
        }).populate("category");

        productsList = productListArr;
    }

    const filteredProducts = productsList.filter((product)=> {
        if(request.query.minPrice && product.price < parseInt(+request.query.minPrice)) {
            return false;
        }
        if(request.query.maxPrice && product.price > parseInt(+request.query.maxPrice)){
            return false;
                }
            return true;
    });

    return response.status(200).json({
        error:false,
        success: true,
        products: filteredProducts,
        totalPages: 0,
        page:0
    })
}

export async function getAllProductsByRating(request, response) {
    try {
        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 1000;

        // Build filter object from query params
        const filter = {};
        if (request.query.rating) {
            filter.rating = Number(request.query.rating);
        }
        if (request.query.catId) {
            filter.catId = request.query.catId;
        }
        if (request.query.subCatId) {
            filter.subCatId = request.query.subCatId;
        }
        if (request.query.thirdsubCatId) {
            filter.thirdsubCatId = request.query.thirdsubCatId;
        }

        const totalPosts = await ProductModel.countDocuments(filter);
        const totalPages = Math.max(Math.ceil(totalPosts / perPage), 1);

        if (page > totalPages) {
            return response.status(404).json({
                message: "Page not found",
                error: true,
                success: false
            });
        }

        const products = await ProductModel.find(filter)
            .populate("category", "name _id") // select only needed fields
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (products.length === 0) {
            return response.status(404).json({
                message: "No products found",
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            products,
            totalPages,
            page
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function getProductsCount(request, response) {
    try {
        const productsCount = await ProductModel.countDocuments();

        if(!productsCount) {
           return response.status(500).json({
            error: true,
            success: false
        }); 
        }

        return response.status(200).json({
            error: false,
            success: true,
            productsCount: productsCount
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function getAllFeaturedProducts(request, response){
    try {

         

        const products = await ProductModel.find({
                isFeatured: true
            }
        ).populate("category");


        if(!products){
            response.status(500).json({
            error: true,
            success: false
        }) 
        }

         return response.status(200).json({
            error: false,
            success: true,
            products: products
        })
        
    } catch (error) {
         return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}