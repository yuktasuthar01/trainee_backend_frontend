const router = require('express').Router();
const { prisma } = require('../../prisma');
const { sendError } = require('../../utils/backend-utils');
const firewall = require('../firewall');

router.get('/me/products', firewall, async (req, res) => {
    try {
        try {
            const { take, page, search } = req.query;
            const queryObject = { where: { ownerId: req.user.id } };

            search && (
                queryObject.where = {
                    ...queryObject.where,
                    OR: [
                        { title: { contains: search, mode: 'insensitive' } },
                        { subtitle: { contains: search, mode: 'insensitive' } },
                    ]

                }
            );

            const count = await prisma.product.count(queryObject);
            if (!count) {
                res.status(200).send({ body: { count } });
                return;
            }

            if (!req.query?.take) {
                throw new Error('Number of Items per page is required as "take" query Parameter');
            }

            take && (queryObject.take = parseInt(take));
            page && (queryObject.skip = parseInt(page) * parseInt(take));

            try {
                const products = await prisma.product.findMany(queryObject);

                res.status(200).send({ body: { products, count } });
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

module.exports = router;