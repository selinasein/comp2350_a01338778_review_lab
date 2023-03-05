const router = require("express").Router();
const database = include("databaseConnection");
const dbModel = include("databaseAccessLayer");

router.get("/", async (req, res) => {
  try {
    const result = await dbModel.getRestaurantInfo();
    console.log(result);
    res.render("index", { result });

    //Output the results of the query to the Heroku Logs
    console.log(result);
  } catch (err) {
    res.render("error", { message: "Error reading from MySQL" });
    console.log("Error reading from mysql");
  }
});

router.post("/showReviews?id=1", async (req, res) => {
  console.log("form submit");
  console.log(req.body);
  try {
    const success = await dbModel.addUser(req.body);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error writing to MySQL" });
    console.log("Error writing to MySQL");
    console.log(err);
  }
});

router.get("/deleteUser", async (req, res) => {
  console.log("delete user");
  console.log(req.query);
  let userId = req.query.id;
  if (userId) {
    const success = await dbModel.deleteUser(userId);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to mysql");
      console.log(err);
    }
  }
});

module.exports = router;
