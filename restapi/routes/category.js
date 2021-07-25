const controllers = require("../controllers");
const router = require("express").Router();
const { auth } = require("../utils");

router.get("/", controllers.category.get);

router.post("/", controllers.category.post); //махнах auth() временно

router.put("/:id", controllers.category.put);

router.delete("/:id", controllers.category.delete);

module.exports = router;
