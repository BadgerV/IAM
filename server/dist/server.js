"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing inbuilt http module
const http_1 = __importDefault(require("http"));
//importing the init db
const init_db_1 = __importDefault(require("./db/init-db"));
// importing default config
const config_1 = require("./config/config");
// import app
const app_1 = require("./app");
// creating server
const server = http_1.default.createServer(app_1.app);
//server listen
server.listen(config_1.PORT, () => {
    console.log(`Listening on port ${config_1.PORT}`);
    console.log(config_1.isProd);
    //checks if development environment is production
    if (config_1.isProd) {
        (0, init_db_1.default)();
    }
});
