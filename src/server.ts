import express from 'express';
import { jsonplaceholderResponse } from './schemas/jsonplaceholderResponse';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/ping', (req, res) => {
    res.json({ pong: true });
});

server.get('/posts', async (req, res) => {

    const request = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await request.json();

    const result = jsonplaceholderResponse.safeParse(data);

    if (!result.success) {
        return res.status(500).json({ error: 'Internal error' });
    }

    let totalPosts = result.data.length;

    res.json({ total: totalPosts });
    
});

server.listen(3000, () => {
    console.log('Running: http://localhost:3000');
});