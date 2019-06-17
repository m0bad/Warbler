require('dotenv').config(); //process.env.____
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./controllers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const { loginRequired, ensureCorrectUser} = require('./middlewares/auth');

const PORT  = 8080;
app.use(cors());
app.use(bodyParser.json());


// routes
app.use('/api/auth', authRoutes);
app.use(
    '/api/users/:id/messages',
     loginRequired,
     ensureCorrectUser,
     messagesRoutes
   );

app.get('/api/messages', async function (req, res, next){
    try {
        let messages = await db.Messages.find()
            .sort({createdAt: 'desc'})
            .populate('user', {
                username: true,
                profileImageUrl: true
            });
            return res.status(200).json(messages);
    } catch (err) {
        return next(err);
    }
})

app.use((req, res, next) => {
    let err = new Error ('Page Not Found!');
    err.status = 404;
    next(err);
});

app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`Server is Listening on port ${PORT}`);
})
