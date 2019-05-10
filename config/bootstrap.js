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
  if (await Curso.count() == 0) {

    cursoCreado = await Curso.create(
      {
        nombre: 'Alfabetizacion informática',
        descripcion: 'Enseñanza de informática básica'
      }
    ).fetch();
    
    await ModuloLibro.createEach([
      {
        nombreModulo: 'Introduccion al curso',
        descripcion: 'descripcion de la introduccion',
        enlace: '',
        multimedia: 'images/svg/modulo1-portada.svg',
        curso: cursoCreado.id
      },
      {
        nombreModulo: 'Módulo 1- La computadora ',
        descripcion: 'descripcion la computadora',
        enlace: '/m1-computadora',
        multimedia: 'images/svg/modulo1-portada.svg',
        curso: cursoCreado.id
      },
      {
        nombreModulo: 'Módulo 2- Navegacion en escritorio',
        descripcion: 'descripcion Navegacion escritorio',
        enlace: '/m2-navegacion-escritorio',
        multimedia: 'images/svg/buho_bebe.svg',
        curso: cursoCreado.id
      },
      {
        nombreModulo: 'Módulo 3-Edición de documentos Word',
        descripcion: 'Edición de documentos en word parte 1',
        enlace: '/',
        multimedia: 'images/svg/modulo1-portada.svg',
        curso: cursoCreado.id
      },
      {
        nombreModulo: 'Módulo 4-Edición de documentos Word',
        descripcion: 'Edicion de documentos en word parte 2',
        enlace: '/',
        multimedia: 'images/svg/modulo1-portada.svg',
        curso: cursoCreado.id
      },
      {
        nombreModulo: 'Módulo 5- Inserción de imágenes y tablas',
        descripcion: 'descripcion edicion de documentos',
        enlace: '/',
        multimedia: 'images/svg/modulo1-portada.svg',
        curso: cursoCreado.id
      }
    ]);

    sails.log('creacion de curso y modulos correcta!');

    if (await Estudiante.count() == 0) {
      await Estudiante.create({
        nombre: 'Pedro Cuasqui',
        alias: 'Pedroc',
        email: 'pedro.cuasqui@gmail.com',
        password: '$2y$05$WuVNU5BVtpYDLeiN9kZdkOTYRlmf9wQe42JPbkcfneOlsvJe1ZRnS',
        curso: cursoCreado.id,
      });
  
      sails.log('creacion de estudiante correcta!');
    }
  }


  // if (await UsuarioEjemplo.count() == 0) {
  //   await UsuarioEjemplo.createEach([
  //     {
  //       nombre: 'pedro',
  //       alias: 'pedro123',
  //       email: 'pedro.cuasqui@gmail.com',
  //       password: '$2y$05$PZQyo52Vv6uuDum4SziXKeqa9Au4sEGHCI/anpKapijAsXQLhg83a',
  //       administrador: true,
  //       tutor: false,
  //       estudiante: false,
  //     },
  //     {
  //       nombre: 'jose',
  //       alias: 'jose1234',
  //       email: 'josej@gmail.com',
  //       password: '$2y$05$fIDENMKjmg4HyOz3Ssx1T.tM8B2uSyBo5/pYaSxhHEOcSn/eryWuG',
  //       administrador: false,
  //       tutor: false,
  //       estudiante: true,
  //     },
  //   ]);
  // }
  // ```
  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)

  // intento numero uno por importar un componente de vue : fallido
  // sails.vuesidebarmenu = require('vue-sidebar-menu');
  return done();

};
