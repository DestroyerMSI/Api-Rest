
  import { object as _object, string } from 'zod'

   const validador = _object({
    genero: string({
        invalid_type_error:'Error el tipo de formato esta mal',
        required_error:'Este campo es requerido'
    }),
    nombre: string({
                invalid_type_error:'Error el tipo de formato esta mal',
        required_error:'Este campo es requerido'
    }),
    url: string({
                invalid_type_error:'Error el tipo de formato esta mal',
        required_error:'Este campo es requerido'
    })
   })


 export function ValidarAll(object){
    return validador.safeParse(object)
 }

 export function ValidarOne(object){
    return validador.partial().safeParse(object)
  }

