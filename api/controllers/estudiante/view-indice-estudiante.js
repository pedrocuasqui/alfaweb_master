module.exports = {


  friendlyName: 'View indice estudiante',


  description: 'Display "Indice estudiante" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/indice-estudiante'
    }

  },


  fn: async function (inputs,exits) {

    var contenidos = [
      {
        id:'a',
        nombreModulo: 'Introduccion al curso', descripcion: 'descripcion de la intro',
        enlace:'',
        multimedia: 'http://...',
        submodulos: []
      },
      {
        id:'b',
        nombreModulo: 'antes de empezar', descripcion: 'descripcion antes de empezar',
        enlace:'',
        multimedia: 'http://...',
        submodulos: []
      },
      {
        id:'c',
        nombreModulo: 'Módulo 1- La computadora',
        enlace:'/m1-computadora',
        descripcion: 'descripcion modulo',
        multimedia: 'http://...',
        submodulos: [{
          id:'c1',
          nombre: 'El sistema informático (Hardware y software)',
          enlace:'/m1-sistema-informatico',
          descripcion: 'Descripcion submódulo',
          multimedia: 'http://..',
          temas: [
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
            }]
        },
        {
          id:'c2',
          nombre: 'Conexion de los distintos componentes de la computadora',
          enlace:'/m1-conexion-componentes',
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
