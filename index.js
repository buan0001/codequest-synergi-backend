import express from "express";
import cors from "cors";
import mongoose from "mongoose"
// import { MongoClient } from "mongodb";




const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://buan0001:qwer1234@buan-test.lxx9cgs.mongodb.net/posts_db')
// const client = new MongoClient('mongodb+srv://buan0001:qwer1234@buan-test.lxx9cgs.mongodb.net/')

const testSchema = new mongoose.Schema({createdAt: String})

const testModel = mongoose.model("posts",testSchema)


app.get("/posts", async (req, res) => {
  
    // const database = client.db('sample_mflix');
    // const movies = database.collection('movies');

    // // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    // const movie = await movies.findOne(query);
    const content = await testModel.find({caption:/Beautiful/},)
    res.json(content)
});

app.listen(port, () => {
  console.log(`App listening on port ${port}, http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Bow Chika Bow Wow 🎉... Det er adgang til backend");
});
