

const Sequelize=require('sequelize')
const sequelize =require('../utils/database')
const Product=sequelize.define('product',{
    id:{
     type:Sequelize.INTEGER,
     autoIncrement:true,
     allowNull:false,
     primaryKey:true
    },
    title:Sequelize.STRING,
    price:{
      type: Sequelize.DOUBLE,
    allowNull: false

    },
    imgUrl:{
 type: Sequelize.STRING,
    allowNull: false

    },
    description:{
 type: Sequelize.STRING,
    allowNull: false

    }
    
})
module.exports=Product





























//const products=[]
/*const Cart =require('./cart')
const db= require('../utils/database')
//const fs=require('fs')
//const path=require("path")
/*const p=path.join(path.dirname(process.mainModule.filename),'data','products.json')
const getProductsFromFile=(cb)=>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent))
        }
    })
}*/
/*module.exports=class Products{
    constructor(id,title,imageUrl,description,price){
     this.id=id
     this.title=title
     this.imageUrl=imageUrl
     this.description=description
     this.price=price
    }
    
    save(){
        /*getProductsFromFile(products=>{
            if(this.id){
                const existPI=Products.findById(p=>p.id===this.id)
                const  updatedP=[...products];
                updatedP[existPI]=this
                fs.writeFile(p,JSON.stringify(products),(err)=>{
                    console.log(err)
                })
            }else{
                this.id=Math.random().toString()
                products.push(this)
                fs.writeFile(p,JSON.stringify(products),(err)=>{
                    console.log(err)
                })
            }
          
        })
       */
        
     /*    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );


    }
    
    static findById(id){
       /*getProductsFromFile(products=>{
        const product=products.find((p)=>p.id===id)
        cb(product)
       })*/

     //    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);

   // }
   /* static deleteById(id) {
      /*  getProductsFromFile(products => {
          const product = products.find(prod => prod.id === id);
          const updatedProducts = products.filter(prod => prod.id !== id);
          fs.writeFile(p, JSON.stringify(updatedProducts), err => {
            if (!err) {
              Cart.deleteProduct(id, product.price);
            }
          });
        });
        */
      //}
    /*  static fetchAll(){
        //getProductsFromFile(cb);
        return db.execute('SELECT * FROM products')

    }
      


}*/




