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


    var curso = await Curso.findOne({ nombre: 'Alfabetizacion informática' }).populate('modulos');
    let modulos = await ModuloLibro.find({ curso: curso.id }).populate('submodulos', { sort: 'createdAt ASC' });
    curso.modulos = modulos;



    //USUARIO PARA PRUEBAS, REEMPLAZAR EN PRODUCCION POR UNA SESION
    var usuario = await Estudiante.findOne({ alias: 'Pedroc' });
    usuario.rol = 'Estudiante'
    if (inputs.enlace == '/m1-computadora') {
      let objetoSeleccionado = await ModuloLibro.findOne({ enlace: '/m1-computadora' }).populate('submodulos', { sort: 'createdAt ASC' });
      return this.res.view('pages/estudiante/modulo-1/m-1-computadora', { usuario, curso, objetoSeleccionado, modulo: objetoSeleccionado });
    }
    else if (inputs.enlace == '/m1-hardware') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m1-hardware' });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });//.sort('createdAt');
      let anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      return this.res.view('pages/estudiante/modulo-1/m-1-hardware', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
    }
    else if (inputs.enlace == '/m1-software') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m1-software' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-1/m-1-software', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    else if (inputs.enlace == '/m1-teclado') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m1-teclado' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-1/m-1-hardware-teclado', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    else if (inputs.enlace == '/m1-mouse') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m1-mouse' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-1/m-1-hardware-mouse', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    else if (inputs.enlace == '/m1-conexion-componentes') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m1-conexion-componentes' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-1/m-1-conexion-componentes', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    else if (inputs.enlace == '/m1-encender-computadora') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m1-encender-computadora' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await ModuloLibro.findOne(
        {
          where: {
            enlace: '/m2-navegacion-escritorio'
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-1/m-1-encender-computadora', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    else if (inputs.enlace == '/m2-navegacion-escritorio') {

      let objetoSeleccionado = await ModuloLibro.findOne({ enlace: '/m2-navegacion-escritorio' });
      let siguiente = await SubmoduloLibro.findOne({ enlace: '/m2-aplicaciones' });
      let anterior = await SubmoduloLibro.findOne({ enlace: '/m1-encender-computadora' });

      return this.res.view('pages/estudiante/modulo-2/m-2-navegacion-escritorio', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: objetoSeleccionado })
    }
    else if (inputs.enlace == '/m2-aplicaciones') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m2-aplicaciones' });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });//.sort('createdAt');
      let anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      return this.res.view('pages/estudiante/modulo-2/m-2-aplicaciones', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
    }
    else if (inputs.enlace == '/m2-gestion-archivos') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m2-gestion-archivos' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-2/m-2-gestion-archivos', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    else if (inputs.enlace == '/m2-papelera') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m2-papelera' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await ModuloLibro.findOne(
        {
          where: {
            enlace: '/m3-documento-word'
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-2/m-2-papelera', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////MODULO 3////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == '/m3-documento-word') {

      let objetoSeleccionado = await ModuloLibro.findOne({ enlace: '/m3-documento-word' });
      let siguiente = await SubmoduloLibro.findOne({ enlace: '/m3-pantalla-word' });
      let anterior = await SubmoduloLibro.findOne({ enlace: '/m2-papelera' });

      return this.res.view('pages/estudiante/modulo-3/m-3-documento-word', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: objetoSeleccionado })
    }
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == '/m3-pantalla-word') {
      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m3-pantalla-word' });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });//.sort('createdAt');
      let anterior = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      return this.res.view('pages/estudiante/modulo-3/m-3-pantalla-word', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: anterior })
    }   
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == '/m3-area-trabajo') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m3-area-trabajo' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-3/m-3-area-trabajo', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    } 
    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == '/m3-barra-titulo') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m3-barra-titulo' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-3/m-3-barra-titulo', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }

    // ///////////////////////////////////////////////////////
    else if (inputs.enlace == '/m3-barra-acceso-rapido') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m3-barra-acceso-rapido' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-3/m-3-barra-acceso-rapido', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }

// ///////////////////////////////////////////////////////
    else if (inputs.enlace == '/m3-barra-opciones') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m3-barra-opciones' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion + 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-3/m-3-barra-opciones', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
    // ///////////////////////////////////////////////////////////////////////////
    else if (inputs.enlace == '/m3-otras-opciones') {

      let objetoSeleccionado = await SubmoduloLibro.findOne({ enlace: '/m3-otras-opciones' });
      let modulo = await ModuloLibro.findOne({ id: objetoSeleccionado.modulo });
      let siguiente = await ModuloLibro.findOne({enlace: '/m4-edicion-word' });
      let anterior = await SubmoduloLibro.findOne(
        {
          where: {
            ordenNavegacion: objetoSeleccionado.ordenNavegacion - 1,
            modulo: objetoSeleccionado.modulo
          }
        });
      return this.res.view('pages/estudiante/modulo-3/m-3-otras-opciones', { usuario, curso, objetoSeleccionado, siguiente, anterior, modulo: modulo })
    }
   

    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////MODULO 4////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////
    // ///////////////////////////////////////////////////////



    return this.res.ok({});

  }


};

/*class="contenedor1" @click="infoObjeto('papelera')" @mousemove="mouseMovePc" @mouseout="mouseOutPc" */
/**
 * 
 * 
      <div v-cloak v-show="mostrarToolTip" class="tooltip1" :style="styleToolTip">
        <span>{{textoToolTip}}</span>
      </div>
 */