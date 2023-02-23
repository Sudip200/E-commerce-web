const express=require('express')
const adminController=require('../controllers/admin')
//const path=require('path')
//const rootDir=require('../utils/path')
const router=express.Router()
const productsController=require('../controllers/product')
//const products=[]
router.get('/add-product',productsController.getAddProducts)
router.get('/products',adminController.getProducts)
router.get('/orders',productsController.getOrders)
router.get('/edit-product/:productId',productsController.getEditProducts)
router.post('/edit-product',productsController.postEditProduct)
router.post('/add-product',productsController.postAddProducts)  
router.post('/delete-product',productsController.postDeleteProduct);


exports.routes=router
//exports.products=products