const express = require("express");
const app = express();
const env = require("dotenv");
const connectToDb = require("./utils/connection");
const user = require("./routes/userRoutes");
const cors=require("cors")
env.config();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
const port = process.env.PORT || 8000;
app.use(express.json())
app.use('/public', express.static('public'));
app.use(express.urlencoded({
  extended:true,
}))
app.use("/api/user", user);
connectToDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
  });
});
