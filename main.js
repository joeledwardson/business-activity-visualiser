// Create express app
var express = require("express")
var app = express()
var db = require("./database.js");

var cors = require("cors");
app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
app.post("/api/geocodes", (req, res, next) => {
  console.log(req.body);
  if(!Number.isInteger(req.body.level)) {
    res.status(400).json({"error": 'expected "level" to be an integer'});
    return;
  }

  if(req.body.level <= 0) {
    res.status(400).json({"error": 'expected "level" to be >= 1'});
    return
  }
  
  var sql = 'SELECT l.`index`, l.name, r.data FROM geolookups l INNER JOIN geodata r  ON l.`index`=r.`index` WHERE ($lvl >= level and $lvl <= level_end) OR ($lvl > level and has_children = 0);';
  var params = {
    "$lvl": req.body.level
  };
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    } 

    if(rows.length == 0) {
      res.status(400).json({"error": "no rows found"});
      return;
    }

    let features = rows.map(row => ({
      ...JSON.parse(row.data),
      properties: {
        name: row.name,
        id: row.index,
      }
    }));

    const setProperties = (index) => {
      var feature = features[index];
      var isql = `SELECT variable_1, value FROM tabledata WHERE \`table\`=1 AND variable_x="${feature.properties.id}";`;
      var iparams = [];
      db.all(isql, iparams, (ierr, irows) => {
        if (ierr) {
          res.status(400).json({"error":ierr.message});
          return;
        }
        irows.forEach(irow => {
          feature.properties[irow.variable_1] = irow.value;
        });
        if(index + 1 < features.length) {
          setProperties(index+1);
        } else {
          res.json({
            "message":"success",
            "data": {
              type: 'FeatureCollection',
              features
            }
          });
        }
      });
    }

    setProperties(0);

  });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
