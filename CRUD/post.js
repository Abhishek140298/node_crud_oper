
const fs = require("fs");
const querystring = require("querystring");

const data = fs.readFileSync("./data.json");

let projects = JSON.parse(data);
console.log("Projects .len", projects.length, projects);
let lastindex = projects.length > 0 ? projects.length : 0;

const postPorjects = (req, res, data) => {
  const jsondata = JSON.parse(data);

  const title = jsondata.title;
  if (title) {
    console.log("Last Index", lastindex);
    projects.push({ id: lastindex, title, task: [] });

    fs.writeFile("./data.json", JSON.stringify(projects), (err) => {
      if (err) {
        const message = { message: "could not persist data!" };
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify(message, null, 2));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(projects, null, 2));
      }
    });
  } else {
    const message = { message: "no title in body request!" };

    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify(message, null, 2));
  }
};

const postTasks = (req, res, search, data, urlparse) => {
  if (search) {
    const [, query] = urlparse.search.split("?");

    const id = querystring.parse(query).id;
    console.log("query", query, querystring.parse(query), id);
    if (id) {
      const jsondata = JSON.parse(data);
      const task = jsondata.task;
      if (!task) {
        const message = "No task sent";
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify(message, null, 2));
      } else {
        projects.forEach((project, index) => {
          if (project.id == id) {
            projects[index].task.push(task);
          }
        });
        fs.writeFile("./data.json", JSON.stringify(projects), (err) => {
          if (err) {
            const message = "Data can not persisted";
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify(message, null, 2));
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(projects, null, 2));
          }
        });
      }
    } else {
      const message = "No id is passed";
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify(message, null, 2));
    }
  }
};

module.exports = { postPorjects, postTasks };
