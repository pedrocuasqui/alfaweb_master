/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /**LAYOUT GENERAL DE CONTENIDOS */
  'GET /interfaz-modulos': {
    action: 'estudiante/view-interfaz-modulos'
  },

  'GET /': {
    action: 'view-homepage',
  },
  /**AUTENTICACION */
  'GET /view-registro-usuario': {
    action: 'autenticacion/view-registro-usuario',
  },

  'POST /registro-usuario': {
    action: 'autenticacion/registro-usuario',
  },
  'GET /view-login': {
    action: 'autenticacion/view-login',
  },
  'POST /login': {
    action: 'autenticacion/login',
  },

  /* RUTAS DE ADMINISTRADOR*/

  'GET /administrar-home': {
    action: 'administrador/view-administrar-home',

  },
  'GET /administrar-indice': {
    action: 'administrador/view-administrar-indice',
  },
  'GET /administrar-contenido': {
    action: 'administrador/view-administrar-contenido',
  },

  'GET /view-crear-curso': {
    action: 'administrador/view-crear-curso',
  },

  'POST /crear-curso': {
    action: 'administrador/crear-curso',
  },
  'GET /eliminar-curso': {
    action: 'administrador/eliminar-curso'
  },
  'GET /view-actualizar-curso': {
    action: 'administrador/view-actualizar-curso',
  },
  'POST /actualizar-curso': {
    action: 'administrador/actualizar-curso',
  },
  'GET /consulta-cursos': {
    action: 'administrador/consulta-cursos'
  },

  'GET /view-crear-modulo': {
    action: 'administrador/view-crear-modulo',

  },
  'POST /crear-modulo': {
    action: 'administrador/crear-modulo',
  },

  'GET /view-crear-submodulo': {
    action: 'administrador/view-crear-submodulo',

  },
  'POST /crear-submodulo': {
    action: 'administrador/crear-submodulo',
  },
  'POST /cargar-imagen': {
    action: 'administrador/cargar-imagen',
  },
  'POST /actualizar-modulo': {
    action: 'administrador/actualizar-modulo',
  },
  'POST /actualizar-submodulo': {
    action: 'administrador/actualizar-submodulo',
  },
  'GET /eliminar-contenido': {
    action: 'administrador/eliminar-contenido'
  },
  'PUT /publicar-curso/:cursoId': {
    action: 'administrador/publicar-curso',
  },
  'GET /crear-evaluacion': {
    action: 'administrador/view-crear-evaluacion'
  },
  'POST /crear-evaluacion': {
    action: 'administrador/crear-evaluacion'
  },
  'GET /view-puntaje-estudiante': {
    action: 'administrador/view-puntaje-estudiante'
  },

  /** RUTAS DE ESTUDIANTE */
  // modificar las rutas cuando se complemente con los links desde el indice de administrador o estudiante
  // estudiante

  'GET /contenido-alfaweb': {
    action: 'estudiante/view-contenido-alfaweb',

  },
  'GET /indice-estudiante': {
    action: 'estudiante/view-indice-estudiante',

  },
  'POST /crear-intento-evaluacion': {
    action: 'estudiante/crear-intento-evaluacion',

  },
  'GET /puntuacion-estudiante': {
    action: 'estudiante/puntuacion-estudiante',

  },

  // 'GET /m1-computadora': {
  //   action: 'estudiante/modulo-1/view-m-1-computadora',

  // },
  // 'GET /m1-computadora-ev': {
  //   action: 'estudiante/modulo-1/view-m-1-computadora-ev',

  // },
  // 'GET /m1-sistema-informatico': {
  //   action: 'estudiante/modulo-1/view-m-1-sistema-informatico',

  // },

  // 'GET /m1-sistema-informatico-monitor': {
  //   action: 'estudiante/modulo-1/view-m-1-sistema-informatico-monitor',

  // },
  // 'GET /m1-sistema-informatico-cpu': {
  //   action: 'estudiante/modulo-1/view-m-1-sistema-informatico-cpu',

  // },
  // 'GET /m1-sistema-informatico-mouse': {
  //   action: 'estudiante/modulo-1/view-m-1-sistema-informatico-mouse',

  // },
  // 'GET /m1-sistema-informatico-teclado': {
  //   action: 'estudiante/modulo-1/view-m-1-sistema-informatico-teclado',

  // },

  // 'GET /m1-sistema-informatico-impresora': {
  //   action: 'estudiante/modulo-1/view-m-1-sistema-informatico-impresora',

  // },

  // 'GET /m1-sistema-informatico-usb': {
  //   action: 'estudiante/modulo-1/view-m-1-sistema-informatico-usb',

  // },
  // 'GET /m1-sistema-informatico-software': {
  //   action: 'estudiante/modulo-1/view-m-1-sistema-informatico-software',

  // },

  // 'GET /m1-conexion-componentes': {
  //   action: 'estudiante/modulo-1/view-m-1-conexion-componentes',

  // },
  // 'GET /m1-conexion-componentes-monitor': {
  //   action: 'estudiante/modulo-1/view-m-1-conexion-componentes-monitor',

  // },
  // 'GET /m1-conexion-componentes-teclado': {
  //   action: 'estudiante/modulo-1/view-m-1-conexion-componentes-teclado',

  // },
  // 'GET /m1-conexion-componentes-mouse': {
  //   action: 'estudiante/modulo-1/view-m-1-conexion-componentes-mouse',

  // },
  // 'GET /m1-conexion-componentes-cablepoder': {
  //   action: 'estudiante/modulo-1/view-m-1-conexion-componentes-cablepoder',

  // },

  // 'GET /m1-conexion-componentes-flashmemory': {
  //   action: 'estudiante/modulo-1/view-m-1-conexion-componentes-flashmemory',

  // },
  // 'GET /m1-conexion-componentes-audio': {
  //   action: 'estudiante/modulo-1/view-m-1-conexion-componentes-audio',

  // },
  // 'GET /m1-encender-apagar-computador': {
  //   action: 'estudiante/modulo-1/view-m-1-encender-apagar-computador',

  // },
  // 'GET /m1-teclado': {
  //   action: 'estudiante/modulo-1/view-m-1-teclado',

  // },
  // 'GET /m1-raton': {
  //   action: 'estudiante/modulo-1/view-m-1-raton',

  // },
  // 'GET /m1-evaluacion': {
  //   action: 'estudiante/modulo-1/view-m-1-evaluacion',

  // },
  // 'GET /m2-navegacion-escritorio': {
  //   action: 'estudiante/modulo-2/view-m-2-navegacion-escritorio',

  // },

  // 'GET /m2-navegacion-escritorio-escritorio': {
  //   action: 'estudiante/modulo-2/view-m-2-navegacion-escritorio-escritorio',

  // },
  // 'GET /m2-navegacion-escritorio': {
  //   action: 'estudiante/modulo-2/view-m-2-navegacion-escritorio',

  // },
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝
  /**usar funciones de redireccion */
  'GET /acerca': { view: 'pages/acerca-de' }

};
