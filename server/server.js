const express = require('express')
const app = express();
const cors = require('cors');
const port = 8080;


const bodyParser = require('body-parser')
const authRouter = require("./Routes/auth-route");
const contactRouter = require("./Routes/contact");
const connectDb = require('./utils/db');
const cookieParser = require('cookie-parser');


const dotenv = require('dotenv');
dotenv.config();
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET , POST , PUT , DELETE , PATCH , HEAD",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser())

app.use(bodyParser.json());




app.use('/api',authRouter);
app.use('/api',contactRouter);

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server Running at port ${port}`)
    });

});
