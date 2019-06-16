require('dotenv').config(); //process.env.____
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./controllers/error');
const authRoutes = require('./routes/auth');


const PORT  = 8080;
app.use(cors());
app.use(bodyParser.json());


// routes
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    let err = new Error ('Page Not Found!');
    err.status = 404;
    next(err);
});

app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`Server is Listening on port ${PORT}`);
})