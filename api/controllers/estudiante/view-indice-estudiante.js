module.exports = {


  friendlyName: 'View indice estudiante',


  description: 'Display "Indice estudiante" page.',

  inputs: {
    usuarioId: {
      type: 'string',
      required: true
    },
    cursoId: {
      type: 'string',
      required: true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/indice-estudiante'
    }

  },


  fn: async function (inputs, exits) {


    /*      var moduloLibro = await ModuloLibro.find(); //esta es una instancia de consulta --> es un intento aún no cumplido de obtener registros de la base de datos
        //el resultado solo se observa cuando se usa la palabra await antes de la instancia y se asigna a una variable
        console.log('metodo1:\n'+moduloLibro); //devuelve el arreglo completo --> [object Object]
        console.log('metodo2:\n'+moduloLibro[0]);// devuelve el objeto JSON de la posision 0 --> [object Object]
        console.log('metodo3:\n'+JSON.stringify(moduloLibro)); //usar JSON.stringify para ver el resultado en consola en formato JSON, JSON.parse muestra un error
     */
    var curso = await Curso.findOne({ id: inputs.cursoId }).populate('modulos');
    // console.log('Curso\n'+ JSON.stringify(curso) );
    // console.log('Curso:'+curso[0].nombre+'- modulos:\n'+ JSON.stringify(curso[0].modulos));

    let moduloLibro = curso.modulos;
    // sails.log(moduloLibro);
    return exits.success({
      contenidos: moduloLibro,

      // cuando el nombre de la propiedad es igual al nombre del objeto que contiene la información, es posible enviar solo un dato es decir que, pasar, contenidos: contenidos es igual que pasar contenidos
    });


  }


};
