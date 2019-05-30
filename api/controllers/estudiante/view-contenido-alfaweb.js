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
    let modulos= await ModuloLibro.find({curso:curso.id}).populate('submodulos',{sort: 'createdAt ASC'});
    curso.modulos=modulos;


    //USUARIO PARA PRUEBAS, REEMPLAZAR EN PRODUCCION POR UNA SESION
    var usuario= await Estudiante.findOne({alias: 'Pedroc'});

    if (inputs.enlace == '/m1-computadora') {
      let objetoSeleccionado= await ModuloLibro.findOne({enlace:'/m1-computadora'}).populate('submodulos',{sort: 'createdAt ASC'});
      return this.res.view('pages/estudiante/modulo-1/m-1-computadora',{usuario,curso, objetoSeleccionado});
    } 
    else if(inputs.enlace=='/m1-hardware'){
      let objetoSeleccionado= await SubmoduloLibro.findOne({enlace:'/m1-hardware'});
      let siguiente       = await SubmoduloLibro.findOne(
        { 
        where:{
          ordenNavegacion:objetoSeleccionado.ordenNavegacion+1,
          modulo:objetoSeleccionado.modulo
        }
      });//.sort('createdAt');
      return this.res.view('pages/estudiante/modulo-1/m-1-hardware',{usuario,curso,objetoSeleccionado, siguiente})
    }
    else if(inputs.enlace=='/m1-software'){
      let objetoSeleccionado= await SubmoduloLibro.findOne({enlace:'/m1-hardware'});
      let siguiente       = await SubmoduloLibro.findOne(
        { 
        where:{
          ordenNavegacion:objetoSeleccionado.ordenNavegacion+1,
          modulo:objetoSeleccionado.modulo
        }
      });//.sort('createdAt');
      return this.res.view('pages/estudiante/modulo-1/m-1-software',{usuario,curso,objetoSeleccionado, siguiente})
    }
    else if (inputs.enlace == '/m2-navegacion-escritorio') {
      return this.res.view('pages/estudiante/modulo-2/m-2-navegacion-escritorio',{curso:curso});
    }

    return this.res.ok({});





  }


};
