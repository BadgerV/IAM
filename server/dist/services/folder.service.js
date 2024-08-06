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
exports.deleteFolderById = exports.updateFolder = exports.getFolders = exports.getFolderById = exports.createFolder = void 0;
const connect_1 = __importDefault(require("../db/connect"));
const createFolder = (folder) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      INSERT INTO folders (name, description)
      VALUES ($1, $2)
    `;
        const values = [folder.name, folder.description];
        yield client.query(query, values);
    }
    finally {
        client.release();
    }
});
exports.createFolder = createFolder;
const getFolderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      SELECT 
  folders.id as folder_id,
  folders.name,
  json_agg(json_build_object(
    'file_id', files.id, 
    'file_name', files.file_name, 
    'access_type', files.access_type,
    'user_id', files.user_id,
    'owner_username', users.username,
    'file_size', files.file_size
  )) as files
FROM 
  folders
LEFT JOIN 
  files ON folders.id = files.folder_id
LEFT JOIN
  users ON files.user_id = users.id
WHERE 
  folders.id = $1
GROUP BY
  folders.id;
    `;
        const { rows } = yield client.query(query, [id]);
        if (rows.length === 0) {
            return undefined; // Return undefined if no folder with the given ID is found
        }
        // Extract folder data and format the result
        const folderData = rows[0];
        const folder = {
            id: folderData.folder_id,
            name: folderData.name,
            files: folderData.files || [], // If there are no files, set it to an empty array
        };
        return folder;
    }
    finally {
        client.release();
    }
});
exports.getFolderById = getFolderById;
const getFolders = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
     SELECT 
  folders.id as folder_id,
  folders.name,
  json_agg(json_build_object(
    'file_id', files.id, 
    'file_name', files.file_name, 
    'access_type', files.access_type,
    'owner_username', users.username,
    'file_size', files.file_size
  )) as files
FROM 
  folders
LEFT JOIN 
  files ON folders.id = files.folder_id
LEFT JOIN
  users ON files.user_id = users.id
GROUP BY
  folders.id;
    `;
        const { rows } = yield client.query(query);
        // Map the result rows to Folder objects
        const folders = rows.map((row) => {
            return {
                id: row.folder_id,
                name: row.name,
                files: row.files || [], // If there are no files, set it to an empty array
            };
        });
        return folders;
    }
    finally {
        client.release();
    }
});
exports.getFolders = getFolders;
const updateFolder = (id, folder) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      UPDATE folders
      SET name = $1, description = $2
      WHERE id = $3
    `;
        const values = [folder.name, folder.description, id];
        yield client.query(query, values);
    }
    finally {
        client.release();
    }
});
exports.updateFolder = updateFolder;
const deleteFolderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "DELETE FROM folders WHERE id = $1";
        yield client.query(query, [id]);
    }
    finally {
        client.release();
    }
});
exports.deleteFolderById = deleteFolderById;
