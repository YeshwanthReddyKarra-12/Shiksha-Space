const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dns = require("dns");
const fs = require("fs");

if (fs.existsSync(".ENV")) {
    dotenv.config({ path: ".ENV" });
} else {
    dotenv.config();
}

const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});