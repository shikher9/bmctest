/**
 * Created by shikh on 14-Mar-17.
 */

var express = require("express");
var fs = require("fs");
var Utility = require("./utility");
var app = express();
var util = new Utility();


app.use(express.static("public"));

app.get("/api/data/:userinput", function (req, res) {
    var input = req.params.userinput;
    var userdata = JSON.parse(fs.readFileSync("data/data.json", "utf-8"));
    var resData = util.filterData(input, userdata);
    res.setHeader("Content-Type", "application/json");
    res.send({data: resData});
});


app.listen(3000, function () {
    console.log("Server started at 3000");
});
