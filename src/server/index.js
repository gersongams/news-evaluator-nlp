const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const aylien = require("aylien_textapi");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;
const hostname = process.env.HOST;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //   res.sendFile(path.resolve("src/client/views/index.html"));
});

app.post("/analyze", function (req, res) {
  textapi.sentiment(
    {
      url: req.body.url,
      mode: "document",
    },
    function (error, response) {
      if (error === null) {
        res.send({ data: response, success: true });
        console.log(response);
      } else {
        res.send({ response: "error", success: false });
      }
    }
  );
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
