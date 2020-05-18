const express = require("express");
const router = express.Router();
const cartsRepo = require("../Repositories/cart");
const productsRepo = require('../Repositories/products')
const cartShowTemplate = require('../views/Carts/show');

router.post("/cart/products", async (req, res) => {
  let cart;

  if (!req.session.cartId) {
    cart = await cartsRepo.create({ item: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const exisitngItem = cart.item.find(itema => itema.id === req.body.productId);

  if (exisitngItem) {
    exisitngItem.quantity++;
  } else {
    cart.item.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsRepo.update(cart.id, {
    item: cart.item,
  });

  console.log(cart.item);
  res.send("Product added to cart");
});

router.get('/cart', async (req, res) => {
    if(!req.session.cartId) {
        return res.redirect('/');
    }

    const cart =  await cartsRepo.getOne(req.session.cartId); 

    for(let itema of cart.item) {
        const product = await productsRepo.getOne(itema.id);
        itema.product = product; //temporary for displaying purpose only no permanent chabges to items.json
        //as it iterates assign all the details of the corresponding product to each of the itema object
        // as we will be creating new cart variable for every get request which contains all the item and each itema with product details as well finally pass the temporary clone of cart to template for display purpose.
        //again no changes is made to the database in items.json
    }

    res.send(cartShowTemplate({item : cart.item}))


});
















module.exports = router;
