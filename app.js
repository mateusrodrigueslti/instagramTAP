var app = require('./config/server');
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Server run on port " + port);
})