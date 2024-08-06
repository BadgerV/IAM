"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogsByUserId = exports.getLogsByFileId = exports.getAllLogs = exports.createLog = void 0;
const connect_1 = __importDefault(require("../db/connect"));
const createLog = (log) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("this function is working");
    const client = yield connect_1.default.connect();
    try {
        const query = `
      INSERT INTO logs (user_id, action_taken, file_id)
      VALUES ($1, $2, $3)
    `;
        const values = [log.user_id, log.action_taken, log.file_id];
        yield client.query(query, values);
    }
    finally {
        client.release();
    }
});
exports.createLog = createLog;
const getAllLogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      SELECT 
        logs.*, 
        users.username 
      FROM 
        logs
      LEFT JOIN 
        users ON logs.user_id = users.id;
    `;
        const { rows } = yield client.query(query);
        return rows;
    }
    finally {
        client.release();
    }
});
exports.getAllLogs = getAllLogs;
const getLogsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      SELECT 
        logs.*, 
        users.username 
      FROM 
        logs
      WHERE user_id = $1
      LEFT JOIN 
        users ON logs.user_id = users.id;
    `;
        const { rows } = yield client.query(query, [userId]);
        return rows;
    }
    finally {
        client.release();
    }
});
exports.getLogsByUserId = getLogsByUserId;
const getLogsByFileId = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "SELECT * FROM logs WHERE file_id = $1";
        const { rows } = yield client.query(query, [fileId]);
        return rows;
    }
    finally {
        client.release();
    }
});
exports.getLogsByFileId = getLogsByFileId;
