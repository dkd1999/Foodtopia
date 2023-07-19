// const jwt = require('jsonwebtoken')
// const routerMiddleware = (req,res,next)=>{
//     console.log('router middleware');

//     const token = req.headers['access-token']

//     try{
//         const {loginusername} = jwt.verify(token,secretnuke)
//         console.log(loginusername);
//         req.dUser = loginusername
//         next()
//     }
//     catch(error){
//         res.status(401).json("Please log in",error)   
//     }
// }
// module.exports = {
//     routerMiddleware
// }