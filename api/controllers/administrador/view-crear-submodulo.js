module.exports = {


  friendlyName: 'View crear submodulo',


  description: 'Display "Crear submodulo" page.',

  inputs: {
    moduloId:{
      type: 'string',
      required: true
    }
  },
  exits: {

    success: {
      viewTemplatePath: 'pages/administrador/crear-submodulo'
    }

  },


  fn: async function (inputs,exits) {



    var req = this.req;
    var res = this.res;
 
    var usuario = null;
    //si se encuentra el usuario, se remite la información del usuario logueado para poder mostrar su nombre y validar su rol

    if (req.session.userId) {
      usuario = await Profesor.findOne({ id: req.session.userId })
      if (!usuario) {
        res.status(401).send({ mensaje: 'Necesita permisos de Administrador' })
      }

    }else{
      res.status(401).send({ mensaje: 'Necesita permisos de Administrador' })
    }




    sails.log('CODIO DE MODULO'+inputs.moduloId);
    var modulo = await ModuloLibro.findOne({id: inputs.moduloId})
    .intercept((err)=>{sails.log('ERROR MODULO NO ENCONTRADO',err)});
    
    sails.log('MODULO'+JSON.stringify(modulo));
    var modulos = await ModuloLibro.find({curso:modulo.curso}).populate('submodulos');
    var curso= await Curso.findOne({id:modulo.curso})
    .intercept((err)=>{console.log('ERROR doble populate: '+err)});
    
    curso.modulos = modulos;
    sails.log('modulos');
    sails.log(JSON.stringify(modulos));
    sails.log('curso');
    sails.log(JSON.stringify(curso));
    return exits.success({curso, moduloSeleccionado:modulo, usuario});

  }


};
