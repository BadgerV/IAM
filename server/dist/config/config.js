"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationConfig = exports.FirebaseConfig = exports.DBConfig = exports.AWSConfig = exports.defaultConfig = exports.corsSettings = exports.PORT = exports.isDevelopment = exports.isProd = void 0;
// importing relevant modules
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = path_1.default.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });
exports.isProd = process.env.ENGINE_ENV === "production";
exports.isDevelopment = process.env.ENGINE_ENV === "development";
exports.PORT = parseInt(process.env.PORT || "8000", 10);
exports.corsSettings = exports.isProd
    ? {
        credentials: true,
        origin: [
            "https://google.com",
            "http://localhost:8000",
            "http://localhost:3000",
            "http://localhost:5174",
            "http://localhost:5173",
            "https://storage.googleapis.com",
        ],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    }
    : {
        credentials: true,
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:9000",
            "http://localhost:5173",
            "http://localhost:5174",
            "https://www.test.google.com",
            "http://localhost:8080",
            "https://storage.googleapis.com",
        ],
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    };
// defaultConfig object - this contains any config strings || numbers
exports.defaultConfig = {
    PORT: process.env.PORT ? Number(process.env.PORT) : 8000,
    SECRET_KEY: process.env.SECRET_KEY ? String(process.env.SECRET_KEY) : "",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
        ? String(process.env.ADMIN_PASSWORD)
        : "",
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY
        ? String(process.env.ENCRYPTION_KEY)
        : "",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ? String(process.env.ADMIN_EMAIL) : "",
};
exports.AWSConfig = {
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY
        ? String(process.env.AWS_ACCESS_KEY)
        : "",
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY
        ? String(process.env.AWS_SECRET_KEY)
        : "",
};
exports.DBConfig = {
    DB_USER: process.env.DB_USER ? String(process.env.DB_USER) : "",
    DB_HOST: process.env.DB_HOST ? String(process.env.DB_HOST) : "",
    DB_NAME: process.env.DB_NAME ? String(process.env.DB_NAME) : "",
    DB_PASSWORD: process.env.DB_PASSWORD ? String(process.env.DB_PASSWORD) : "",
    DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    DB_URL: process.env.DB_URL ? String(process.env.DB_URL) : "",
};
exports.FirebaseConfig = {
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET
        ? String(process.env.FIREBASE_STORAGE_BUCKET)
        : "",
};
exports.verificationConfig = {
    VERIFICATION_CODE_LENGTH: 4,
    username: process.env.mailuser,
    password: process.env.mailpass,
};
