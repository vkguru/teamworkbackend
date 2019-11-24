import http from 'http';
import app from './app';
import dotenv from 'dotenv';
import Users from './server/controller/Users';
import Auth from './server/middleware/Auth';
import Articles from './server/controller/Articles';

dotenv.config();

app.post('/api/v1/articles', Auth.verifyToken, Articles.create);
app.get('/api/v1/articles', Auth.verifyToken, Articles.getAll);
app.get('/api/v1/articles/:id', Auth.verifyToken, Articles.getOne);
app.put('/api/v1/articles/:id', Auth.verifyToken, Articles.update);
app.delete('/api/v1/articles/:id', Auth.verifyToken, Articles.delete);
app.post('/api/v1/articles/comment', Auth.verifyToken, Articles.addComment);
app.delete('/api/v1/articles/deletecomment', Auth.verifyToken, Articles.deleteComment);
app.post('/api/v1/gifs', Auth.verifyToken, Articles.createGif);
app.post('/api/v1/gifs/comment', Auth.verifyToken, Articles.addGifComment);
app.post('/api/v1/gifs/delete', Auth.verifyToken, Articles.deleteGif);
app.post('/api/v1/auth/createuser', Users.create);
app.post('/api/v1/auth/signin',Users.login);
app.delete('/api/v1/users/auth/deleteuser', Auth.verifyToken, Users.delete);

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
