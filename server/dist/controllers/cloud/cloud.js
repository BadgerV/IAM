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
exports.fetchFileFromFirebase = exports.uploadToFirebase = void 0;
const firebaseAdmin = __importStar(require("firebase-admin"));
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const blowfish_node_1 = __importDefault(require("blowfish-node"));
const crypto = __importStar(require("crypto"));
// import CryptoJS from "crypto-js";
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../../config/config");
const config_2 = require("../../config/config");
const filePath = path.resolve(__dirname, "../../uploads");
const firebaseJSON = path.resolve(__dirname, "../../access-shield-jagah-firebase.json");
function encryptFile(filePath, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = fs_1.default.readFileSync(filePath);
            // console.log('d', data.toString("base64"))
            const iv = crypto.randomBytes(8);
            console.log(iv, "iv");
            const cipher = new blowfish_node_1.default(password);
            cipher.setIv(iv);
            const encryptedData = cipher.encode(data.toString("base64"));
            // console.log('e', encryptedData)
            // const decryptedData= cipher.decode(encryptedData)
            // console.log('d', decryptedData)
            const encryptedString = Buffer.from(iv).toString("base64") + Buffer.from(encryptedData).toString("base64");
            const finalOutputPath = `${filePath}.encrypted`;
            console.log('path', finalOutputPath);
            fs_1.default.writeFileSync(finalOutputPath, encryptedString);
            return finalOutputPath;
            //   const readerBlowfish = new FileReader();
            //   readerBlowfish.onload = async () => {
            //     const fileContent: any = readerBlowfish.result;
            //     const encryptedContent = await CryptoJS.Blowfish.encrypt(
            //       fileContent,
            //       password
            //     ).toString();
            //     // resolve(encryptedContent);
            //   };
            //   readerBlowfish.onerror = async (error) => {
            //    throw error;
            //   };
            //   readerBlowfish.readAsBinaryString(acceptedFile);
        }
        catch (error) {
            console.error("Error encrypting file:", error);
        }
    });
}
// Function to decrypt content with Blowfish
const decryptFile = (encryptedData, iv, key) => {
    try {
        const cipher = new blowfish_node_1.default(key);
        cipher.setIv(iv);
        const decryptedData = cipher.decode(encryptedData);
        console.log('d', decryptedData);
        //@ts-ignore
        return Buffer.from(decryptedData, 'base64').toString();
    }
    catch (error) {
        throw error;
    }
};
try {
    const serviceAccountRaw = fs_1.default.readFileSync(firebaseJSON, "utf8");
    // Parse the JSON string into the correct type
    const firebaseServiceAccount = JSON.parse(serviceAccountRaw);
    // Initialize Firebase Admin SDK
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
        storageBucket: config_2.FirebaseConfig.FIREBASE_STORAGE_BUCKET,
    });
}
catch (error) {
    console.error("Error reading file:", error);
}
const uploadToFirebase = (filePath, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const bucket = firebaseAdmin.storage().bucket();
    const file = bucket.file(fileName);
    try {
        const encryptedFilePath = yield encryptFile(filePath, config_1.defaultConfig.ENCRYPTION_KEY);
        console.log(encryptedFilePath);
        yield file.save(fs_1.default.createReadStream(String(encryptedFilePath)));
        return `gs://${bucket.name}/${file.name}`;
    }
    catch (error) {
        throw error;
    }
});
exports.uploadToFirebase = uploadToFirebase;
// Function to fetch file from Firebase Storage and decrypt it
const fetchFileFromFirebase = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storage = firebaseAdmin.storage();
        const bucket = storage.bucket();
        const fileRef = bucket.file(fileName);
        // Get a signed URL for the file
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7); // 7 days from now
        const [signedUrl] = yield fileRef.getSignedUrl({
            action: "read",
            expires: expiryDate,
        });
        // Fetch the file content using Axios
        const response = yield axios_1.default.get(signedUrl, { responseType: 'text' });
        const encryptedString = response.data;
        // const decryptedBuffer = Buffer.from(encryptedString, 'base64');
        const iv = Buffer.from(encryptedString.slice(0, 12), 'base64');
        const encryptedData = Buffer.from(encryptedString.slice(12), 'base64');
        console.log(config_1.defaultConfig.ENCRYPTION_KEY);
        const decryptedContent = decryptFile(encryptedData, iv, config_1.defaultConfig.ENCRYPTION_KEY);
        // Define the final output path
        const finalOutputPath = path.resolve(filePath, fileName); // Adjust the file path as needed
        // Write the decrypted content to the file
        const writeStream = fs_1.default.createWriteStream(finalOutputPath, { flags: 'w' });
        writeStream.write(Buffer.from(decryptedContent));
        writeStream.end();
        // Handle events for errors and successful completion
        writeStream.on('error', (error) => {
            console.error('Error writing file:', error);
        });
        writeStream.on('finish', () => {
            console.log(`File "${finalOutputPath}" written successfully.`);
        });
        console.log(`File "${fileName}" decrypted and saved to "${finalOutputPath}" successfully.`);
        return finalOutputPath;
    }
    catch (error) {
        console.error('Error fetching and decrypting file from Firebase:', error);
        throw error;
    }
});
exports.fetchFileFromFirebase = fetchFileFromFirebase;
