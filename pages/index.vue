<template>
  <div class="w-full md:w-[740px] mx-auto">
    <!-- <EnvioCorreoTest></EnvioCorreoTest> -->
    <section class="pt-14 md:pt-32  relative" id="inicio">
      <div class="flex gap-4 md:absolute md:right-3 md:top-10  md:-z-10">
        <img
          class="rounded-full size-24 mb-4 md:size-44 "
          alt="foto José Montes"
          src="/logoEmpresa.png"
        />
        <a
          class="justify-center items-center md:hidden flex"
          href="https://www.linkedin.com/in/jos%C3%A9-rafael-montes-gonzalez-746977278/"
          target="_blank"
          rel="noopener"
        >

        </a>
      </div>

      <div
        class="text-black dark:text-white font-bold justify-start flex flex-col-reverse md:flex-row gap-x-4 pb-10"
      >
        <h1 class="text-3xl md:text-5xl">Bienvenido A empresas <span class="md:hidden font-bold text-blue-600">COMPANY</span></h1>
        <a
          class="justify-center items-center hidden md:flex"
          href="https://www.linkedin.com/in/jos%C3%A9-rafael-montes-gonzalez-746977278/"
          target="_blank"
          rel="noopener"
        >
          <!-- <Badge class="">Innovando para ti</Badge> -->
        </a>
      </div>
      <h2 class="text-2xl opacity-85 text-wrap">
        <span></span>
        <span class="text-blue-700 dark:text-yellow-200/90"
          >Usted es importante para nosotros, envienos un correo electronico a la siguiente dirección</span
        >
      </h2>

      <nav class="flex flex-wrap gap-x-3 gap-y-2 mt-8">

        <div
          class="rounded-full border border-black dark:border-white/10 flex justify-center items-center gap-x-2 py-2 px-4 bg-white/5 hover:bg-white/10 transition"

        >
        <a
          href="mailto:joxmal123@gmail.com"
         >
          <Icon name="icomoon-free:mail" class="text-2xl dark:text-white " />
          edithson@kalstein.net
        </a>
          <div class="flex items-center justify-center"
          @click="copiarTexto({texto:'edithson@kalstein.net'})"
          >
            <IconPopover
              targetID="contacto"
              content="copiar"
              name-icon="mingcute:copy-line"
              class="size-4"
              class-container="h-4 flex items-center justify-center cursor-pointer"
            />
          </div>
        </div>
        <a href="#correo">
          <span class="rounded-full border border-black dark:border-white/10 flex justify-center items-center gap-x-2 py-2 px-4 bg-white/5 hover:bg-white/10 transition cursor-pointer"> 
            O usa nuestra Plataforma 
            <Icon name="formkit:arrowdown" size="22px"></Icon>
          </span>
        </a>

      </nav>
    </section>




    <section id="correo" class=" mt-[500px] mb-40 w-full relative ">
      <div class="absolute -top-[350px] right-10 -z-10 shadow-xl shadow-blue-600 rounded-md overflow-hidden">
        <img src="/imagenFondo.jpg" class="w-[850px] h-96 object-cover" alt="">
      </div>
      <div class="bg-gray-700 w-[30%] min-w-[130px] max-[400px]:hidden  absolute right-16 md:right-24 -top-64 tracking-widest rounded-sm">
        <p class="py-5 md:py-12 md:text-2xl px-5 font-black uppercase text-wrap ">
          Tu puerta al mundo digital
        </p>
      </div>


      <div class="bg-white shadow-md shadow-black text-black rounded-md w-[80%] mx-auto h-[366px]">
        <span v-if="!CorreoEnviado" class="text-center block text-lg md:text-3xl mb-11 font-extrabold tracking-widest"> CONTACTENOS</span>
        <form v-if="!CorreoEnviado" @submit.prevent="enviarCorreoPost" class="flex mx-8 flex-col gap-y-8 text-center [&>div>input]:text-black  [&>div>input]:h-8 ">

          <div class="flex flex-col">
            <input v-model="informacionCorreo.nombre" class="border-b-4 focus:border-blue-500  px-4 border-gray-500 outline-none" type="text" placeholder="Nombre" >
          </div>

          <div class="flex flex-col">
            <input v-model="informacionCorreo.razon" type="text" class="border-b-4 focus:border-blue-500  px-4 border-gray-500 outline-none" placeholder="Titulo/Razón" >
          </div>

          <div class="flex flex-col">
            <textarea  v-model="informacionCorreo.mensaje" class="border-b-4 focus:border-blue-500  px-4 border-gray-500 outline-none" placeholder="Mensaje"></textarea>
          </div>

          <div>
            <button id="botonCorreo" type="submit" class=" p-2 border border-blue-500 my-4 w-full bg-blue-500 hover:cursor-pointer hover:bg-sky-400 transition-colors duration-700 ">
              ENVIAR
            </button>
          </div>
        </form>
        <div v-else class="flex flex-col justify-center items-center h-full w-full">
          <span class="text-lg font-semibold">Correo Enviado con Exito</span>
           <Icon name="ooui:success" size="80px" color="green" ></Icon>
        </div>
      </div>
    </section>

  </div>

  <!-- <div
        class="bg-red-400"
      v-motion="motionFadeUpDelay">
      Hello
    </div> -->
</template>

<script setup>
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import { initPopovers } from "flowbite";


const CorreoEnviado = ref(false)

const informacionCorreo = ref({
 nombre:'',
 razon:'',
 mensaje:''
})

async function enviarCorreoPost(){

  if(informacionCorreo.value.nombre.length === 0 || informacionCorreo.value.razon.length === 0 || informacionCorreo.value.mensaje.length === 0 ){
    alert('por favor rellene los campos')
    console.log(informacionCorreo.value.nombre.length)
    return
  }
  
  const boton = document.querySelector('#botonCorreo')
  console.log(boton)
  boton.setAttribute('disabled','')

  const { data } = await useFetch('/api/correo/enviarCorreo',{
        method: 'post',
        body: {informacionCorreo}
    })
    console.log(data)
    CorreoEnviado.value = true
    toastr.success('!Te atenderemos enseguida')
}


const copiarTexto =  ({ texto = "correo" }) => {
  navigator.clipboard.writeText(texto);
  toastr.success('!copiado con exito')
};

onMounted(() => {
  initPopovers();
});

useHead({
  htmlAttrs: {
    lang: "es",
  },
});

useSeoMeta({
  title: "Empresa COMPANY",
  description:
    "Tu puerta al mundo Digital",
});



</script>

<style scoped>


</style>
