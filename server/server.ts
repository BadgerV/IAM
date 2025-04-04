// importing inbuilt http module
import http from "http";

//importing the init db
import initDB from "./db/init-db";

// importing default config
import { isProd, PORT } from "./config/config";

// import app
import { app } from "./app";

// creating server
const server = http.createServer(app);

//server listen
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

  initDB();
});
