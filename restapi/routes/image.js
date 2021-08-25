const controllers = require("../controllers");
const router = require("express").Router();
const { auth } = require("../utils");

router.get("/", controllers.image.get);

router.post("/", controllers.image.post); //махнах auth() временно

router.put("/:id", controllers.image.put);

router.delete("/:id", controllers.image.delete);

module.exports = router;
