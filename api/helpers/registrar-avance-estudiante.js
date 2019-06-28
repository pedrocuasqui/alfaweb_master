module.exports = {


  friendlyName: 'Registrar el avance del usuario',


  description: 'REgistra el avance del curso cuando el usuario estudiante está logueado, usa la tabla de rompimiento entre estudiante y curso para almacenar la ultima fecha de acceso y el avance, es decir el ultimo modulo o submodulo abierto',


  inputs: {
    credenciales: {
      type: 'json',
      required: true
    },
    avance: {
      type: 'json',
      required: false,
      // allowNull: true, // ya se sobreentiende que permite nulls cuando el tipo es json
      defaultsTo: null,
      description: 'de ser pasado un objeto json debe tener las siguientes propiedades TIPOCONTENIDO:[\'Modulo\', \'Submodulo\'] y OBJETOID: '
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {


    var fechaUltimoAcceso = Date.now();
    var registroCreadoModificado = null;
    // let avanceCurso = null; //el null es mas facil manejar desde el cliente, se puede poner este valor poque en la base es required:false
    // buscar un registro que contenfa al id del curso y el id del usurio logueado


    let registroCurosEstudiante = await CursoEstudiantes.findOne({where:{
      curso_matriculados: inputs.credenciales.cursoId,
      estudiante_cursos: inputs.credenciales.usuarioId
    }})

    if (!registroCurosEstudiante) {// no existe el registro en la tabla de rompimiento entonces se crea uno
      registroCreadoModificado = await CursoEstudiantes
        .create({
          curso_matriculados: inputs.credenciales.cursoId,
          estudiante_cursos: inputs.credenciales.usuarioId,
          ultimoAcceso: fechaUltimoAcceso,
          avance: inputs.avance
        }).intercept('E_UNIQUE', (err) => {
          return err;
        })
        // Some other kind of usage / validation error
        .intercept({ name: 'UsageError' }, (err) => {
          return err;
        })
        .intercept((err) => { return err; })
        .fetch();
    } else { //si existe el registro entonces se actualiza la información
      registroCreadoModificado = await CursoEstudiantes
        .updateOne({
          curso_matriculados: inputs.credenciales.cursoId,
          estudiante_cursos: inputs.credenciales.usuarioId,
        })
        .set({
          ultimoAcceso: fechaUltimoAcceso,
          avance: inputs.avance
        })
    }

    if (registroCreadoModificado) {
      return registroCreadoModificado;
    }
    else {
      return false;
    }

  }



};

