const mongoose=require('mongoose');

const SubCategory=new mongoose.Schema({
  
  
  
    subcategory:{
        type: String,
         
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        default:null
    },
    created_at:{
        type:Date,
        default:Date.now
      },
})

module.exports=mongoose.model('SubCategory',SubCategory)