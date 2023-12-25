// Import the required dependencies
const http = require("http");
const moviesService = require("./moviesService");
const getRequestData = require("./utils");

// Define the port at which the application will run
const PORT = 5000;

// Define the server
const server = http.createServer(async (req, res) => {
  // Get all movies
  if (req.url === "/api/movies" && req.method === "GET") {
    moviesService.getMovies((err, result) => {
      if (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(err);
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(result);
    });
  }

  // Get a movie with specified id
  else if (req.url.match(/\/api\/movies\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    moviesService.getMoviesById(id, (error, result) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(error);
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(result);
      }
    });
  }

  // Save movie details
  else if (req.url === "/api/movies" && req.method === "POST") {
    let movie_data = await getRequestData(req);
    moviesService.saveMovie(JSON.parse(movie_data), (error, result) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(error);
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(result);
      }
    });
  }

  // Update a specific movie
  else if (req.url.match(/\/api\/movies\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    let movie_data = await getRequestData(req);
    moviesService.updateMovie(id, JSON.parse(movie_data), (error, result) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(error);
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(result);
      }
    });
  }

  // Delete a specific movie
  else if (
    req.url.match(/\/api\/movies\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    moviesService.deleteMovieById(id, (error, result) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(error);
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(result);
      }
    });
  }

  // If no route present capture in the else part
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
