var http = require("http");
var path = require("path");
var fs = require("fs");

const file = fileName => fs.createReadStream(fileName, "utf-8");

http
  .createServer(function (req, res) {
    // http header
    res.writeHead(200, { "Content-Type": "text/html" });

    var url = req.url;
    //routing html pages

    if (url === "/") {
      var filePath = path.join(__dirname, "", "./index.html");
      fs.readFile(filePath, "utf-8", function (err, data) {
        if (err) {
          return console.log("Unable to read file " + err);
        }
        res.write(data);
        res.end();
      });
    } else if (url.includes(".css")) {
      //css file
      res.writeHead(200, { "Content-Type": "text/css" });
      file("./css/styles.css").pipe(res);
    } else if (url.includes(".js")) {
      //js file
      res.writeHead(200, { "Content-Type": "text/js" });
      file("./js/scripts.js").pipe(res);
    } else if (url.startsWith("assets")) {
      file("./" + url).pipe(res);
    } else if (url === "/about") {
      var filePath = path.join(__dirname, "pages", "./about.html");
      fs.readFile(filePath, "utf-8", function (err, data) {
        if (err) {
          return console.log("Unable to read file " + err);
        }
        res.write(data);
        res.end();
      });
    } else if (url === "/post") {
      var filePath = path.join(__dirname, "pages", "./post.html");
      fs.readFile(filePath, "utf-8", function (err, data) {
        if (err) {
          return console.log("Unable to read file " + err);
        }
        res.write(data);
        res.end();
      });
    } else if (url === "/services") {
      var filePath = path.join(__dirname, "pages", "./services.html");
      fs.readFile(filePath, "utf-8", function (err, data) {
        if (err) {
          return console.log("Unable to read file " + err);
        }
        res.write(data);
        res.end();
      });
    } else if (url === "/contact") {
      var filePath = path.join(__dirname, "pages", "./contact.html");

      fs.readFile(filePath, "utf-8", function (err, data) {
        if (err) {
          return console.log("Unable to read file " + err);
        }
        res.end(data);
      });
    } else if (url.startsWith("/admin")) {
      //admin?role=admin return hellow admin
      if (url === "/admin?role=admin") {
        var filePath = path.join(__dirname, "pages", "./admin.html");
        fs.readFile(filePath, "utf-8", function (err, data) {
          if (err) {
            return console.log("Unable to read file " + err);
          }
          res.end(data);
        });
      } else {
        //4- /admin with anyother query redirect user to /login route
        var filePath = path.join(__dirname, "pages", "./login.html");
        fs.readFile(filePath, "utf-8", function (err, data) {
          if (err) {
            return console.log("Unable to read file " + err);
          }
          res.end(data);
        });
      }
    } else {
      //404 error
      var filePath = path.join(__dirname, "pages", "./error.html");

      fs.readFile(filePath, "utf-8", function (err, data) {
        if (err) {
          return console.log("Unable to read file " + err);
        }
        res.end(data);
      });
    }
  })
  .listen(3000);
