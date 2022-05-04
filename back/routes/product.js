const express=require("express")
const router =express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const Product=require("../models/product")

const {creates,list,read,productById,listcategories,remove,update,UpdateImage,UProductMultImage,listBySearch,photo, getproducts,ProductMultImage,getproductdata,deleteproduct,UpdatesubImage}=require("../controllers/product")

const {userById}=require("../controllers/userid")



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'photo');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });











router.param("userId",userById)
router.get("/products/categories",listcategories);
router.post("/products/by/search",listBySearch)
router.post("/product/create/:userId",upload.single('photo'),creates);
router.post('/products/mimg/', upload.array('multiple_images',6),ProductMultImage)
router.post('/products/:productId/:userId', upload.array('multiple_images',6),UProductMultImage)

router.get("/product/:productId", read)
router.delete("/products/:productId/:userId",remove)
router.param("productId",productById)
router.get("/products/:productId", getproductdata)
router.put("/products/:productId/:userId",update)
router.get("/product/photo/:productId",photo)
router.get("/getproducts", getproducts)
//router.get("/products/related/:productId",listRelated)
//router.delete("/products/:productId/:userId",deleteproduct)
router.post(`/products/updateimg/:productId`,upload.single('photo'),UpdateImage)
//router.post('/updateproductimg',upload.single('photo'),UpdatesubImage)

router.get("/products",list)

router.param("userId",userById)




module.exports=router;