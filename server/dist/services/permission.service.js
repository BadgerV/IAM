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
exports.deletePermissionById = exports.updatePermission = exports.getPermissionByUserId = exports.createPermission = void 0;
const connect_1 = __importDefault(require("../db/connect"));
const createPermission = (permission) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      INSERT INTO permissions ( user_id, can_read, can_write, can_delete, is_active, role)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
        const values = [
            permission.user_id,
            permission.can_read,
            permission.can_write,
            permission.can_delete,
            permission.is_active,
            permission.role,
        ];
        yield client.query(query, values);
    }
    finally {
        client.release();
    }
});
exports.createPermission = createPermission;
const getPermissionByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "SELECT * FROM permissions WHERE user_id = $1";
        const { rows } = yield client.query(query, [user_id]);
        return rows[0];
    }
    finally {
        client.release();
    }
});
exports.getPermissionByUserId = getPermissionByUserId;
const updatePermission = (id, permission) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = `
      UPDATE permissions
      SET can_read = $1, can_write = $2, can_delete = $3, is_active = $4, role = $5
      WHERE user_id = $6
    `;
        const values = [
            permission.can_read,
            permission.can_write,
            permission.can_delete,
            permission.is_active,
            permission.role,
            id // Assuming `id` is the `user_id` you want to update for
        ];
        yield client.query(query, values);
    }
    catch (error) {
        console.error('Failed to update permissions:', error);
        throw error; // You might want to handle this differently depending on your error handling strategy
    }
    finally {
        client.release();
    }
});
exports.updatePermission = updatePermission;
const deletePermissionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.default.connect();
    try {
        const query = "DELETE FROM permissions WHERE user_id = $1";
        yield client.query(query, [id]);
    }
    finally {
        client.release();
    }
});
exports.deletePermissionById = deletePermissionById;
