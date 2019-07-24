module.exports = {


  friendlyName: 'Solicitar curso completo',


  description: 'devuelve el objeto curso con sus respectivos modulos y submodulos',


  inputs: {

    objetoId: {
      type: 'string',
      required: true,
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {


    // EL ORDEN DE LOS OBJETOS POR DEFECTO ES POR FECHA ASCENDENTE
    try {
      //primero busca en el la coleccion CURSO
      var curso = await Curso.findOne({ id: inputs.objetoId });
      //si se encuentra el objeto en curso retorna el objeto encontrado
      //if (Object.keys(curso).lenght > 0) {
        if (curso) {
        //cargo todos los modulos que pertenecen al curso con sus respectivos submodulos
        var modulosCurso = await ModuloLibro.find({ curso: curso.id }).populate('submodulos');
        //guardo los modulos consultados en la propiedad curso.modulos
        curso.modulos = modulosCurso;
        curso.nombreCurso=curso.nombre;//solo se usa en breadcrumb para saber que es un curso y que al dar clic redirija a la p'agina del indice
        return curso;
      }
    } catch (e) {
      sails.log('error al buscar por curso');
      throw e;

    }

    try {
      //si no se encuentra el objeto en la coleccion curso, se busca en la coleccion modulo
      var modulo = await ModuloLibro.findOne({ id: inputs.objetoId }).intercept((err) => { sails.log('ERROR MODULO NO ENCONTRADO', err) });
      //si sse encuentra el objeto en la coleccion ModuloLibro se busca el curso al que pertenece y se envia el curso con sus modulos y submodulos respectivos
      //if (Object.keys(modulo).lenght > 0) {
        if (modulo) {
        var curso = await Curso.findOne({ id: modulo.curso });
        var modulos = await ModuloLibro.find({ curso: modulo.curso }).populate('submodulos');
        curso.modulos = modulos;
        curso.nombreCurso=curso.nombre;//solo se usa en breadcrumb para saber que es un curso y que al dar clic redirija a la p'agina del indice
        return curso;
      }

    } catch (e) {
      sails.log('error al buscar por modulo');
      throw e;
    }
    try {

      // si no se encuentra el objeto en las colecciones curso y ModuloLibro, entonces se busca en la coleccion SubmoduloLibro
      var submodulo = await SubmoduloLibro.findOne({ id: inputs.objetoId });
      // if (Object.keys(submodulo).lenght > 0) {
        if (submodulo) {
        //buscar el modulo al que pertenece el submodulo
        var modulo = await ModuloLibro.findOne({ id: submodulo.modulo });
        //buscar todos los modulos que contienen el mismo curso
        var modulos = await ModuloLibro.find({ curso: modulo.curso }).populate('submodulos');
        //buscar el curso al que pertenece el modulo
        var curso = await Curso.findOne({ id: modulo.curso });
        // agrego los modulos cargados en el curso
        curso.modulos = modulos;
        curso.nombreCurso=curso.nombre; //solo se usa en breadcrumb para saber que es un curso y que al dar clic redirija a la p'agina del indice
        return curso;
      }

    } catch (e) {
      sails.log('error al buscar por submodulo');
      throw e;
    }

  }
};

