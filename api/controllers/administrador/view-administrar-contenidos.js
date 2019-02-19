module.exports = {

  friendlyName: 'Administrar contenidos',


  description: 'Desplega la página "administrar contenidos"',


  inputs: {

  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/administrador/administrar-contenidos'
    }

  },


  fn: async function (inputs, exits) {
    /*
        if (this.req.me) {
          throw {redirect:'/welcome'};
        }
    */
    // var contenidos = await ModuloLibro.find();

    var contenidos = [
      {
        id:'a',
        nombreModulo: 'Introduccion al curso', descripcion: 'descripcion de la intro',
        href:'',
        multimedia: 'http://...',
        submodulos: []
      },
      {
        id:'b',
        nombreModulo: 'antes de empezar', descripcion: 'descripcion antes de empezar',
        href:'',
        multimedia: 'http://...',
        submodulos: []
      },
      {
        id:'c',
        nombreModulo: 'Módulo 1- La computadora',
        href:'/modulo1-computadora',
        descripcion: 'descripcion modulo',
        multimedia: 'http://...',
        submodulos: [{
          id:'c1',
          nombre: 'El sistema informático (Hardware y software)',
          descripcion: 'Descripcion submódulo',
          multimedia: 'http://...',
          temas: [
            {
              id:'11',
              nombre: 'Hardware',
              descripcion: 'El hardware ...',
              multimedia: 'http://...'
            },
            {
              id:'12',
              nombre: 'Monitor',
              descripcion: 'El monitor ...',
              multimedia: 'http://...'
            },
            {
              id:'13',
              nombre: 'Mouse',
              descripcion: 'El monitor ...',
              multimedia: 'http://...'
            }]
        },
        {
          id:'c2',
          nombre: 'Conexion de los distintos componentes de la computadora',
          descripcion: 'Descripcion submódulo',
          multimedia: 'http://...',
          temas: [
            {}
          ]
        }
        ]
      }];

    return exits.success({
      contenidos
      // cuando el nombre de la propiedad es igual al nombre del objeto que contiene la información, es posible enviar solo un dato es decir que, pasar, contenido: contenidos es igual que pasar contenidos
    });

  }

};
