const Product = require("../models/product")

exports.getProducts=(req,res,next)=>{
    Product.findAll().then(products=>{
      res.render('admin/products', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    }).catch(err=>{
      console.log(err)
    })

}