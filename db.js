const sqlite3 = require('sqlite3').verbose();
const filepath = './data.db';

const db = new sqlite3.Database(filepath, error => {
    if (error) {
        return console.error(error.message);
    }
});

db.run(`CREATE TABLE IF NOT EXISTS posts (
    name VARCHAR(200),
    content TEXT,
    date DATETIME
)`);

const getPosts = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM posts', (err, rows) => {
            const posts = rows.map(post => ({
                ...post,
                date: new Date(post.date).toLocaleString(),
            }));

            resolve(posts);
        });
    });
};

const createPost = post => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO posts VALUES ($name, $content, $date)',
            { $name: post.name, $content: post.content, $date: post.date },
            (err, rows) => {
                resolve();
            }
        );
    });
};

module.exports = {
    getPosts,
    createPost,
};
