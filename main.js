// Create express app
var express = require("express")
var app = express()
var db = require("./database.js");


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
  var sql = 'select * from geodata';
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
        "message":"success",
        "data": rows.map(row => ({
          index: row.index,
          data: JSON.parse(row.data)
        }))
    })
  });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
