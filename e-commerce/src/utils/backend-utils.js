const bcrypt = require('bcrypt');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

const encodeToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.JWT_SECRET);
        return token;
    } catch (err) {
        throw err;
    }
};

const decodeToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        return data;
    } catch (err) {
        throw err;
    }
};

const encodePassword = async (password) => {
    try {
        return bcrypt.hash(password, 10);
    } catch (err) {
        throw err;
    }
};

const comparePassword = async (text, hash) => {
    try {
        return bcrypt.compare(text, hash);
    } catch (err) {
        throw err;
    }
};

const filterUser = (user) => {
    delete user.password;
    delete user.tokens;

    return user;
};

const sendError = (err, res) => {
    res.status(err.code || 500).send({ message: err.message || 'Something went wrong' });
};

const cookieParser = (req, res, next) => {
    const headersCookie = req.headers.cookie;
    if (headersCookie) {
        const cookies = cookie.parse(req.headers.cookie);
        req.cookies = cookies;
    }
    next();
};

const setCookies = (res, { token, email, id }) => {
    res.cookie('token', token, { httpOnly: true });
    res.cookie('email', email, { httpOnly: true });
    res.cookie('auth-uid', id);
};

const clearCookies = (res) => {
    res.clearCookie('token');
    res.clearCookie('email');
    res.clearCookie('auth-uid');
};

module.exports = { encodePassword, comparePassword, filterUser, sendError, setCookies, clearCookies, cookieParser, encodeToken, decodeToken };