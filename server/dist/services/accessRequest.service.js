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
exports.deleteAccessRequestById = exports.updateAccessRequest = exports.getAccessRequests = exports.getAccessRequestByUserFileId = exports.getAccessRequestByUserId = exports.getAccessRequestById = exports.createAccessRequest = void 0;
const connect_1 = __importDefault(require("../db/connect"));
const createAccessRequest = (accessRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      INSERT INTO access_request (file_id, user_id, status, reason)
      VALUES ($1, $2, $3, $4)
    `;
        const values = [
            accessRequest.file_id,
            accessRequest.user_id,
            accessRequest.status,
            accessRequest.reason,
        ];
        yield client.query(query, values);
    }
    finally {
        client.release();
    }
});
exports.createAccessRequest = createAccessRequest;
const getAccessRequestById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "SELECT * FROM access_request WHERE id = $1";
        const { rows } = yield client.query(query, [id]);
        return rows[0];
    }
    finally {
        client.release();
    }
});
exports.getAccessRequestById = getAccessRequestById;
const getAccessRequestByUserFileId = (user_id, file_id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "SELECT * FROM access_request WHERE user_id = $1 AND file_id = $2";
        const { rows } = yield client.query(query, [user_id, file_id]);
        return rows[0];
    }
    finally {
        client.release();
    }
});
exports.getAccessRequestByUserFileId = getAccessRequestByUserFileId;
const getAccessRequestByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "SELECT * FROM access_request WHERE user_id = $1";
        const { rows } = yield client.query(query, [user_id]);
        return rows;
    }
    finally {
        client.release();
    }
});
exports.getAccessRequestByUserId = getAccessRequestByUserId;
const getAccessRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "SELECT * FROM access_request";
        const { rows } = yield client.query(query);
        return rows;
    }
    finally {
        client.release();
    }
});
exports.getAccessRequests = getAccessRequests;
const updateAccessRequest = (id, accessRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      UPDATE access_request
      SET file_id = $1, user_id = $2, status = $3, reason = $4
      WHERE id = $5
    `;
        const values = [
            accessRequest.file_id,
            accessRequest.user_id,
            accessRequest.status,
            accessRequest.reason,
            id,
        ];
        yield client.query(query, values);
    }
    finally {
        client.release();
    }
});
exports.updateAccessRequest = updateAccessRequest;
const deleteAccessRequestById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "DELETE FROM access_request WHERE id = $1";
        yield client.query(query, [id]);
    }
    finally {
        client.release();
    }
});
exports.deleteAccessRequestById = deleteAccessRequestById;
