import { Router } from "express";
import {MoviesController} from '../../controllers/movie.js'


export const MovieRouter = ({ModalMovies}) => {
const route = Router();

const moviesController = new MoviesController({ModalMovies:ModalMovies})

route.get('/', moviesController.getAll);


route.get('/:id', moviesController.getID);


route.post('/', moviesController.add );


route.patch('/:id', moviesController.update);
return route;
}