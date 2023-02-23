const Product=require('../models/product');
const Cart =require('../models/cart')
exports.getAddProducts=(req,res,next)=>{
    res.render('admin/edit-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing:false
    })
}
exports.getEditProducts=(req,res,next)=>{
    const editMode=req.query.edit
    if(!editMode){
        res.redirect('/')
    }
    const prodId=req.params.productId
    req.user.getProducts({ where: { id: prodId } })
    // Product.findById(prodId)
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));

   
   // Products.findById(prodId,(product)=>{
        
   // })
    
}
exports.postAddProducts=(req,res,next)=>{
    const title = req.body.title;
  const imageUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;
  //const product = new Product(null, title, imageUrl, description, price);
  req.user.createProduct({ 
      title: title,
      price: price,
      imgUrl: imageUrl,
      description: description
}).then(result => {
      console.log(result);
      console.log('Created Product');
      res.redirect('/');
    }).catch(err=>{console.log(err)})

   /*  console.log(product)
    product
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
*/
}
exports.getProduct=(req,res,next)=>{

  const prodId=req.params.productId
  //Product.findAll()
  Product.findByPk(prodId)
    .then((product) => {
    console.log(product)
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));

  
 
}
exports.getProducts=(req,res,next)=>{
    Product.findAll().then(products=>{
        res.render('shop/shop.ejs',{
            prods: products,
            pageTitle: 'Shop',
            path: '/products',
           
        })
    }).catch(err => {
      console.log(err);
    })
   
}
exports.getIndex=(req,res,next)=>{
    Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });

   /*Products.fetchAll().then(([rows,fieldData])=>{
    res.render('shop/index',{
            prods: rows,
            pageTitle: 'Shop',
            path: '/',
            
        })
   }).catch(err=>{console.log(err)})*/

}
exports.getCart=(req,res,next)=>{
     req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

    
    
}
exports.getOrders=(req,res,next)=>{
    res.render('shop/orders',{
        path:'/orders',
        pageTitle:'Orders'
     })
}
exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{
       path:'/checkout',
       pageTitle:'CheckOut'
    })
}

exports.postCart=(req,res,next)=>{
    const prodId=req.body.productId
    let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));

  
}
exports.postEditProduct=(req,res,next)=>{
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imgUrl;
    const updatedDesc = req.body.description;
    Product.findByPk(prodId).then((product)=>{
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imgUrl = updatedImageUrl;
      return product.save();
    }
    ).then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

    
}
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
   Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

  };
  