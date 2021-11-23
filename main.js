/**
* MIT License
*
* Copyright (c) 2021 Joel Edwardson
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
// Create express app
require('dotenv').config();
var express = require("express");
var cors = require("cors");
var path = require("path");
var bodyParser = require("body-parser");
var db = require("./database.js");
var app = express();

app.options('*', cors()) // include before other routes

app.use(express.static(path.join(__dirname, "build")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Start server
var port = process.env.PORT || process.env.TEST_PORT;
app.listen(port, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", port));
});
// Root endpoint
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Insert here other API endpoints
app.post("/api/geocodes", (req, res, next) => {
  if (!Number.isInteger(req.body.level)) {
    res.status(400).json({ error: 'expected "level" to be an integer' });
    return;
  }

  if (req.body.level <= 0) {
    res.status(400).json({ error: 'expected "level" to be >= 1' });
    return;
  }

  var sql =
    "SELECT l.`index`, l.name, r.data FROM geolookups l INNER JOIN geodata r  ON l.`index`=r.`index` WHERE ($lvl >= level and $lvl <= level_end) OR ($lvl > level and has_children = 0);";
  var params = {
    $lvl: req.body.level,
  };
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    if (rows.length == 0) {
      res.status(400).json({ error: "no rows found" });
      return;
    }

    let features = rows.map((row) => ({
      ...JSON.parse(row.data),
      properties: {
        name: row.name,
        id: row.index,
      },
    }));

    const setProperties = (index) => {
      var feature = features[index];
      var isql = `SELECT variable_1, value FROM tabledata WHERE \`table\`=1 AND variable_x="${feature.properties.id}";`;
      var iparams = [];
      db.all(isql, iparams, (ierr, irows) => {
        if (ierr) {
          res.status(400).json({ error: ierr.message });
          return;
        }
        irows.forEach((irow) => {
          feature.properties[irow.variable_1] = irow.value;
        });
        if (index + 1 < features.length) {
          setProperties(index + 1);
        } else {
          res.json({
            message: "success",
            data: {
              type: "FeatureCollection",
              features,
            },
          });
        }
      });
    };

    setProperties(0);
    console.log(`resolved request at level ${req.body.level}`);
  });
});
