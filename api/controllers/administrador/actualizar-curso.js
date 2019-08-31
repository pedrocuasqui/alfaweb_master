module.exports = {


  friendlyName: 'Actualizar curso',


  description: 'Actualiza el nombre del curso enviado por parámetro',


  inputs: {
    cursoId: {
      type: 'string',
      required: true,
    },
    nombreCurso: {
      type: 'string',
      required: true,
    },
    descripcionCurso: {
      type: 'string',
      required: false,
    }
  },


  exits: {
    redirect: {
      description: 'Redirecciona a la página de administrar-curso, aquí se puede editar el curso y sus módulos',
      responseType: 'redirect'
    }

  },


  fn: async function (inputs) {

    var res = this.res;
    // var cursoRecibido = JSON.parse(inputs.curso);

    try {
      await Curso
        .update({
          id: inputs.cursoId
        })
        .set({
          nombre: inputs.nombreCurso,
          descripcion: inputs.descripcionCurso
        });
    } catch (e) {
      sails.log('Error al intentar actualizar el curso:' + inputs.nombreCurso + '\n' + e)
      if (e.CODE == 'E_UNIQUE') {
        return res.status(409).send({ error: e });
      }
      if (e.name == 'UsageError') {
        return res.status(400).send({ error: e });
      } else {
        return res.status(500).send({ err: e });
      }

    }

    return res.ok();

  }


};
