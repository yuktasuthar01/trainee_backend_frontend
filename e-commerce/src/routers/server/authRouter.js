const router = require('express').Router();
const { prisma } = require('../../prisma');
const { generateAuthToken, findByCredentials } = require('../../prisma');
const { filterUser, encodePassword, sendError, setCookies, clearCookies, decodeToken } = require('../../utils/backend-utils');
const firewall = require('../firewall');

router.get('/authenticate', async (req, res) => {
    try {
        if (!req.cookies.token) {
            clearCookies(res);
            res.status(401).send({ message: 'Authorization token required' });
            return;
        }

        const token = req.cookies.token;

        try {
            const { id } = decodeToken(token);

            try {
                const user = await prisma.user.findUnique({ where: { id, tokens: { has: token } } });

                setCookies(res, { email: user.email, token, id: user.id });
                res.status(202).send({ message: 'Authenticated', body: { user: filterUser(user), token } });

            } catch (err) {
                throw err;
            }

        } catch (err) {
            throw err;
        }

    } catch (err) {
        console.error(err);
        clearCookies(res);
        sendError(err, res);
    }
});

router.post('/login', async (req, res) => {
    try {
        try {
            const user = await findByCredentials(req.body.email, req.body.password);

            try {
                const token = await generateAuthToken(user.id);

                setCookies(res, { email: user.email, token, id: user.id });
                res.status(200).send({ message: 'User loggedIn Successfully', body: { token, user: filterUser(user) } });
            } catch (err) {
                throw err;
            }
        } catch (err) {
            throw err;
        }
    } catch (err) {
        console.error(err);
        clearCookies(res);
        sendError(err, res);
    }
});

router.post('/signup', async (req, res) => {
    try {
        try {
            try {
                req.body.password = await encodePassword(req.body.password);
            } catch (err) {
                throw err;
            }

            const user = await prisma.user.create({ data: { ...req.body, tokens: [] } });

            try {
                const token = await generateAuthToken(user.id);

                setCookies(res, { email: user.email, token, id: user.id });
                res.status(201).send({ message: 'User created Successfully', body: { user: filterUser(user), token } });
            } catch (err) {
                throw err;
            }
        } catch (err) {
            throw err;
        }
    } catch (err) {
        console.error(err);
        sendError(err, res);
    }
});

router.get('/logout', firewall, async (req, res) => {
    try {
        try {
            const { tokens } = await prisma.user.findFirst({ where: { id: req.user.id, tokens: { has: req.token } } });

            try {

                await prisma.user.update({
                    where: { id: req.user.id },
                    data: {
                        tokens: {
                            set: tokens.filter(token => token !== req.token)
                        }
                    }
                });

                clearCookies(res);
                res.status(200).send({ message: 'Logged out successfully' });
            } catch (err) {
                throw err;
            }

        } catch (err) {
            throw err;
        }


    } catch (err) {
        console.error(err);
        clearCookies(res);
        sendError(err, res);
    }
});

module.exports = router;
