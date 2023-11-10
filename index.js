const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const categoryRoutes = require("./routes/Category");
const productRoutes = require("./routes/Products");
const cartRoutes = require("./routes/Cart");
const userRoutes = require("./routes/Users");
const orderRoutes = require("./routes/Order");
const addressRoutes = require("./routes/Address");
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors());

app.use((req, res, next) => {
  next();
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to db"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", addressRoutes);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
