const { clearCookies, decodeToken, filterUser, sendError } = require('../utils/backend-utils');
const { prisma } = require('../prisma');

const firewall = async (req, res, next) => {
    try {
        if (!req?.cookies?.token) {
            clearCookies(res);
            res.status(401).send({ message: 'Authorization token required' });
            return;
        }

        try {
            const token = req.cookies.token;

            const data = decodeToken(token);

            try {
                const user = await prisma.user.findFirst({ where: { id: data.id, tokens: { has: token } } });

                req.token = token;
                req.user = filterUser(user);

                next();
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
};

module.exports = firewall;