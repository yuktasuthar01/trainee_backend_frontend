const { PrismaClient } = require('@prisma/client');
const { comparePassword, encodeToken } = require('./utils/backend-utils');

const prisma = new PrismaClient();

const generateAuthToken = async (id) => {
    try {
        try {
            const token = encodeToken({ id });

            try {
                const user = await prisma.user.update({
                    where: { id }, data: {
                        tokens: { push: token }
                    }
                });

                return token;
            } catch (err) {
                throw err;
            }
        } catch (err) {
            throw err;
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const findByCredentials = async (email, password) => {
    try {
        try {
            const user = await prisma.user.findUnique({ where: { email } });

            try {
                const result = await comparePassword(password, user.password);

                if (result) return user;

                throw new Error('Invalid Password');
            } catch (err) {
                throw err;
            }

        } catch (err) {
            throw err;
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = { prisma, generateAuthToken, findByCredentials };