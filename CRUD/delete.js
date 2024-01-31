
const fs = require("fs");
const querystring = require("querystring");

const data = fs.readFileSync("./data.json");

let projects = JSON.parse(data);
console.log("Projects .len", projects.length, projects);
let lastindex = projects.length > 0 ? projects.length : 0;

const deleteData = (req, res, search, urlparse) => {
  if (search) {
    const [, query] = urlparse.search.split("?");
    const data = querystring.parse(query);
    projects = projects.filter((projetc, index) => projetc.id != data.id);
    console.log("Delete ", projects);
    fs.writeFile("./data.json", JSON.stringify(projects), (err) => {
      if (err) {
        const message = "Data can not be persisted";
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(message), null, 2);
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(projects), null, 2);
      }
    });
  } else {
    const message = "Id is not passed";
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify(message), null, 2);
  }
};

module.exports = deleteData;
