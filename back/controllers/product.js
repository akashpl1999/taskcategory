const formidable=require("formidable")
const _ = require("lodash");
const Product=require("../models/product");
const fs=require("fs"); 
const category = require("../models/category");





exports.productById=(req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
      if(err || !product){
          return res.status(400).json({
              error:"product not found"
          })
      }
    
    req.product=product;
    next();
    })

}


exports.remove=(req,res)=>{
    let product=req.product
    product.remove((err,deletedproduct)=>{
        if(err){
            return res.status(400).json({
               error:"error"
            })      
    }
    res.json({
        deletedproduct
        ,
        msg:"deleted"
    })
})
}

exports.creates=(req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const photo = req.file?.filename;
    const price=req.body.price;
    const quantity=req.body.quantity;
    const shipping=req.body.shipping;
    const category=req.body.category
    const subcategory=req.body.subcategory
   // const subImages=req.body.reqFiles
    const newproductdata={
        name,
        description,
        photo,
        price,
        quantity,
        shipping,
        category,
        subcategory,
       // subImages
    }
    const newproduct=new Product(newproductdata)
    newproduct.save()
    .then((data) => res.json({msg:'User Added',data}))
    .catch(err => res.status(400).json('Error: ' + err));

}


exports.getproducts=(req,res)=>{
    Product.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
  
}



exports.read=(req,res)=>{
    req.product.photo=undefined
    return res.json(req.product)
}



exports.update = (req, res, next) => {
    console.log(req.body.productid)
    Product.findByIdAndUpdate({_id:req.body.productid}, 
        { $set: { name:req.body.name,description:req.body.description,price:req.body.price,quantity:req.body.quantity} }, function (err, data) {
        if (err){
            console.log(err)
        }
        else{
          
            res.json({
                data,
              
            })
            console.log({
               
               data
            })
        }
        next()
    });
}






exports.list =(req,res)=>{
   

    Product.find()
     .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        res.json(products)
    })
}
exports.listcategories=(req,res)=>{
    Product.get('category',{},(err,categories ) =>{
        if(err){
            return res.status(400).json({
                error:"catagory not found"
            })
        }
        res.json(categories)
    });

}

exports.listRelated=(req,res)=>{
  
    Product.find({_id:{$ne:req.product},category:req.product.category})
    .limit(limit)
    .populate('category','_id name')
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"product not found"
            })
        }
        res.json(products)
    })

}

exports.listBySearch=(req,res)=>{
    let order=req.query.order ? req.query.order :'desc'
    let sortBy=req.query.sortBy ? req.query.sortBy :'_id'
    let limit =req.query.limit ? parseInt(req.query.limit) : 100;
     let skip=parseInt(req.body.skip);
     let findArgs={}


     for(let key in req.body.filters){
         if(req.body.filters[key].length >0){
             if(key=="price"){
                 findArgs[key]={
                     $gre:req.body.filters[key][0],
                     $lte:req.body.filters[key][1]
                 };
             }else {
                 findArgs[key]=req.body.filters[key];
             }
         }
     }

 Product.find(findArgs)
   .select("-photo")
   .sort([[sortBy,order]])
   .skip(skip)
   .limit(limit)
   .exec((err,data)=>{
       if(err) return res.status(400).send(err)


       res.json({
           size:data.length,
           data
       })   
   })
}

exports.photo=(req,res,next)=>{
    if(req.file.filename){
         return res.send(req.product.photo.data)
    }
    next()
}

exports.photo=(req,res)=>{
    Product.get({photo:req.file.filename},(err,proimg ) =>{
        if(err){
            return res.status(400).json({
                error:"catagory not found"
            })
        }
        res.json(proimg)
    });

}



exports.ProductMultImage=(req,res)=>{
    console.log(req.files);
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url +'/' + req.files[i].filename)
    }
     console.log(reqFiles)
   
    Product.updateOne({_id:req.body.proid}, 
        { $set: { subImages:reqFiles } }, function (err, data) {
        if (err){
            console.log(err)

        }
        else{
          
            res.json({
                data:data,
              
            })
            console.log({
                data:data,
               
            })
        }
})
  
}

exports.UProductMultImage=(req,res)=>{
    console.log(req.files);
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url +'/' + req.files[i].filename)
    }
     console.log(reqFiles)
   
    Product.updateOne({_id:req.body.proid}, 
        { $set: { subImages:reqFiles } }, function (err, data) {
        if (err){
            console.log(err)

        }
        else{
          
            res.json({
                data:data,
              
            })
            console.log({
                data:data,
               
            })
        }
})
  
}


exports.getproductdata = (req, res) => {
    console.log(req.body)
    Product.findOne({_id:req.params.productId}).exec((err, data) => {
      
        if (err) {
            console.log(err)
            return res.status(400).json({
                error: "error"
            })
        }
        res.json(data)
    })
}


exports .UpdateImage = (req,res)=>{
    console.log(req.body);
    const photo= req.file.filename
    Product.findOneAndUpdate({_id:req.body.productId},{photo:photo},{new:true},(err,data)=>
    {
        if(err){
            console.log(err)
        }
        else{
            res.json({ "err": 0, "message": "Product  Image has been updated Successfully",data:data})
            console.log({ "err": 0, "message": "Product Image has been updated successfully",data:data  })
        }
    })

  
  
}

exports.UpdatesubImage=async(req,res)=>{
    console.log(req.body)
   
    let products = await Product.findOne({ _id: req.body.id });
    console.log(products)
      let imgarr=products.subImages;
      imgarr[req.body.index]= req.protocol + '://' + req.get('host') + '/'
       + req.file.filename

   Product.findOneAndUpdate({_id:req.body.id},{subImages:imgarr},{new:true},(err,data)=>
   {
       if(err){
           console.log(err)
       }
       else{
           res.json({ "err": 0, "message": "Product Sub Image has been updated Successfully",data:data})
           console.log({ "err": 0, "message": "Product Sub Image has been updated successfully"  })
       }
   })

   

}
