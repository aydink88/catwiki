import axios from "axios";
import Cat from "./models/CatModel.js";
import Meta from "./models/MetaModel.js";


// database should update daily
export async function shouldUpdateDatabase(req, res, next) {
  try {
    const lastUpdate = await Meta.find().exec();
    let shouldFetch = true;
    const now = Date.now();
    if (lastUpdate.length) {
      const diff = now - lastUpdate[0].updateDate;
      if (diff < 1000 * 60 * 60 * 24) {
        shouldFetch = false;
      } else {
        await Meta.deleteMany();
      }
    }
    if (shouldFetch) {
      await Cat.deleteMany();
      const { data } = await axios.get("https://api.thecatapi.com/v1/breeds");
      console.log("database refreshed");
      const cats = [];
      for (let cat of data) {
        cats.push(cat);
      }
      await Cat.insertMany(cats);
      const meta = new Meta({ updateDate: now });
      await meta.save();
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Database Error" });
  }
}
