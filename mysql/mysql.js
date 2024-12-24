// mysql.js
import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'Naruto03*',
    database: 'movies'
};

const pool = mysql.createPool(config);

export class ModalMovies {
    static async getAll({ genero }) {
        try {
            const [rows] = await pool.query('SELECT nombre, genero, url, BIN_TO_UUID(id) AS id FROM movie');
            if (genero) {
                return rows.filter(singleMovie => singleMovie.genero === genero);
            }
            return rows;
        } catch (error) {
            throw new Error('Ocurrió un error al obtener las películas: ' + error.message);
        }
    }

    static async getidd({ id }) {
        try {
            const [rows] = await pool.query('SELECT nombre, genero, url, BIN_TO_UUID(id) AS id FROM movie WHERE id = UUID_TO_BIN(?)', [id]);
            if (rows.length === 0) {
                throw new Error('Película no encontrada');
            }
            return rows[0];
        } catch (error) {
            throw new Error('Ocurrió un error: ' + error.message);
        }
    }

    static async add({ nombre, url, genero }) {
        try {
            const [uuidResult] = await pool.query('SELECT UUID() AS uuid');
            const [{ uuid }] = uuidResult;

            const results = await pool.query(
                `INSERT INTO movie (id, nombre, genero, url) VALUES (UUID_TO_BIN(?), ?, ?, ?)`,
                [uuid, nombre, genero, url]
            );

            return results;
        } catch (error) {
            console.error(error);
            throw new Error('Error al agregar la película: ' + error.message);
        }
    }

    static async update({ object, validado }) {
        try {
            const updates = [];
            const values = [];
            if (validado.data.nombre) {
                updates.push('nombre = ?');
                values.push(validado.data.nombre);
            }
            if (validado.data.url) {
                updates.push('url = ?');
                values.push(validado.data.url);
            }
            if (validado.data.genero) {
                updates.push('genero = ?');
                values.push(validado.data.genero);
            }
    
      
            if (updates.length === 0) {
                throw new Error('No se proporcionaron datos para actualizar.');
            }
    
            values.push(object);
    
         
            const query = `UPDATE movie SET ${updates.join(', ')} WHERE id = UUID_TO_BIN(?)`;
            
            const results = await pool.query(query, values);
            
            if (results.affectedRows === 0) {
                throw new Error('Película no encontrada');
            }
    
            return results;
        } catch (error) {
            throw new Error('Error al actualizar la película: ' + error.message);
        }
    }
    

    static async delete(id) {
        try {
            const results = await pool.query(
                `DELETE FROM movie WHERE id = UUID_TO_BIN(?)`,
                [id]
            );

            if (results.affectedRows === 0) {
                throw new Error('Película no encontrada');
            }

            return results; 
        } catch (error) {
            console.error(`Ha ocurrido un error: ${error}`);
            throw new Error('Error al eliminar la película: ' + error.message);
        }
    }
}
