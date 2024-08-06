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
exports.authenticateToken = exports.getUserController = exports.getUsersController = exports.verifyEmail = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../services/user.service");
const permission_service_1 = require("../services/permission.service");
const config_1 = require("../config/config");
const log_service_1 = require("../services/log.service");
const uuid_1 = require("uuid");
const saltRounds = 10;
const secretKey = config_1.defaultConfig.SECRET_KEY;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            res
                .status(400)
                .json({ message: "username, email, password, role are required" });
        }
        // const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = {
            id: 1, // Generate unique ID
            username,
            email,
            password: password,
            is_admin: false,
        };
        yield (0, user_service_1.createUser)(newUser);
        const user = yield (0, user_service_1.getUserByEmail)(email);
        const newPermission = {
            user_id: Number(user === null || user === void 0 ? void 0 : user.id),
            can_read: false,
            can_write: false,
            can_delete: false,
            role,
            is_active: true,
        };
        yield (0, permission_service_1.createPermission)(newPermission);
        yield (0, log_service_1.createLog)({
            id: 1,
            user_id: Number(req.user_id),
            action_taken: `Created User ${username}`,
            file_id: null,
        });
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // console.log(email, password);
        const user = yield (0, user_service_1.getUserByEmail)(email);
        const permission = yield (0, permission_service_1.getPermissionByUserId)(Number(user === null || user === void 0 ? void 0 : user.id));
        const role = permission === null || permission === void 0 ? void 0 : permission.role;
        const is_active = permission === null || permission === void 0 ? void 0 : permission.is_active;
        const username = user === null || user === void 0 ? void 0 : user.username;
        if (!user) {
            res.status(401).json({ message: "Invalid email" });
            return;
        }
        const isPasswordValid = password === user.password;
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secretKey);
        const verificationCode = (0, uuid_1.v4)().substring(0, 5);
        // let code = await sendEmailVerification(verificationCode, email);
        // // send a messsage
        // const transport = nodemailer.createTransport({
        //   service: "gmail",
        //   auth: {
        //     user: verificationConfig?.username,
        //     pass: verificationConfig?.password
        //   }
        // });
        // // construct the email
        // let sender = 'noreply@gmail.com'
        // const mailOptions = {
        //   from: sender,
        //   to: email,
        //   subject: "Verify your Staff Account to be secure.",
        //   html: `Here is your verification code - ${verificationCode}`
        // }
        // transport.sendMail(mailOptions, async (err, resp) => {
        //   if (err) {
        //     console.log(err)
        //     return res.status(200).json({
        //       message: 'Error sending message'
        //     }
        //     );
        //   } else {
        //     await createLog({
        //       id: 1,
        //       user_id: Number(user.id),
        //       action_taken: "Logged In",
        //       file_id: null,
        //     });
        //     return res.json({
        //       username,
        //       token,
        //       email,
        //       role,
        //       is_active,
        //       id: user.id,
        //     });
        //   }
        // }
        // )
        //simply becuase the mailer isnt working --temp solution
        const userDTO = {
            username: user.username,
            email: user.email,
            token: token,
            role: role,
            is_active: is_active
        };
        res.status(200).send(userDTO);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.login = login;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const user = yield (0, user_service_1.verifyEmailVerification)(code);
    if (!user) {
        return res.status(401).json({ message: "Invalid token", data: null });
    }
    else {
        return res.status(200).json({ message: "Email Verified", data: code });
    }
});
exports.verifyEmail = verifyEmail;
// Controller function to get a folder by ID
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Call the service function to get the folder by ID
        const folders = yield (0, user_service_1.getUsers)();
        if (!folders) {
            return res.status(404).json({ message: "Users not found" });
        }
        res.status(200).json(folders);
    }
    catch (error) {
        console.error("Error fetching folders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUsersController = getUsersController;
// Controller function to get a folder by ID
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Call the service function to get the folder by ID
        const user = yield (0, user_service_1.getUserById)(Number(userId));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user);
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Featching user", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserController = getUserController;
// Middleware for authenticating JWT token
// export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
function authenticateToken(req, res, next) {
    // Extract the token from the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    // Verify and decode the token
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }
        // Add the decoded user information to the request object
        req.user = decoded;
        next();
    });
}
exports.authenticateToken = authenticateToken;
