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
exports.UserController = void 0;
const User_1 = require("@app-models/User");
const generateAccessToken_1 = require("./utils/generateAccessToken");
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (!name) {
                res.status(400).json({ data: null, message: 'Missing name in request.' });
                return;
            }
            if (!email) {
                res.status(400).json({ data: null, message: 'Missing email in request.' });
                return;
            }
            if (!UserController.isValidEmail(email)) {
                res.status(400).json({ data: null, message: 'Invalid email provided.' });
                return;
            }
            if (!password) {
                res.status(400).json({ data: null, message: 'Missing password in request.' });
                return;
            }
            try {
                const userExists = yield User_1.UserModel.findOne({ email });
                if (userExists) {
                    res.status(400).json({ data: null, message: 'User already exists.' });
                    return;
                }
                const user = yield User_1.UserModel.create({ name, email, password });
                if (!user) {
                    res.status(400).json({ data: null, message: 'Invalid user data.' });
                    return;
                }
                res.status(201).json({ data: UserController.getUserData(user) });
            }
            catch (error) {
                console.error('An error happened while creating a new user:', error);
                res.status(500).json({ data: null, message: 'Unable to create user.' });
            }
        });
    }
    static isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    static authUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email) {
                res.status(400).json({ data: null, message: 'Missing email in request.' });
                return;
            }
            if (!password) {
                res.status(400).json({ data: null, message: 'Missing password in request.' });
                return;
            }
            try {
                const user = yield User_1.UserModel.findOne({ email });
                const isValidPassword = user && (yield user.matchPassword(password));
                if (!user || !isValidPassword) {
                    res.status(401).json({ data: null, message: 'Invalid user or password.' });
                    return;
                }
                res.status(200).json({ data: UserController.getUserData(user) });
            }
            catch (error) {
                console.error('An error happened while retrieving the user:', error);
                res.status(500).json({ data: null, message: 'Unable to find user.' });
            }
        });
    }
    static getUserProfile(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' });
                return;
            }
            try {
                const user = yield User_1.UserModel.findById(req.user._id);
                if (!user) {
                    res.status(404).json({ data: null, message: 'Not user found.' });
                    return;
                }
                res.status(200).json({ data: UserController.getUserPublicData(user) });
            }
            catch (error) {
                console.error("An error happened while retrieving the user's data:", error);
                res.status(500).json({ data: null, message: "Unable get user's data." });
            }
        });
    }
    static getUsers(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.UserModel.find({});
                res.status(200).json({ data: users });
            }
            catch (error) {
                console.error('An error happened while retrieving users:', error);
                res.status(500).json({ data: null, message: 'Unable get users data.' });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.UserModel.findById(req.params.id);
                if (!user) {
                    res.status(404).json({ data: null, message: 'Not user found.' });
                    return;
                }
                yield user.remove();
                res.status(200).json({ data: true, message: 'User deleted.' });
            }
            catch (error) {
                console.error('An error happened while deleting user:', error);
                res.status(500).json({ data: null, message: 'Unable to delete user.' });
            }
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.UserModel.findById(req.params.id).select('-password');
                if (!user) {
                    res.status(404).json({ data: null, message: 'Not user found.' });
                    return;
                }
                res.status(200).json({ data: user, message: 'User found.' });
            }
            catch (error) {
                console.error('An error happened while getting user:', error);
                res.status(500).json({ data: null, message: 'Unable to get user.' });
            }
        });
    }
    static updateUserProfile(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                res.status(401).json({ data: null, message: 'Unauthorized. Invalid user.' });
                return;
            }
            try {
                const user = yield User_1.UserModel.findById(req.user._id);
                if (!user) {
                    res.status(404).json({ data: null, message: 'Not user found.' });
                    return;
                }
                user.name = req.body.name || user.name;
                if (req.body.password) {
                    // Only set password if there is a new one provided so the user model does not hash the password again.
                    user.password = req.body.password;
                }
                const updatedUser = yield user.save();
                res.status(200).json({ data: UserController.getUserData(updatedUser) });
            }
            catch (error) {
                console.error("An error happened while updating the user's data:", error);
                res.status(500).json({ data: null, message: "Unable to update user's data." });
            }
        });
    }
    static updateUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.UserModel.findById(req.params.id);
                if (!user) {
                    res.status(404).json({ data: null, message: 'Not user found.' });
                    return;
                }
                user.name = req.body.name || user.name;
                user.isAdmin = Boolean(req.body.isAdmin);
                const updatedUser = yield user.save();
                res.status(200).json({ data: UserController.getUserPublicData(updatedUser) });
            }
            catch (error) {
                console.error("An error happened while updating the user's data:", error);
                res.status(500).json({ data: null, message: "Unable to update user's data." });
            }
        });
    }
    static getUserPublicData(user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        };
    }
    static getUserData(user) {
        return Object.assign(Object.assign({}, UserController.getUserPublicData(user)), { token: generateAccessToken_1.generateAccessToken(user._id) });
    }
}
exports.UserController = UserController;
