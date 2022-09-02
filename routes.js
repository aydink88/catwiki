import express from "express";
import Cat from "./models/CatModel.js";
import Stat from "./models/StatModel.js";
import Meta from "./models/MetaModel.js";

const router = express.Router();

//get breeds from api
router.get("/breeds", async (req, res) => {
  try {
    //const { data } = await axios.get('https://api.thecatapi.com/v1/breeds');
    const data = await Cat.find().lean().exec();
    res.send({ data });
  } catch (error) {
    res.status(500).send({ message: "connection error" });
  }
});

// find a breed and increase search count
router.post("/search", async (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).send({ message: "Id or name missing." });
  }

  try {
    const cat = await Stat.findOne({ id });
    if (cat) {
      cat.search_count++;
      await cat.save();
      res.send(cat);
    } else {
      const foundCat = await Cat.findOne({ id });
      await Stat.create({ cat: foundCat._id, search_count: 1 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "database error" });
  }
});

//search top ten
router.get("/popular", async (req, res) => {
  try {
    const stats = await Stat.find().sort({ search_count: "desc" }).populate("cat").limit(10);
    res.send({ data: stats });
  } catch (error) {
    res.status(500).send({ message: "database error" });
  }
});

router.get("/reset-database", async (req, res) => {
  const secret = req.query.secret;
  if (secret !== "trustme") {
    return res.status(403).send({ message: "Unauthorized" });
  }
  try {
    await Stat.deleteMany();
    await Cat.deleteMany();
    await Meta.deleteMany();
    return res.status(200).send({ message: "Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Database Error" });
  }
});

export { router as catRoutes };
