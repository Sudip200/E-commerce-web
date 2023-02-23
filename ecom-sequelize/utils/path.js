const path=require('path')
console.log(process.mainModule)
module.exports=path.dirname(process.mainModule.filename)