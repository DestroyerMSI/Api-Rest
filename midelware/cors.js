import cors from 'cors';

export const middleware = () => cors({
    origin: (origin, callback) => {
        const puertosDisponibles = [
            'http://localhost:3000',
            'http://localhost:3300',
            'http://127.0.0.1:5500', 
            'http://localhost:127.0.0.1:5500' 
        ];
        

        if (puertosDisponibles.includes(origin)) {
            return callback(null, true);
        }

     
        if (!origin) {
            return callback(null, true); 
        }


        return callback(new Error('Origen no válido'));
    }
});
