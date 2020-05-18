const express = require("express");
const router = express.Router();
const cartsRepo = require("../Repositories/cart");

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

module.exports = router;
