import express from "express";
import cors from "cors";
// import frontpageRouter from "./routes/frontpage.js";
import pageRouter from "./routes/pages.js";
import bookRouter from "./routes/books.js";
import articleRouter from "./routes/articles.js";

// import connection from "database.js";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

// app.use("/frontpage", frontpageRouter);
app.use("/pages", pageRouter);
app.use("/books", bookRouter);
app.use("/articles", articleRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}, http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Bow Chika Bow Wow 🎉... Det er adgang til backend");
});
