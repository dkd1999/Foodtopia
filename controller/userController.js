// import model in userSchema in userController.js
const carts = require("../models/cartSchema");
const users = require("../models/userSchema");
const items = require("../models/restaurantSchema");
const jwt = require("jsonwebtoken");
// const owner = req.user._id
// store cart items to user account
// exports.cartStore = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const food = await users.findOne({ fid });
//     if (food) {
//       food.quantity += 1;
//       food.total = food.price * food.quantity;
//       await food.save();
//       res.send(200).json("added more sucessfully");
//     } else {
//       const newcart = new users({
//         username,
//         password,
//       });
//       await newcart.save();
//       res.status(200).json("added successfully");
//     }
//   } catch (error) {
//     res.status(401).json("poda");
//   }
// };

exports.register = async (req, res) => {
  console.log(req.body);
  const { username, password, profilepic } = req.body;
  if (!username || !password || !profilepic) {
    res.status(403).json("All inputs are required!");
  }
  try {
    const preuser = await users.findOne({ username });
    if (preuser) {
      res.status(406).send("User already exists !"); //406 - Not acceptable
    } else {
      const newuser = new users({
        username,
        password,
        profilepic,
        carts: [],
        locs:{}
      });
      await newuser.save();
      res.status(200).json(newuser);
    }
  } catch {
    res.status(401).json(error);
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const preuser = await users.findOne({ username, password });
    if (preuser) {
      // const token = jwt.sign(
      //   {
      //     loginusername: username
      //   },"secretnuke");
      res.status(200).json({preuser});
    } else {
      res.status(404).json("Invalid Username or Password");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.getuserDetails = async (req,res)=>{
  // const username = localStorage.getItem('login_username')
  const {username} = req.body
  console.log(req.body);
  try {
    const user = await users.findOne({username})
    if(user){
      res.status(200).json(user)
    }
  } catch (error) {
    res.status(401).json('puta')
  }
}

// exports.storeloc = async() => {
//   const {username,deliname,flatno,state,pincode}=req.body
//   try {
//     const user = await users.findOne({username});
//       if(user){
//         res.status(401).json('Already delivery address')
//         }
      
//       else{
//         const newloc= new locs({
//           deliname,flatno,state,pincode
//       })
//       await newloc.save()
//       res.status(200).json("added delivery")
//     }
//   }catch (error) {
    
//   }
// }

// exports.ui = async (req, res) => {
//   const { itemId, quantity } = req.body;
//   const kart = await carts.findOne({owner});
//   const item = await items.findOne({_id:itemId})
//     if (newusercart && sm == foodid) {
//       console.log(newusercart.carts.quantity);
//       newusercart.carts.quantity += 1;
//       console.log(newusercart.carts.quantity);
//       newusercart.carts.total =
//         newusercart.carts.price * newusercart.carts.quantity;
//       await newusercart.save();
//       res.status(200).json("added more successfully");
//     } else {
//       newusercart.carts.push({
//         fid: fid,
//         title: title,
//         price: price,
//         category: category,
//         image: image,
//         quantity: quantity,
//         total: price * quantity,
//       });
//       await newusercart.save();
//       res.status(200).json(newusercart);
//     }
//   } catch (error) {
//     res.status(401).json(error);
//   }
// };

// exports.getuserCart = async (req, res) => {
//   try {
//     const alluserCartitems = await users.findOne({ carts });
//     res.status(200).json(alluserCartitems.carts);
//   } catch (error) {
//     res.status(401).json(error);
//   }
// };

// addtoCart
// exports.usercart = async (req, res) => {
//   const {
//     username,
//     password,
//     profilepic,
//     fid,
//     title,
//     price,
//     category,
//     image,
//     quantity,
//   } = req.body;
//   try {
//     const food = await users.findOne({ username });
//     const foodid = await users.findOne({ fid });
//     if (food) {
//       if (foodid) {
//         food.quantity += 1;
//         food.total = food.price * food.quantity;
//         await food.save();
//         res.status(200).json("added more sucessfully");
//       }
//     } else {
//       const newFood = new users({
//         username,
//         password,
//         profilepic,
//         fid,
//         title,
//         price,
//         category,
//         image,
//         quantity,
//         total: price * quantity,
//       });
//       await newFood.save();
//       res.status(200).json("added successfully");
//     }
//   } catch (error) {
//     res.status(401).json(error);
//   }
// };

// addtoCart - about to work only if if worked
// exports.userkart = async (req, res) => {
//   const { username, fid, title, price, category, quantity } = req.body;

//   try {
//     console.log("hello");
//     const food = await users.findOne({username});
//     const foodcarts = food.carts
//     const foodid = foodcarts.find(foodcarts => foodcarts.fid === fid)
//     console.log('foodcarts',foodcarts);
//     console.log('foodid',foodid);
//     if (foodid) {
//       foodid.quantity += 1;
//       foodid.total = foodid.price * foodid.quantity;
//       console.log('foodid after :',foodid);
//       // foodcarts = foodid
//       // console.log('foodcarts',foodcarts);
//       // food.carts = foodcarts
//       // console.log('food.carts',food.carts);
//       await food.save();
//       res.status(200).json("added more sucessfully");
//     } 
//     // A-ok
//     else {
//       console.log('inside else');
//       const finduser = await users.findOne({username})
//       console.log('finduser',finduser.carts);
      
//       finduser.carts.push({
//         fid: fid,
//         title: title,
//         price: price,
//         category: category,
//         quantity: 1,
//         total: price * quantity,
//       });

//       await finduser.save();
//       //  users.kerts.push({fid:fid,
//       //   title:title,
//       //   price:price,
//       //   category:category,
//       //   quantity:1,
//       //   total: price * quantity})

//       res.status(200).json("added successfully");
//     }
//   } catch (error) {
//     res.status(401).json(error);
//   }
// };
