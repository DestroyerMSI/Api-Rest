import {createRequire} from 'module'
import crypto from 'crypto';
const require = createRequire(import.meta.url)

 const {movies} = require('../movies.json')

 export class MovieModal {
   static getAll= async({id}) =>  {
       if(id){
           const movieFilter = movies.find(movie => movie.id === Number(id)); 
           return movieFilter
       }
  return movies
   }   
 }

 export class addmovie{
    static add = async(input)=>{
        const newMovie = {
            ...input,
            id: crypto.randomUUID()
        };
        movies.push(newMovie); 
     return newMovie
    }   
 }

 export class update{
    static updatemoviess = async ({object,validado})=>{
        const movieIndex = movies.findIndex(movie => movie.id === Number(object));
        if (movieIndex !== -1) {
            const updatedMovie = {
                ...movies[movieIndex],
                ...validado.data
            };
            movies[movieIndex] = updatedMovie; 
              return updatedMovie
        }
    }

 }
  
 