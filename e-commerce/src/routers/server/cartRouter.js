const { prisma } = require('../../prisma');
const { sendError } = require('../../utils/backend-utils');
const firewall = require('../firewall');

const router = require('express').Router();

router.post('/save/cart', firewall, async (req, res) => {
    try {
        const { products, total, count } = req.body;

        if (!products || !total || !count) {
            throw new Error('Products, Total and Count are required');
        }

        let cart = await prisma.cart.findUnique({ where: { userId: req.user.id }, include: { products: { include: { product: true } } } });

        cart ? (
            cart = await prisma.cart.update({
                where: { userId: req.user.id },
                data: {
                    totalAmount: total,
                    totalQuantity: count,
                    products: {
                        delete: cart.products.reduce((final, { product }) => {
                            if (!products.find(({ id }) => id === product.id))
                                final.push({ unique_identifier: { cartId: cart.id, productId: product.id } });
                            return final;
                        }, []),
                        upsert: products.map(({ id, count }) => ({
                            where: { 'unique_identifier': { productId: id, cartId: cart.id } },
                            update: { quantity: count },
                            create: {
                                product: { connect: { id } },
                                quantity: count
                            }
                        }))
                    }
                }
            })
        ) : (
            cart = await prisma.cart.create({
                data: {
                    totalAmount: total,
                    totalQuantity: count,
                    products: {
                        create: products.map(({ id, count }) => ({
                            product: { connect: { id } },
                            quantity: count
                        }))
                    },
                    user: { connect: { id: req.user.id } }
                }
            })
        );

        res.status(200).send({ message: 'Cart saved', body: { cart } });
    } catch (err) {
        console.error(err);
        sendError(err, res);
    }
});

router.get('/cart', firewall, async (req, res) => {
    try {
        const cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: {
                products: {
                    select: {
                        product: true,
                        quantity: true
                    }
                }
            }
        });

        cart?.products.length ? (
            res.status(200).send({
                message: 'Success',
                body: {
                    products: cart.products,
                    count: cart.totalQuantity,
                    total: cart.totalAmount
                }
            })
        ) : (
            res.status(200).send({ message: 'Cart is Empty', body: { empty: true } })
        );
    } catch (err) {
        console.error(err);
        sendError(err, res);
    }
});

module.exports = router;