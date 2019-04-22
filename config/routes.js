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

  'GET /': { view: 'pages/homepage' },
  'GET /administrar-home': {
    action: 'administrador/view-administrar-home',
    locals: {
      layout: "layouts/layout-admin",
    }
  },
  'GET /administrar-contenidos': {
    action: 'administrador/view-administrar-contenidos',
    locals: {
      layout: "layouts/layout-admin",
    }
  },
  // modificar las rutas cuando se complemente con los links desde el indice de administrador o estudiante
  // estudiante
  'GET /indice-estudiante': {
    action: 'estudiante/view-indice-estudiante',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-computadora': {
    action: 'estudiante/modulo-1/view-m-1-computadora',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-computadora-ev': {
    action: 'estudiante/modulo-1/view-m-1-computadora-ev',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-sistema-informatico': {
    action: 'estudiante/modulo-1/view-m-1-sistema-informatico',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },

  'GET /m1-sistema-informatico-monitor': {
    action: 'estudiante/modulo-1/view-m-1-sistema-informatico-monitor',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-sistema-informatico-cpu': {
    action: 'estudiante/modulo-1/view-m-1-sistema-informatico-cpu',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-sistema-informatico-mouse': {
    action: 'estudiante/modulo-1/view-m-1-sistema-informatico-mouse',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-sistema-informatico-teclado': {
    action: 'estudiante/modulo-1/view-m-1-sistema-informatico-teclado',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },

  'GET /m1-sistema-informatico-impresora': {
    action: 'estudiante/modulo-1/view-m-1-sistema-informatico-impresora',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },

  'GET /m1-sistema-informatico-usb': {
    action: 'estudiante/modulo-1/view-m-1-sistema-informatico-usb',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-sistema-informatico-software': {
    action: 'estudiante/modulo-1/view-m-1-sistema-informatico-software',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },

  'GET /m1-conexion-componentes': {
    action: 'estudiante/modulo-1/view-m-1-conexion-componentes',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-conexion-componentes-monitor': {
    action: 'estudiante/modulo-1/view-m-1-conexion-componentes-monitor',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-conexion-componentes-teclado': {
    action: 'estudiante/modulo-1/view-m-1-conexion-componentes-teclado',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-conexion-componentes-mouse': {
    action: 'estudiante/modulo-1/view-m-1-conexion-componentes-mouse',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-conexion-componentes-cablepoder': {
    action: 'estudiante/modulo-1/view-m-1-conexion-componentes-cablepoder',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },

  'GET /m1-conexion-componentes-flashmemory': {
    action: 'estudiante/modulo-1/view-m-1-conexion-componentes-flashmemory',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-conexion-componentes-audio': {
    action: 'estudiante/modulo-1/view-m-1-conexion-componentes-audio',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-encender-apagar-computador': {
    action: 'estudiante/modulo-1/view-m-1-encender-apagar-computador',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-teclado': {
    action: 'estudiante/modulo-1/view-m-1-teclado',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-raton': {
    action: 'estudiante/modulo-1/view-m-1-raton',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m1-evaluacion': {
    action: 'estudiante/modulo-1/view-m-1-evaluacion',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
  'GET /m2-navegacion-escritorio': {
    action: 'estudiante/modulo-2/view-m-2-navegacion-escritorio',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },

  'GET /m2-navegacion-escritorio-escritorio': {
    action: 'estudiante/modulo-2/view-m-2-navegacion-escritorio-escritorio',
    locals: {
      layout: "layouts/layout-modulos",
    }
  },
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
  'DELETE /api/v1/admiminstrador/eliminar-contenido': { action: 'administrador/eliminar-contenido' },


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝
  /**usar funciones de redireccion */
  'GET /acerca': { view: 'pages/acerca-de' }

};
