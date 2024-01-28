import { Resend } from 'resend';


const resend = new Resend(useRuntimeConfig().RESEND_API_KEY);
export default defineEventHandler(async (event) => {
  console.log('ejecutado')
  try {
    const {informacionCorreo} = await readBody(event)

    const data = await resend.emails.send({
      from: 'Company <onboarding@resend.dev>',
      to: ['joxmal123@gmail.com'],
      subject: `${informacionCorreo.razon}`,
      html: `<strong>${informacionCorreo.mensaje}</strong>`,
    });
    console.log('correo enviado')
   return data
    
  } catch (error) {
    return { error };
  }
});

// export default defineEventHandler(async(event) => {

//   // const body = await readBody(event)

//   const datos = event.context.params
//   console.log(datos)
//   return 'los datos son'+ datos
//   // const name =  getRouterParam(event, 'enviar')
    



// })