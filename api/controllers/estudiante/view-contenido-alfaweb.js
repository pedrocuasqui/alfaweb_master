module.exports = {


  friendlyName: 'View contenido alfaweb',


  description: 'Presenta el contenido del curso Alfabetizaweb en funcion del parametro ingresado',
  inputs: {
    enlace: {
      type: 'string',
      required: true
    },

  },

  exits: {

    redirect: {
      description: 'Redirecciona a la url enviada como parametro',
      responseType: 'redirect'
    }

  },


  fn: async function (inputs) {

    var curso = await Curso.findOne({nombre:'Alfabetizacion informática'}).populate('modulos');
    
    if (inputs.enlace == '/m1-computadora') {
      let objetoSeleccionado= await ModuloLibro.findOne({enlace:'/m1-computadora'})
      return this.res.view('pages/estudiante/modulo-1/m-1-computadora',{curso, objetoSeleccionado});
    } 
    else if(inputs.enlace=='/m1-computadora-ev'){
      return this.res.view('pages/estudiante/modulo-1/m-1-computadora-ev',{curso})
    }
    
    else if (inputs.enlace == '/m2-navegacion-escritorio') {
      return this.res.view('pages/estudiante/modulo-2/m-2-navegacion-escritorio',{curso:curso});
    }

    return this.res.ok({});





  }


};
