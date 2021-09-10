const controllers = require("../controllers");
const router = require("express").Router();
const { auth } = require("../utils");

router.get("/", controllers.imageList.get);
router.get("/product/:id", controllers.imageList.getByProduct);


router.post("/", controllers.imageList.post); //махнах auth() временно

router.put("/:id", controllers.imageList.put);

router.delete("/:id", controllers.imageList.delete);

module.exports = router;
