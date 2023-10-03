const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./db');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    const posts = await db.getPosts();

    res.render('index', { posts });
});

app.post('/', async (req, res) => {
    const post = {
        name: req.body.name,
        content: req.body.content,
        date: new Date(),
    };
    await db.createPost(post);
    const posts = await db.getPosts();

    res.render('index', { posts });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
