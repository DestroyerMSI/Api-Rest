// MoviesController.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { movies } = require('../movies.json'); 
import { ValidarAll, ValidarOne } from '../validador.js';
//import { ModalMovies } from '../mysql/mysql.js';

export class MoviesController {
    constructor({ModalMovies}){
        this.ModalMovies = ModalMovies
    }
     getAll =   async(req, res) => {
        const { genero } = req.query;
        try {
            const moviesFiltered = await this.ModalMovies.getAll({ genero });
            res.status(200).json(moviesFiltered);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

     getID =   async(req, res) => {
        const { id } = req.params;
        try {
            const movieFilter = await this.ModalMovies.getidd({ id });
            if (movieFilter) {
                res.status(200).json(movieFilter);
            } else {
                res.status(404).json({ error: 'Movie not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

     add =   async(req, res) => {
        try {
            const validado = ValidarAll(req.body);
            if (validado.success) {
                const newMovie = await this.ModalMovies.add({ ...validado.data });
                res.status(201).json(newMovie);
            } else {
                res.status(403).json({ error: validado.error.errors });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

     update =   async(req, res) => { 
        const { id } = req.params;
        try {
            const validado = ValidarOne(req.body);
            if (!validado.success) {
                return res.status(400).json(validado.error.errors); 
            }
            const updatedMovie = await this.ModalMovies.update({ object: id, validado });
            if (updatedMovie) {
                res.status(200).json(updatedMovie);
            } else {
                res.status(404).json({ error: 'No se encontró ninguna película con ese id' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
