const express = require('express');
const path = require('path');
const authRouter = require('./routers/server/authRouter');
const userRouter = require('./routers/server/userRouter');
const productRouter = require('./routers/server/productRouter');
const cartRouter = require('./routers/server/cartRouter');
const { cookieParser } = require('./utils/backend-utils');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());
app.use(cookieParser);

app.use('/api', authRouter, userRouter, productRouter, cartRouter);
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../build/index.html')); });

app.listen(port, () => {
    console.log('Server is up on PORT ', port);
});