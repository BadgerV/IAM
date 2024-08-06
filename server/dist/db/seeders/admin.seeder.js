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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = void 0;
const permission_service_1 = require("../../services/permission.service");
const user_service_1 = require("../../services/user.service");
const config_1 = require("../../config/config");
const saltRounds = 10;
const secretKey = config_1.defaultConfig.SECRET_KEY;
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Provided object
        const userInfo = {
            username: "admin",
            email: "segunfaozan112@gmail.com",
            password: config_1.defaultConfig.ADMIN_PASSWORD,
            role: "super_admin",
            is_active: true,
            is_admin: true
        };
        // Destructuring assignment
        const { username, email, password, role, is_active, is_admin } = userInfo;
        const hashedPassword = userInfo.password;
        const newUser = {
            id: 1, // Generate unique ID
            username,
            email,
            password: hashedPassword,
            is_admin,
        };
        yield (0, user_service_1.createUser)(newUser);
        const user = yield (0, user_service_1.getUserByEmail)(email);
        console.log(user);
        const newPermission = {
            user_id: Number(user === null || user === void 0 ? void 0 : user.id),
            can_read: true,
            can_write: true,
            can_delete: true,
            role,
            is_active
        };
        yield (0, permission_service_1.createPermission)(newPermission);
        console.log({ message: "Admin User Seeded successfully" });
    }
    catch (error) {
        console.error(error);
        console.log({ message: "Internal Server Error" });
    }
});
exports.createAdmin = createAdmin;
