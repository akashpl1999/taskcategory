const Category = require("../models/category");
const SubCategorydata = require("../models/SubCategory");





exports.subcategoryById = (req, res, next, id) => {
    SubCategorydata.findById(id).exec((err, subcategory) => {
        if (err || !subcategory) {
            return res.status(400).json({
                error: "category error"
            })
        }
        req.subcategory = subcategory;
        next()
    })
}

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "category error"
            })
        }
        req.category = category;
        next()
    })
}
exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'category error'
            })
        }
        res.json({ data })
    })

};


exports.subcreate = (req, res) => {
    const categories = req.body.categories;
    const subcategory = req.body.subcategory;



            const newsubcategorydata = {
                subcategory,
                categories,

            }
    const newsubcategory = new SubCategorydata(newsubcategorydata)
    newsubcategory.save()
        .then((data) => res.json({ msg: 'User Added', data }))
        .catch(err => res.status(400).json('Error: ' + err));

}


exports.read = (req, res) => {
    return res.json(req.category)
}

exports.update = (req, res, next) => {
    console.log(req.body)
    Category.updateOne({_id:req.body.categorydata}, 
        { $set: { name:req.body.name} }, function (err, data) {
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


exports.updatesub = (req, res, next) => {
    console.log(req.body)
    SubCategorydata.updateOne({_id:req.body.subcatId}, 
        { $set: { subcategory:req.body.subcategory} }, function (err, data) {
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



exports.Deletesub=(req,res)=>{
    console.log(req.body)
    SubCategorydata.deleteOne({_id:req.body.subcategorydata}, (err,data) => {
        if (err) throw err;
        console.log({err:0,message:'Your Product Has been Deleted successfully'})
        res.json({err:0,message:'Your Product Has been Deleted successfully'})
    })
  
}


exports.removeh = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "error"
            })

        }
        res.json({
            data,
            msg: "ftgyhujikl"
        })
    })


}

exports.remove=(req,res)=>{
console.log(req.body)
    SubCategorydata.deleteMany({categories:req.body.categories},(err)=>{
        if (err) throw err;
        console.log({err:0,message:'Your SubCategory Has been Deleted successfully'})        
    })
    Category.deleteOne({_id:req.body.categories},(err) => {
        if (err) throw err;
        console.log({err:0,message:'Your Category Has been Deleted successfully'})
        res.json({err:0,message:'Your Category Has been Deleted successfully'})
    })
  
  
}


exports.removesub = (req, res) => {
    const subcategory = req.subcategory
    subcategory.subcategory = req.body.subcategory
    subcategory.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "error"
            })

        }
        res.json({
            data,
            msg: "ftgyhujikl"
        })
    })


}


exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "error"
            })
        }
        res.json(data)
    })
}

exports.SubCategorydatalist = (req, res) => {
    SubCategorydata.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "error"
            })
        }
        res.json(data)
    })
}