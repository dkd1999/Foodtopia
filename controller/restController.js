const restaurants = require("../models/restaurantSchema");

// all restaurants
exports.getallerests = async (req, res) => {
  try {
    const allrests = await restaurants.find();
    res.status(200).json(allrests);
  } catch (error) {
    res.status(401).json(error);
  }
};

// getallfood
exports.getallfood = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    const allfood = await restaurants.findOne({ id });
    res.status(200).json(allfood.foods);
  } catch (error) {
    res.status(401).json(error);
  }
};

// getnon-veg
// exports.getnonveg = async (req,res) => {
//   let { id } = req.params;
//   try {
//     const allnonveg = await restaurants.findOne({  });
//     res.status(200).json()
//   } catch (error) {
    
//   }
// }
