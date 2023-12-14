import express from "express";
import cors from "cors";
import pageRouter from "./routes/pages.js";
import bookRouter from "./routes/books.js";
import articleRouter from "./routes/articles.js";
import bookingRouter from "./routes/bookings.js";
import blogRouter from "./routes/blog.js";
import userRouter from "./routes/users.js";
import commentRouter from "./routes/comments.js";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.use("/pages", pageRouter);
app.use("/books", bookRouter);
app.use("/articles", articleRouter);
app.use("/booking", bookingRouter);
app.use("/blog", blogRouter);
app.use("/users", userRouter)
app.use("/comments", commentRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}, http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Bow Chika Bow Wow 🎉... Det er adgang til backend");
});
