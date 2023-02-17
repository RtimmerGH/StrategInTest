const express = require("express");
const authentication = require("../middlewares/authentication");

const router = new express.Router();

const userControllers = require("../controllers/userControllers");

// public routes
router.post("/register", userControllers.add);
router.post("/login", userControllers.login);

router.use(authentication); // authentication wall

// Not public routes
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.patch("/users/:id",userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
