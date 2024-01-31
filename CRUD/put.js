
const fs = require("fs");
const querystring = require("querystring");

const data = fs.readFileSync("./data.json");

let projects = JSON.parse(data);
console.log("Projects .len", projects.length, projects);
let lastindex = projects.length > 0 ? projects.length : 0;

const putData = (req, res, search, data, urlparse) => {
  if (search) {
    const [, query] = urlparse.search.split("?");
    const id = querystring.parse(query).id;
    console.log("Id coming", id);
    if (!id) {
      const message = "Id is not passed";
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify(message), null, 2);
    } else {
      const jsondata = JSON.parse(data);

      const title = jsondata.title;
      if (!title) {
        const message = "Project title is not given";
        res.writeHead(400, { "Content-Type": "application" });
        res.end(JSON.stringify(message), null, 2);
      } else {
        console.log("Json Data", jsondata);
        projects.forEach((project, index) => {
          if (project.id == id) {
            projects[index].title = title;
          }
        });

        fs.writeFile("./data.json", JSON.stringify(projects), (err) => {
          if (err) {
            const message = "Data can not be persisited";
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify(message), null, 2);
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(projects), null, 2);
          }
        });
      }
    }
  }
};

module.exports = putData;
