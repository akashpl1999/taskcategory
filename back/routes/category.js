const express=require("express")
const router =express.Router();

const {create,categoryById,read,update,remove,list,subcreate,SubCategorydatalist,removesub,updatesub,Deletesub,subcategoryById}=require("../controllers/category")

const {userById}=require("../controllers/userid")

const {requireSignin,isAdmin,isAuth}=require("../controllers/auth")
router.param("userId",userById)

router.get('/category/:categoryId',read)
router.post("/category/create/:userId",create);
router.post("/subcategory/create",subcreate);

//router.delete('/category/:categoryId/:userId',remove)
router.param("categoryId", categoryById)  
//router.put("/categ",updata) 
router.param("subcategoryId",subcategoryById)
router.put('/category/:categoryId/:userId',update)
router.get("/categories",list)
router.get("/subcategories",SubCategorydatalist)

router.delete('/subcategory/:subcategoryId/:userId',removesub)

router.put('/subcategory/:subcategoryId/:userId',updatesub)

router.post("/posts/deletecategory",remove)




module.exports=router;