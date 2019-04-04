module.exports = {


  friendlyName: 'View indice estudiante',


  description: 'Display "Indice estudiante" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/indice-estudiante'
    }

  },


  fn: async function (inputs, exits) {

    var contenidos= [
      {
        id: 'a',
        nombreModulo: 'Introduccion al curso', descripcion: 'descripcion de la intro',
        enlace: '',
        multimedia: 'images/svg/modulo1-portada.svg',
        submodulos: []
      },
      {
        id: 'b',
        nombreModulo: 'antes de empezar', descripcion: 'descripcion antes de empezar',
        enlace: '',
        multimedia: 'images/svg/modulo1-portada.svg',
        submodulos: []
      },
      {
        id: 'c',
        nombreModulo: 'Módulo 1- La computadora ',
        enlace: '/m1-computadora',
        descripcion: 'descripcion la computadora',
        multimedia: 'images/svg/modulo1-portada.svg',
        submodulos: [{
          id: 'c1',
          nombre: 'El sistema informático (Hardware y software)',
          enlace: '/m1-sistema-informatico',
          descripcion: 'Descripcion submódulo',
          multimedia: 'http://..',
          /* temas: [
              {
               id:'12',
               nombre: 'Monitor',
               enlace:'/m1-sistema-informatico-monitor',
               descripcion: 'El monitor ...',
               multimedia: 'http://...'
             },
             {
               id:'13',
               nombre: 'Mouse',
               enlace:'/m1-sistema-informatico-mouse',
               descripcion: 'El monitor ...',
               multimedia: 'http://...'
             }]*/
        },
        {
          id: 'c2',
          nombre: 'Conexion de los distintos componentes de la computadora',
          enlace: '/m1-conexion-componentes',
          descripcion: 'Descripcion submódulo',
          multimedia: 'http://...',

        }]
      },

      {
        id: 'd',
        nombreModulo: 'Módulo 2- Navegacion en escritorio',
        descripcion: 'descripcion Navegacion escritorio',
        enlace: '/m2-navegacion-escritorio',
        multimedia: 'images/svg/buho_bebe.svg',
        submodulos: [{
          id: 'd1',
          nombre: 'El escritorio',
          enlace: '/m2-navegacion-escritorio-escritorio',
          descripcion: 'Descripcion submódulo',
          multimedia: 'http://..',
        },

        ]
      },
      {
        id: 'e',
        nombreModulo: 'Módulo 3-Edición de documentos Word',
        descripcion: 'Edición de documentos en word parte 1',
        enlace: '/',
        multimedia: 'images/svg/modulo1-portada.svg',
        submodulos: [{
          id: 'e1',
          nombre: 'Pantalla principal',
          enlace: '/',
          descripcion: 'Descripcion submódulo',
          multimedia: 'http://..',
        },  ],
      },
      {
        id: 'f',
        nombreModulo: 'Módulo 4-Edición de documentos Word',
        descripcion: 'Edicion de documentos en word parte 2',
        enlace: '/',
        multimedia: 'images/svg/modulo1-portada.svg',
        submodulos: [{
          id: 'f1',
          nombre: 'Pantalla principal',
          enlace: '/',
          descripcion: 'Descripcion submódulo',
          multimedia: 'http://..',
        }, ]
      },

      {
        id: 'g',
        nombreModulo: 'Módulo 5- Inserción de imágenes y tablas',
        descripcion: 'descripcion edicion de documentos',
        enlace: '/',
        multimedia: 'images/svg/modulo1-portada.svg',
        submodulos: [{
          id: 'g1',
          nombre: 'Tablas',
          enlace: '/',
          descripcion: 'Descripcion submódulo',
          multimedia: 'http://..',
        },
        {
          id: 'g2',
          nombre: 'Imágenes',
          enlace: '/',
          descripcion: 'Descripcion submódulo',
          multimedia: 'http://..',
        },

        ]
      },
    ];

    return exits.success({
      contenidos
      // cuando el nombre de la propiedad es igual al nombre del objeto que contiene la información, es posible enviar solo un dato es decir que, pasar, contenido: contenidos es igual que pasar contenidos
    });


  }


};
