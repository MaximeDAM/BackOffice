const express = require("express");
const app = express();
const{checkRefreshToken, requireAuth} = require("./controllers/auth.controller");
const cookieParser = require("cookie-parser");
const projectsRoutes = require("./routes/projects.routes");
const userRoutes = require("./routes/user.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const cors = require("cors");

const corOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1mb" })); 
app.use(cookieParser());

//Jwt
/* app.get("*", authController.checkUser); */
app.get("/jwtid", checkRefreshToken);

//Routes
app.use("/api/user", userRoutes);
app.use("/api/projects", requireAuth, projectsRoutes);

//Server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
