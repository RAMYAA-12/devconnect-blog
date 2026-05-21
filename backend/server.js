const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let posts = [];

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const post = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content
    };

    posts.push(post);
    res.json(post);
});

app.delete('/posts/:id', (req, res) => {
    posts = posts.filter(post => post.id != req.params.id);

    res.json({ message: 'Post deleted' });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
