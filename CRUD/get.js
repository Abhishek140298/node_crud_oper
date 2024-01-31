
const fs = require("fs");


const data = fs.readFileSync("./data.json");

let projects = JSON.parse(data);
console.log("Projects .len", projects.length, projects);
let lastindex = projects.length > 0 ? projects.length : 0;

const getData = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(projects, null, 2));
};

module.exports = getData;
