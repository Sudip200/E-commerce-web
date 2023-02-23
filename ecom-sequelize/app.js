const express=require('express');
const path=require('path')
const app=express()
const User=require('./models/user')
const Product=require('./models/product')
const bodyParser=require('body-parser')
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorControllers=require('./controllers/error')
const sequelize = require('./utils/database')
const Cart=require('./models/cart')
const CartItem=require('./models/cart-item')


app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.set('views','views')
app.use((req,res,next)=>{
	User.findByPk(1).then(user=>{
		req.user=user
		next()
	}).catch(err=>{
		console.log(err)
	})
})
app.use('/admin',adminRoutes.routes)
app.use(shopRoutes)

app.use(errorControllers.get404);
console.log("hello here")
Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
console.log("here 2")
User.hasOne(Cart);
console.log("hello 2.5")
Cart.belongsTo(User);
console.log("hello 3")
Cart.belongsToMany(Product, { through: CartItem });
console.log("hello 4")
Product.belongsToMany(Cart, { through: CartItem });

console.log("hello 5")
sequelize.sync(
	{force:true}
	).then(result=>{ 
	console.log(result)
	return User.findByPk(1)
}).then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  }).then(user => {
    // console.log(user);
    return user.createCart();
  })
.then(cart=>{
  	console.log(cart)
  	app.listen(3000)}).
  catch(err=>{console.log(err)})

