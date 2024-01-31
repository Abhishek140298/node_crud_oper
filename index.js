const http = require("http");
const url = require("url");
const fs = require("fs");
const querystring = require("querystring");
const getData = require("./CRUD/get");
const postData = require("./CRUD/post");
const putData = require("./CRUD/put");
const deleteData = require("./CRUD/delete");

const data = fs.readFileSync("./data.json");

let projects = JSON.parse(data);
console.log("Projects .len", projects.length, projects);
let lastindex = projects.length > 0 ? projects.length : 0;

const server = http.createServer((req, res) => {
  const urlparse = url.parse(req.url, true);

  if (urlparse.pathname == "/projects" && req.method == "GET") {
    getData(req, res);
  } else if (urlparse.pathname == "/projects" && req.method == "POST") {
    req.on("data", (data) => {
      postData.postPorjects(req, res, data);
    });
  } else if (urlparse.pathname == "/projects/tasks" && req.method == "POST") {
    req.on("data", (data) => {
      const search = urlparse.search;
      postData.postTasks(req, res, search, data, urlparse);
    });
  } else if (urlparse.pathname == "/projects" && req.method == "PUT") {
    req.on("data", (data) => {
      const search = urlparse.search;
      putData(req, res, search, data, urlparse);
    });
  } else if (urlparse.pathname == "/projects" && req.method == "DELETE") {
    console.log("Delete");
    const search = urlparse.search;

    deleteData(req, res, search, urlparse);
  }
});

server.listen(3000);
