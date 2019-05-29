/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
 

 

  var cursoCreado;
  if (await Curso.count() == 0 ) {

    cursoCreado = await Curso.create(
      {
        nombre: 'Alfabetizacion informática',
        descripcion: 'Enseñanza de informática básica',
        

      }
    ).fetch();
    
    await ModuloLibro.createEach([
      {
        nombreModulo: 'Introduccion al curso',
        descripcion: 'descripcion de la introduccion',
        multimedia: {},
        curso: cursoCreado.id,
        contenidoTiny:'<p>Pulse para editar</p>',
        
      },
      {
        nombreModulo: 'Módulo 1- La computadora ',
        descripcion: 'La computadora es una máquina electrónica capaz de recibir un conjunto de órdenes y ejecutarlas realizando cálculos complejos, o agrupando y correlacionando otro tipo de información. Es también conocida como ordenador o computador.',
        enlace:'/m1-computadora',
        multimedia: {},
        curso: cursoCreado.id,
        contenidoTiny:'<p>Pulse para editar</p>',
      },
      {
        nombreModulo: 'Módulo 2- Navegacion en escritorio',
        descripcion: 'descripcion Navegacion escritorio',
        enlace:'/m2-navegacion-escritorio',
        multimedia: {},
        curso: cursoCreado.id,
        contenidoTiny:'<p>Pulse para editar</p>',
      },
      {
        nombreModulo: 'Módulo 3-Edición de documentos Word',
        descripcion: 'Edición de documentos en word parte 1',
        enlace:'/m3-edicion-documentos-1',
        multimedia: {},
        curso: cursoCreado.id,
        contenidoTiny:'<p>Pulse para editar</p>',
      },
      {
        nombreModulo: 'Módulo 4-Edición de documentos Word',
        descripcion: 'Edición de documentos en word parte 2',
        enlace:'/m4-edicion-documentos-2',
        multimedia: {},
        curso: cursoCreado.id,
        contenidoTiny:'<p>Pulse para editar</p>',
      },
      {
        nombreModulo: 'Módulo 5- Inserción de imágenes y tablas',
        descripcion: 'descripcion Modulo 5',
        enlace:'/m5-insercion-imagenes',
        multimedia: {},
        curso: cursoCreado.id,
        contenidoTiny:'<p>Pulse para editar</p>',
      },
      {
        nombreModulo: 'Módulo 6 - Navegar en Internet',
        descripcion: 'descripcion Modulo 6',
        enlace:'/m6-navegar-internet',
        multimedia: {},
        curso: cursoCreado.id,
        contenidoTiny:'<p>Pulse para editar</p>',
      },
      {
        nombreModulo: 'Módulo 7 - Correo Electrónico y Skype',
        descripcion: 'descripcion Modulo 7',
        enlace:'/m7-redes-sociales',
        multimedia: {},
        curso: cursoCreado.id,
        contenidoTiny:'<p>Pulse para editar</p>',
      },
       {
        nombreModulo: 'Módulo 8 - Páginas de Interne',
        descripcion: 'descripcion Modulo8',
        enlace:'/m8-paginas-internet',
        multimedia: {},
        curso: cursoCreado.id,
        contenidoTiny:'<p>Pulse para editar</p>',
      },
      {
        nombreModulo: 'Módulo 9. Dispositivos Móviles',
        descripcion: 'descripcion Modulo 9',
        enlace:'/m9-dispositivos-moviles',
        multimedia: {},
        curso: cursoCreado.id,
        contenidoTiny:'<p>Pulse para editar</p>',
      }
    ]);

    sails.log('creacion de curso y modulos correcta!');

    await Curso.create(
      {
        nombre: 'Mongo DB',
        descripcion: 'Conceptos basicos de mongo DB',
        

      });

  }

  var estudianteCreado;
var cursos= await Curso.find({});
var curso= cursos[0];
  if (await Estudiante.count() == 0 && Object.keys(curso).length>0 ) {
    estudianteCreado= await Estudiante.create(
      {
      nombre: 'Pedro Cuasqui',
      alias: 'Pedroc',
      email: 'pedro.cuasqui@gmail.com',
      password: '$2y$05$WuVNU5BVtpYDLeiN9kZdkOTYRlmf9wQe42JPbkcfneOlsvJe1ZRnS',
      ultimoAcceso:'2019-05-20',
      cursos:curso.id
    }).fetch();

    await Estudiante.create({
      nombre: 'Elsa Pito',
      alias: 'esita',
      email: 'elsa.pita@gmail.com',
      password: '$2y$05$WuVNU5BVtpYDLeiN9kZdkOTYRlmf9wQe42JPbkcfneOlsvJe1ZRnS',
      ultimoAcceso:'2019-04-20',
      cursos:curso.id
    });
  
    sails.log('creacion de estudiante correcta!');
  }
 

  
 
  // ```
  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)

  // intento numero uno por importar un componente de vue : fallido
  // sails.vuesidebarmenu = require('vue-sidebar-menu');
  return done();

};
