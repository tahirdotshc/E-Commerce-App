import mongoose from "mongoose";

const categoryschema = mongoose.schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    images: [
        {
            type:String
        }
    ],
    parentCatName:{
        type: String,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    }
    }, {timestamps:true});
   


    const CategoryModel = mongoose.model('Category', CategorySchema);

    export default CategoryModel;
