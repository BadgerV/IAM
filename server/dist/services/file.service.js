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
exports.deleteFileById = exports.updateFile = exports.getAllFiles = exports.getFileById = exports.createFile = void 0;
const connect_1 = __importDefault(require("../db/connect"));
const createFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      INSERT INTO files (user_id, folder_id, file_name, file_size, access_type, description, cloud_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
        const values = [
            file.user_id,
            file.folder_id,
            file.file_name,
            file.file_size,
            file.access_type,
            file.description,
            file.cloud_url,
        ];
        const result = yield client.query(query, values);
    }
    finally {
        client.release();
    }
});
exports.createFile = createFile;
const getAllFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      SELECT 
        files.*, 
        folders.name AS folder_name, 
        
        users.username AS owner_username 
      FROM files 
      LEFT JOIN folders ON files.folder_id = folders.id 
      
      LEFT JOIN users ON files.user_id = users.id
    `;
        const { rows } = yield client.query(query);
        return rows;
    }
    finally {
        client.release();
    }
});
exports.getAllFiles = getAllFiles;
const getFileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "SELECT * FROM files WHERE id = $1";
        const { rows } = yield client.query(query, [id]);
        return rows[0];
    }
    finally {
        client.release();
    }
});
exports.getFileById = getFileById;
const updateFile = (id, file) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      UPDATE files
      SET user_id = $1, folder_id = $2, file_name = $3, file_size = $4, access_type=$5, description = $6, cloud_url = $7
      WHERE id = $8
    `;
        const values = [
            file.user_id,
            file.folder_id,
            file.file_name,
            file.file_size,
            file.access_type,
            file.description,
            file.cloud_url,
            id,
        ];
        yield client.query(query, values);
    }
    finally {
        client.release();
    }
});
exports.updateFile = updateFile;
const deleteFileById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "DELETE FROM files WHERE id = $1";
        yield client.query(query, [id]);
    }
    finally {
        client.release();
    }
});
exports.deleteFileById = deleteFileById;
