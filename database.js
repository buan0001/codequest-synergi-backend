import mongoose from "mongoose";

// connect to mongoDB
// test
mongoose.connect("mongodb+srv://buan0001:qwer1234@buan-test.lxx9cgs.mongodb.net/synergiTest");

const pageSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true, unique: true },
  pageBody: { type: [{ title: String, body: { type: String, required: true }, image: [String], placement: { type: Number, required: true, unique: true } }], required: true },
  createdAt: { type: Date, default: new Date(), immutable: false },
  updatedLast: { type: Date, default: new Date() }
});

const PageModel = mongoose.model("page", pageSchema);

export default PageModel;
