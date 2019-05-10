module.exports = {


  friendlyName: 'View administrar indice',


  description: 'Display "Administrar indice" page.',
  inputs:{
    cursoId:{
      type: 'string',
      required:true
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/administrar-indice'
    }

  },


  fn: async function (inputs) {

    var curso= await Curso.find({id:inputs.cursoId}).populate('modulos');
    // console.log('Curso\n'+ JSON.stringify(curso) );
    // console.log('Curso:'+curso[0].nombre+'- modulos:\n'+ JSON.stringify(curso[0].modulos));


    return {curso:curso[0]};

  }


};
