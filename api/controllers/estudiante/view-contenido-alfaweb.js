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
      return this.res.view('pages/estudiante/modulo-1/m-1-computadora',{usuario,curso, objetoSeleccionado, modulo:objetoSeleccionado});
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
      let anterior       = await ModuloLibro.findOne({ id:objetoSeleccionado.modulo});
      return this.res.view('pages/estudiante/modulo-1/m-1-hardware',{usuario,curso,objetoSeleccionado, siguiente,anterior,modulo:anterior})
    }
    else if(inputs.enlace=='/m1-software'){
      
      let objetoSeleccionado= await SubmoduloLibro.findOne({enlace:'/m1-software'});
      let modulo       = await ModuloLibro.findOne({ id:objetoSeleccionado.modulo});
      let siguiente       = await SubmoduloLibro.findOne(
        { 
        where:{
          ordenNavegacion:objetoSeleccionado.ordenNavegacion+1,
          modulo:objetoSeleccionado.modulo
        }
      });
      let anterior       = await SubmoduloLibro.findOne(
        { 
        where:{
          ordenNavegacion:objetoSeleccionado.ordenNavegacion-1,
          modulo:objetoSeleccionado.modulo
        }
      });
      return this.res.view('pages/estudiante/modulo-1/m-1-software',{usuario,curso,objetoSeleccionado, siguiente, anterior,modulo:modulo})
    }
    else if(inputs.enlace=='/m1-teclado'){
      
      let objetoSeleccionado= await SubmoduloLibro.findOne({enlace:'/m1-teclado'});
      let modulo            = await ModuloLibro.findOne({ id:objetoSeleccionado.modulo});
      let siguiente         = await SubmoduloLibro.findOne(
        { 
        where:{
          ordenNavegacion:objetoSeleccionado.ordenNavegacion+1,
          modulo:objetoSeleccionado.modulo
        }
      });
      let anterior       = await SubmoduloLibro.findOne(
        { 
        where:{
          ordenNavegacion:objetoSeleccionado.ordenNavegacion-1,
          modulo:objetoSeleccionado.modulo
        }
      });
      return this.res.view('pages/estudiante/modulo-1/m-1-hardware-teclado',{usuario,curso,objetoSeleccionado, siguiente, anterior,modulo:modulo})
    }
    else if(inputs.enlace=='/m1-mouse'){
      
      let objetoSeleccionado= await SubmoduloLibro.findOne({enlace:'/m1-mouse'});
      let modulo            = await ModuloLibro.findOne({ id:objetoSeleccionado.modulo});
      let siguiente         = await SubmoduloLibro.findOne(
        { 
        where:{
          ordenNavegacion:objetoSeleccionado.ordenNavegacion+1,
          modulo:objetoSeleccionado.modulo
        }
      });
      let anterior       = await SubmoduloLibro.findOne(
        { 
        where:{
          ordenNavegacion:objetoSeleccionado.ordenNavegacion-1,
          modulo:objetoSeleccionado.modulo
        }
      });
      return this.res.view('pages/estudiante/modulo-1/m-1-hardware-mouse',{usuario,curso,objetoSeleccionado, siguiente, anterior,modulo:modulo})
    }
    else if(inputs.enlace=='/m1-conexion-componentes'){
      
      let objetoSeleccionado= await SubmoduloLibro.findOne({enlace:'/m1-conexion-componentes'});
      let modulo            = await ModuloLibro.findOne({ id:objetoSeleccionado.modulo});
      let siguiente         = await SubmoduloLibro.findOne(
        { 
        where:{
          ordenNavegacion:objetoSeleccionado.ordenNavegacion+1,
          modulo:objetoSeleccionado.modulo
        }
      });
      let anterior       = await SubmoduloLibro.findOne(
        { 
        where:{
          ordenNavegacion:objetoSeleccionado.ordenNavegacion-1,
          modulo:objetoSeleccionado.modulo
        }
      });
      return this.res.view('pages/estudiante/modulo-1/m-1-conexion-componentes',{usuario,curso,objetoSeleccionado, siguiente, anterior,modulo:modulo})
    }
    else if(inputs.enlace=='/m1-encender-computadora'){
      
      let objetoSeleccionado= await SubmoduloLibro.findOne({enlace:'/m1-encender-computadora'});
      let modulo            = await ModuloLibro.findOne({ id:objetoSeleccionado.modulo});
      let siguiente         = await ModuloLibro.findOne(
        { 
        where:{
          enlace: '/m2-navegacion-escritorio'
        }
      });
      let anterior       = await SubmoduloLibro.findOne(
        { 
        where:{
          ordenNavegacion:objetoSeleccionado.ordenNavegacion-1,
          modulo:objetoSeleccionado.modulo
        }
      });
      return this.res.view('pages/estudiante/modulo-1/m-1-encender-computadora',{usuario,curso,objetoSeleccionado, siguiente, anterior,modulo:modulo})
    }
    else if(inputs.enlace=='/m2-navegacion-escritorio'){
      
      let objetoSeleccionado= await ModuloLibro.findOne({enlace:'/m2-navegacion-escritorio'});
      let siguiente         = await SubmoduloLibro.findOne({ enlace: '/m2-aplicaciones'});
      let anterior          = await SubmoduloLibro.findOne({enlace:'/m1-encender-computadora'});

      return this.res.view('pages/estudiante/modulo-2/m-2-navegacion-escritorio',{usuario,curso,objetoSeleccionado, siguiente, anterior,modulo:objetoSeleccionado})
    }

    return this.res.ok({});





  }


};
