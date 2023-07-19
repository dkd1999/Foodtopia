const carts = require("../models/cartSchema");

// addtoCart
exports.addtoCart = async (req, res) => {
  // const username = localStorage.getItem('login_username')
  // console.log(username);
  const { fid, title, price, category, image, quantity } = req.body;
  try {
    const food = await carts.findOne({fid});
    if (food) {
      food.quantity += 1;
      food.total = food.price * food.quantity;
      await food.save();
      res.status(200).json("added more sucessfully");
    } else {
      const newFood = new carts({
        fid,
        title,
        price,
        category,
        image,
        quantity,
        total: price * quantity,
      });
      await newFood.save();
      res.status(200).json("added successfully");
    }
  } catch (error) {
    res.status(401).json('feck off');
  }
};

// getCart
exports.getCart = async (req, res) => {
  try {
    const allcartItems = await carts.find();
    res.status(200).json(allcartItems);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.incCartItem = async (req, res) => {
  // get id from params
  const { fid } = req.params;

  try {
    // check id is in cart
    const item = await carts.findOne({ fid });
    // if yes increment quantity, update total, send all items of cart as res
    item.quantity += 1;
    item.total = item.quantity * item.price;
    // to save changes in collection
    await item.save();
    const allItems = await carts.find();
    res.status(200).json(allItems);
  } catch (error) {
    res.status(401).json(error);
  }
};

// decrement cart item
exports.decCartItem = async (req, res) => {
  // get id from params
  const { fid } = req.params;

  try {
    // check id is in cart
    const item = await carts.findOne({ fid });
    // if yes increment quantity, update total, send all items of cart as res
    if (item) {
      // if yes decrement quantity,
      item.quantity -= 1;
      if (item.quantity == 0) {
        await carts.deleteOne({ fid });
        const allItems = await carts.find();
        res.status(200).json(allItems);
      } else {
        item.total = item.quantity * item.price;
        // to save changes in collection
        await item.save();
        const allItems = await carts.find();
        res.status(200).json(allItems);
      }
    } else {
      res.status(404).json("Item not found");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

// logic to remove cart item
exports.removecartItem = async (req, res) => {
  // get product id from req
  const { fid } = req.params;
  try {
    await carts.deleteOne({ fid });
    const allItems = await carts.find();
    res.status(200).json(allItems);
  } catch (error) {
    res.status(401).json(error);
  }
};

// empty cart
exports.emptyCart = async (req, res) => {
  try {
    await carts.deleteMany({})
    const allItems = await   carts.find()
    res.status(200).json(allItems)
  } 
  catch (error) {
    res.status(401).json(error)
  }
};
