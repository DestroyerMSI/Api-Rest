import express from 'express';
// import movies from './movies.json' with { type: 'json' }; 
import { MovieRouter } from './web/routes/movies.js';
import { middleware } from './midelware/cors.js';
import {ModalMovies} from './mysql/mysql.js'
const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.use(middleware());

app.get('/', (req, res) => {
    res.end(`<div>
        <h2>Los links permitidos son:</h2>
        <ul>
            <li>/movies</li>
            <li>/movies/:id</li>
            <li>/movies?genero=''</li>
        </ul>
    </div>`);
});

app.use('/movies', MovieRouter({ModalMovies:ModalMovies}));

app.use((req, res) => {
    res.status(404).json({ error: 'Error 404: Not Found' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Está en el puerto', port);
});
