/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)

  //ELIMINAR LOS SUBMODULOS QUE NO PERTENECEN A NINGUN MODULO
  var submodulos = await SubmoduloLibro.find({})
  if (submodulos) {
    for (let contador = 0; contador < submodulos.length; contador++) {
      let modulo = await ModuloLibro.findOne({ id: submodulos[contador].modulo })
      if (!modulo) {

        let SubmoduloEliminado = await SubmoduloLibro.destroyOne({ id: submodulos[contador].id });
        console.log('SUBMODULO ELIMINADO');
        console.log(SubmoduloEliminado);
      }
    }
  }
  // else{
  //   //si no existe ningun submodulo quiere decir que se han borrado, entonces deben volverse a crear
  //   //se borra el curso alfabetizacion para que se vuelva a crear todo
  //   var cursoAlfaEliminado= await Curso.destroyOne({nombre:'Alfabetización informática'});
  // }




  var cursoCreado;
  //ELIMINAR MODULOS QUE NO PERTENENCEN A NINGUN CURSO
  var modulos = await ModuloLibro.find({})
  if (modulos) {
    for (let contador = 0; contador < modulos.length; contador++) {
      let curso = await Curso.findOne({ id: modulos[contador].curso })
      if (!curso) {

        let sulbmodulosEliminados = await SubmoduloLibro.destroy({ modulo: modulos[contador].id }).fetch();
        console.log('SUBMODULOs ELIMINADOs');
        sulbmodulosEliminados.forEach(element => {
          console.log(element);
        });

        let moduloEliminado = await ModuloLibro.destroyOne({ id: modulos[contador].id });
        console.log('MODULO ELIMINADO');
        console.log(moduloEliminado);
      }
    }
  }
  // else{

  //   //si no existe ningun MODULO quiere decir que se han borrado, entonces deben volverse a crear
  //   //se borra el curso alfabetizacion para que se vuelva a crear todo
  //   // var cursoAlfaEliminado= await Curso.destroyOne({nombre:'Alfabetización informática'});
  // }



  //PARA QUE SE EJECUTE EL RESTO DE CODIGO, ELIMINAR EL CURSO DE NOMBRE: Alfabetización informática EN LA BASE DE DATOS
  var cursoAlfa = await Curso.findOne({ nombre: 'Alfabetización informática' });
  if (!cursoAlfa) {

    cursoCreado = await Curso.create(
      {
        nombre: 'Alfabetización informática',
        descripcion: 'Enseñanza de informática básica',
        publicado: true
      }
    ).fetch();

    var moduloCreado;


    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 1- La computadora ',
      descripcion: 'La computadora es una máquina electrónica capaz de recibir un conjunto de órdenes y ejecutarlas realizando cálculos complejos, o agrupando y correlacionando otro tipo de información. Es también conocida como ordenador o computador.',
      enlace: '/m1-computadora',
      multimedia: { imagen: '/images/informaticabasica/portadas_modulos/m1.png' },
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
      color: '#92E512',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Hardware',
        descripcion: 'El Hardware se define principalmente como el conjunto de componentes y dispositivos físicos y tangibles que integran una computadora. ',
        enlace: '/m1-hardware',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar </p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 1,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'El Teclado',
        descripcion: 'El teclado es un instrumento externo que está representado por un conjunto de teclas, que se encargan de ingresar una información a una computadora o dispositivo por medio de caracteres (letras, números y símbolos).',
        enlace: '/m1-teclado',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 2,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Mouse',
        descripcion: 'El mouse es uno de los periféricos de entrada que forman parte de un computador, a través de él se puede interactuar directamente con la computadora mediante un puntero (indicador) que se muestra en la pantalla. ',
        enlace: '/m1-mouse',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 3,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },

      {
        nombreSubmodulo: 'Software',
        descripcion: 'El software es un conjunto de números binarios (bits), que tiene algún sentido para la computadora, y es almacenado en algún soporte físico (hardware), desde donde el procesador puede acceder, para ejecutarlo o mostrarlo. ',
        enlace: '/m1-software',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 4,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Conexión de los componentes a la computadora',
        descripcion: 'La forma en que el hardware opera es por medio de energía, el hardware externo se conecta a la computadora por medio de cables o inalámbricamente, en este módulo aprenderás a conectar los principales componentes a la computadora',
        enlace: '/m1-conexion-componentes',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 5,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Encender y apagar la computadora',
        descripcion: 'En este módulo aprenderás a encender y apagar la computadora ',
        enlace: '/m1-encender-computadora',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 6,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },


    ]);

    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 2- Navegacion en escritorio',
      descripcion: 'En este módulo aprenderás a reconocer las partes del escritorio de la computadora y de forma básica aprender a usar sus aplicaciones.',
      enlace: '/m2-navegacion-escritorio',
      multimedia: { imagen: '/images/informaticabasica/portadas_modulos/m2.png' },
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
      color: '#467895',
    }).fetch();

    await SubmoduloLibro.createEach([

      {
        nombreSubmodulo: 'Aplicaciones informáticas',
        descripcion: 'Una aplicación informática es un software que les posibilita a los usuarios interesados en la tecnología realizar diferentes tipos de trabajos a través de este. Como por ejemplo podemos mencionar los diferentes procesadores de textos, las hojas de cálculos entre otros. ',
        enlace: '/m2-aplicaciones',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 1,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Gestión de archivos',
        descripcion: 'Un archivo o fichero informático es un conjunto de bits almacenados en un dispositivo. Un archivo es identificado por un nombre y la descripción de la carpeta o directorio que lo contiene. A los archivos informáticos se les llama así porque son los equivalentes digitales de los archivos escritos en expedientes, tarjetas, libretas, papel o microfichas del entorno de oficina tradicional.',
        enlace: '/m2-gestion-archivos',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 2,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'La papelera de reciclaje',
        descripcion: 'La Papelera de reciclaje es el lugar donde se almacena la información que fue eliminada. Permite la recuperación de información que fue eliminada por equivocación.',
        enlace: '/m2-papelera',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 3,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },




    ])





    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 3- Documento Word',
      descripcion: 'Microsof Office Word 2016 es un procesador de textos, un software para la creación, edición, modificación y procesamiento de  documentos de texto con formato: tipo y tamaño de la tipografía, colores, tipos de párrafos, efectos artísticos, adición de gráficos, etc.',
      enlace: '/m3-documento-word',
      multimedia: { imagen: '/images/informaticabasica/portadas_modulos/m3.png' },
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
      color: '#456892',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Pantalla principal de word',
        descripcion: 'La pantalla principal del editor de texto Microsoft word presenta varias opciones para editar el contenido del documento',
        enlace: '/m3-pantalla-word',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 1,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Área de trabajo',
        descripcion: 'El área de trabajo se encuentra situada en la parte central de la pantalla de word, muestra el documento que estamos editando en una hoja digital en blanco .',
        enlace: '/m3-area-trabajo',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 2,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Barra de título',
        descripcion: 'Situada en el extremo superior. En ella aparecerá el título de nuestro trabajo que, en un principio, será denominado “Documento 1”, pero que al guardar podemos renombrar asignándole el título que consideremos oportuno',
        enlace: '/m3-barra-titulo',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 3,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Barra de herramientas de acceso rápido',
        descripcion: 'Nos da acceso a determinadas acciones que forman parte de los diferentes elementos de menú, pero que se encuentran disponibles de forma directa a partir de esta barra, por ser las más usuales.',
        enlace: '/m3-barra-acceso-rapido',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 4,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Barra o cinta de opciones',
        descripcion: 'Esta barra de herramientas es la más importante, ya que contiene todas las acciones para trabajar sobre nuestro documento. Se compone de una serie de pestañas con sus correspondientes comandos, situados en la parte inferior.',
        enlace: '/m3-barra-opciones',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 5,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Otras Opciones',
        descripcion: 'Otras opciones de la ventana principal de word son: la barra de desplazamiento en la parte lateral derecha, la barra de estado en la parte inferior, y un botón par iniciar sesión con una cuenta de Mcrosoft.',
        enlace: '/m3-otras-opciones',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 6,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      // {
      //   nombreSubmodulo: 'Barra de estado',
      //   descripcion: ' Situada en la parte inferior, es la que nos informa sobre el estado de nuestro documento: cuántas palabras hemos escrito, en qué página estamos. Además, nos da acceso a la revisión ortográfica y gramatical, a diferentes vistas del documento o al zoom ',
      //   enlace:'/m3-barra-estado',
      //   multimedia: {},
      //   contenidoTiny: '<p>Pulse para editar</p>',
      //   modulo: moduloCreado.id,
      //   ordenNavegacion:7
      // },

      // {
      //   nombreSubmodulo: 'Barra de desplazamiento',
      //   descripcion: 'La barra de desplazamiento está situada en la parte lateral derecha, nos permite movernos por todo el documento  y por sus distintas páginas hacia abajo, según las vayamos incorporando. ',
      //   enlace:'/m3-barra-desplazamiento',
      //   multimedia: {},
      //   contenidoTiny: '<p>Pulse para editar</p>',
      //   modulo: moduloCreado.id,
      //   ordenNavegacion:8
      // }
    ]);





    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 4-Edición de documentos Word',
      descripcion: 'En este módulo aprenderás como editar un documento de word con ejemplos',
      enlace: '/m4-edicion-word',
      multimedia: { imagen: '/images/informaticabasica/portadas_modulos/m4.png' },
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
      color: '#223458',
    }).fetch();
    await SubmoduloLibro.createEach([

      {
        nombreSubmodulo: 'El portapapeles',
        descripcion: 'La opción portapapeles muestra opciones para copiar y pegar ya sea, texto, imágenes o un formato existente',
        enlace: '/m4-portapapeles',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 1,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Ortografía y gramática',
        descripcion: 'Las opciones Ortografía y gramática permite principalmente corregir los errores ortográficos generados al redactar un documento. ',
        enlace: '/m4-ortografia',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 2,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Guardar e imprimir un documento',
        descripcion: 'Como guardar e imprimir un documento de word. ',
        enlace: '/m4-guardar',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 3,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Diseño de página',
        descripcion: 'Permite modificar principalmente la forma de visualización del documento y su contenido, por ejemplo, crear una hoja de forma horizontal, crear dos columnas de texto, etx. ',
        enlace: '/m4-disenio',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 4,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },

      // {
      //   nombreSubmodulo: '',
      //   descripcion: '',
      //   enlace:'',
      //   multimedia: {},
      //   contenidoTiny: '<p>Pulse para editar</p>',
      //   modulo: moduloCreado.id,
      //   ordenNavegacion:1
      // }
    ]);






    //El modulo 5 puede estar dentro del modulo 4
    // moduloCreado = await ModuloLibro.create({
    //   nombreModulo: 'Módulo 5- Inserción de imágenes y tablas',
    //   descripcion: 'descripcion Modulo 5',
    //   enlace: '/m5-insercion-imagenes',
    //   multimedia: {},
    //   curso: cursoCreado.id,
    //   contenidoTiny: '<p>Pulse para editar</p>',
    // }).fetch();
    // await SubmoduloLibro.createEach([
    //   {
    //     nombreSubmodulo: '',
    //     descripcion: '',
    //     enlace:'',
    //     multimedia: {},
    //     contenidoTiny: '<p>Pulse para editar</p>',
    //     modulo: moduloCreado.id,
    //   }
    //   ]);
    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 5 - Navegar en Internet',
      descripcion: 'Llamamos navegar por la red, a la acción de visitar o pedir páginas del tipo web en nuestro ordenador. Al navegar, el usuario pasa de una página web a otra, lo que supone una especie de recorrido. El software que permite este proceso se conoce como navegador.',
      enlace: '/m5-navegar-internet',
      multimedia: { imagen: '/images/informaticabasica/portadas_modulos/m5.png' },
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
      color: '#92E512',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Dirección web',
        descripcion: 'La dirección web es una línea de texto que permite ubicar una página o un sitio web en internet, por medio de un navegador',
        enlace: '/m5-direccion-web',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 1,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Nombres de dominio',
        descripcion: 'Un nombre de dominio es la "dirección en la red" que posee una página o sitio web determinada. Ejemplo, www.clomputech.com.',
        enlace: '/m5-nombres-dominio',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 2,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Navegador web',
        descripcion: 'Un navegador web es la herramienta de software que nos permite acceder a información de internet, los más conocidos son: Google Chrome, Mozilla firefox y Microsoft Edge ',
        enlace: '/m5-navegador-web',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 3,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Motores de navegación',
        descripcion: 'Un MOTOR DE BÚSQUEDA, también conocido como "buscador", es un sistema informático que busca archivos almacenados en servidores web',
        enlace: '/m5-motores-navegacion',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 4,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      }

    ]);
    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 6 - Correo Electrónico y Skype',
      descripcion: 'En este módulo aprenderás a usar medios de comunicación en línea principalmente lo referente a correo electrónico y videollamadas',
      enlace: '/m6-medios-comunicacion',
      multimedia: { imagen: '/images/informaticabasica/portadas_modulos/m6.png' },
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
      color: '#321654',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Creación de una cuenta de correo electónico',
        descripcion: 'Correo electrónico es un servicio electrónico mediante el cual se puede enviar y recibir mensaje de manera instantánea mediante Internet.',
        enlace: '/m6-creacion-cuenta',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 1,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Envío de correo electrónico',
        descripcion: 'El envío de correo electrónico se refiere a la acción de redactar el texto a enviar y establecer los parámetros de un destinatario',
        enlace: '/m6-envio-correo',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 2,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Creación de una cuenta SKYPE',
        descripcion: 'Skype es un servicio que permite realizar intercambio de texto, voz y video, con la finalidad de comunicar a dos o más usuarios por medio de Internet.',
        enlace: '/m6-cuenta-skype',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 3,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Realizar videollamadas',
        descripcion: 'Una videollamada es una forma de comunicación por internet que permite ver, oir y hablar al receptor en tiempo real',
        enlace: '/m6-realizar-videollamada',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 4,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      }

    ]);
    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 7 - Páginas de Internet',
      descripcion: 'Una Página Web es conocida como un documento de tipo electrónico, contiene información digital, la cual puede venir dada por datos visuales y/o sonoros, o una mezcla de ambos, a través de textos, imágenes, gráficos, audio o vídeos y otros tantos elementos dinámicos o estáticos.',
      enlace: '/m7-paginas-internet',
      multimedia: { imagen: '/images/informaticabasica/portadas_modulos/m7.png' },
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
      color: '#589741',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Como usar Facebook',
        descripcion: 'Facebook es lo que se denomina RED SOCIAL y permite compartir información con otras personas; generalmente, amigos o familiares. Se comparte mensajes de texto, enlaces, álbumes de fotos, vídeos, etc. También es posible comentar e interactuar con las publicaciones de tus amigos',
        enlace: '/m7-facebook',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 1,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Como usar Youtube',
        descripcion: 'Youtube Es un sitio web que permite compartir videos, estos pueden ser: películas, videoclips musicales, documentales o transmisiones en directo.',
        enlace: '/m7-youtube',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 2,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },

    ]);
    moduloCreado = await ModuloLibro.create({
      nombreModulo: 'Módulo 8. Dispositivos Móviles',
      descripcion: 'Un dispositivo móvil es una computadora de bolsillo con memoria limitada y que permite la conexión a internet de forma inalámbrica. Se caracterizan por que pueden ser fáciles de transportar y permiten ejecutar varias aplicaciones.',
      enlace: '/m8-dispositivos-moviles',
      multimedia: { imagen: '/images/informaticabasica/portadas_modulos/m8.png' },
      curso: cursoCreado.id,
      contenidoTiny: '<p>Pulse para editar</p>',
      color: '#865412',
    }).fetch();
    await SubmoduloLibro.createEach([
      {
        nombreSubmodulo: 'Configuraciones básicas',
        descripcion: 'Los dispositivos móviles de paquete vienes con configuraciones básicas predeterminadas para su funcionamiento pero se permite al usuario personalizar ciertas caracteristicas del mismo para su mejor uso, estas características pueden ser: fondo de pantalla, cuenta de correo electrónico personal, etc.',
        enlace: '/m8-configuracion-basica',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 1,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Otras configuraciones',
        descripcion: 'El dispositivo móvil permite personalizar varias opciones .',
        enlace: '/m8-otras-configuraciones',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 2,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      },
      {
        nombreSubmodulo: 'Instalación de una aplicación móvil',
        descripcion: 'Una app es una aplicación informática diseñada para ser ejecutada en teléfonos inteligentes, tabletas y otros dispositivos móviles. En internet existen varias aplicaciones de software que permiten al dispositivo móvil ejecutar nuevas tareas',
        enlace: '/m8-app-movil',
        multimedia: {},
        contenidoTiny: '<p>Pulse para editar</p>',
        modulo: moduloCreado.id,
        ordenNavegacion: 3,
        color: moduloCreado.color, //el color del padre se hereda a los hijos
      }
    ]);


    sails.log('creacion de curso y modulos correcta!');

  }


  var cursos = await Curso.find({});
  var curso = cursos[0];
  var estudiante = null;
  var credenciales = null;
  var avance = null
  if (await Estudiante.count() == 0 && Object.keys(curso).length > 0) {
    estudiante = await Estudiante.create({
      nombre: 'Elsa Cando',
      alias: 'els',
      email: 'elsa.cando@gmail.com',
      password: '$2b$10$fbmbMm8Pigdur8cA.VFvf.BT3yzl2sm9Cmu2ZV02aTgcCkKaet0Ie',

    }).fetch();





    credenciales = { cursoId: curso.id, usuarioId: estudiante.id }
    //el avance se coloca en null en lugar de {} porque es mas facil gestionar desde el lado cliente
    await sails.helpers.registrarAvanceEstudiante(credenciales, avance);//la fecha de acceso es creada dentro 


    estudiante = await Estudiante.create(
      {
        nombre: 'Pedro Cuasqui',
        alias: 'Pedroc',
        email: 'pedro.cuasqui@gmail.com',
        password: '$2b$10$fbmbMm8Pigdur8cA.VFvf.BT3yzl2sm9Cmu2ZV02aTgcCkKaet0Ie',

      }).fetch();

    credenciales = { cursoId: curso.id, usuarioId: estudiante.id }
    //el avance se coloca en null en lugar de {} porque es mas facil gestionar desde el lado cliente
    await sails.helpers.registrarAvanceEstudiante(credenciales, avance);//la fecha de acceso es creada dentro 


    await Profesor.create({
      nombre: 'j',
      alias: 'j',
      email: '',
      password: '$2b$10$dnUGZGpto1RdygwQ2bWDdeLRceCbCuU8Q2vz4RmZD8eXOyg.qrVqe',
      administrador: true,
      tutor: false

    });

    //CURSO BASE DE DATOS
    var cursoBdd = await Curso.create({
      nombre: "Base de datos",
      descripcion: "conceptos básicos de bases de datos",
      publicado: true,
    }).fetch();

    var mod1Bdd = await ModuloLibro.create({
      nombreModulo: "Introduccion",
      descripcion: "Una base de datos es un conjunto de datos pertenecientes a un mismo contexto y almacenados sistemáticamente para su posterior uso",
      multimedia: { imagen: 'https://es.wikipedia.org/wiki/Base_de_datos#/media/Archivo:Componentes_de_un_base_de_datos.jpg' },
      curso: cursoBdd.id,
      contenidoTiny: '<p style="margin: 0.5em 0px; line-height: inherit; color: #222222; font-family: sans-serif; font-size: 14px; text-align: start;">Una&nbsp;<strong>base de datos</strong>&nbsp;es un conjunto de datos pertenecientes a un mismo contexto y almacenados sistem&aacute;ticamente para su posterior uso. En este sentido; una biblioteca puede considerarse una base de datos compuesta en su mayor&iacute;a por documentos y textos impresos en papel e indexados para su consulta. Actualmente, y debido al desarrollo tecnol&oacute;gico de campos como la&nbsp;<a style="color: #0b0080; background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;" title="Inform&aacute;tica" href="https://es.wikipedia.org/wiki/Inform%C3%A1tica">inform&aacute;tica</a>&nbsp;y la&nbsp;<a style="color: #0b0080; background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;" title="Electr&oacute;nica" href="https://es.wikipedia.org/wiki/Electr%C3%B3nica">electr&oacute;nica</a>, la mayor&iacute;a de las bases de datos est&aacute;n en formato digital, siendo este un componente electr&oacute;nico, por tanto se ha desarrollado y se ofrece un amplio rango de soluciones al problema del&nbsp;<a class="mw-redirect" style="color: #0b0080; background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;" title="Almacenamiento de datos" href="https://es.wikipedia.org/wiki/Almacenamiento_de_datos">almacenamiento de datos</a>.</p><p style="margin: 0.5em 0px; line-height: inherit; color: #222222; font-family: sans-serif; font-size: 14px; text-align: start;">Hay&nbsp;<a style="color: #0b0080; background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;" title="Programa inform&aacute;tico" href="https://es.wikipedia.org/wiki/Programa_inform%C3%A1tico">programas</a>&nbsp;denominados&nbsp;<a style="color: #0b0080; background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;" title="Sistema de gesti&oacute;n de bases de datos" href="https://es.wikipedia.org/wiki/Sistema_de_gesti%C3%B3n_de_bases_de_datos">sistemas gestores de bases de datos</a>, abreviado SGBD (del ingl&eacute;s&nbsp;<em>Database Management System</em>&nbsp;o DBMS), que permiten almacenar y posteriormente acceder a los datos de forma r&aacute;pida y estructurada. Las propiedades de estos DBMS, as&iacute; como su utilizaci&oacute;n y administraci&oacute;n, se estudian dentro del &aacute;mbito de la inform&aacute;tica.</p><p style="margin: 0.5em 0px; line-height: inherit; color: #222222; font-family: sans-serif; font-size: 14px; text-align: start;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Componentes_de_un_base_de_datos.jpg" alt="" width="141" height="234" /></p>',
      color: "#7dec3c",
      enlace: ""
    }).fetch();

    var modulo2Bdd = await ModuloLibro.create({
      nombreModulo: "Conceptos",
      descripcion: "En esta sección aprenderás conceptos principales sobre bases de datos que te permitirán comprender de mejor manera el curso",
      multimedia: { imagen: 'https://doc.4d.com/4Dv15/picture/105514/pict105514.es.png' },
      curso: cursoBdd.id,
      contenidoTiny: '<p><img src="https://doc.4d.com/4Dv15/picture/105514/pict105514.es.png" alt="" width="727" height="392" />&nbsp;</p>',
      color: "#b642e1",

      enlace: ""
    }).fetch();


    var submoduloModulo2Bdd = await SubmoduloLibro.create({
      nombreSubmodulo: "Generalidades",
      descripcion: "Para poder almacenar una base de datos es necesario contar con un gestor de base de datos que es un software especializado en manejo de datos",
      multimedia: Object,
      modulo: modulo2Bdd.id,
      contenidoTiny: '<p>A fin de evitar que id&eacute;ntios datos se encuentren repetidos en m&uacute;ltiples archivos, parece necesario que los comunes se almacenen en un archivo &uacute;nico y que este archivo sea accesible por todos los programas que los manipulen.Definici&oacute;nUna base de datos es una colecci&oacute;n de datos interrelacionados, almacenados en un conjunto sin redundancias (repeticiones) perjudiciales o innecesarias. Su finalidad es la de servir a una o m&aacute;s aplicaciones de la mejor manera posible. Los datos se almacenan de modo que resulten independientes de los programas que los utilizan, y se emplean m&eacute;todos concretos y determinados para incluir nuevos datos y para modificar o extraer los ya almacenados.</p><p><img src="https://jordilopez94.files.wordpress.com/2014/09/sistemas-gestores-base-datos.jpg" alt="" width="303" height="241" /></p>',
      color: "#b642e1",
      enlace: "",
      ordenNavegacion: 0,
      evaluacion: {
        "tipo": "Emparejamiento",
        "tiempoMaximoPorPregunta":20,
        "preguntas": [{ "enunciado": "2+2 es?", "opciones": { "opcion1": null, "opcion2": null, "opcion3": null, "opcion4": null }, "respuesta": "4" }, { "enunciado": "5+5 ?", "opciones": { "opcion1": null, "opcion2": null, "opcion3": null, "opcion4": null }, "respuesta": "10" }, { "enunciado": "0-5 ?", "opciones": { "opcion1": null, "opcion2": null, "opcion3": null, "opcion4": null }, "respuesta": "-5" }, { "enunciado": "8+4 ?", "opciones": { "opcion1": null, "opcion2": null, "opcion3": null, "opcion4": null }, "respuesta": "11" }]
      }
    }).fetch();




    var intentoEvaluacion = await IntentoEvaluacion.create({
      puntos: 150,
      nivel: 2,
      medalla: 'bebe',
      tiempoMaximoPorPregunta: 15, //en segundos
      apruebaEvaluacion:1,
      evaluacion: {
        tipo: "Emparejamiento",
        aciertos: [0, 1, 2], //los indices de las preguntas acertadas, la longitud nos dar'a el numero de aciertos totales
        preguntas: [
          {
            errores: 2,//
            tiempoDeRespuesta: 10,//
            enunciado: "2+2 es?",
            opciones:
            {
              opcion1: null,
              opcion2: null,
              opcion3: null,
              opcion4: null
            },
            respuesta: "4"
          },
          {
            errores: 1,
            tiempoDeRespuesta: 15,
            enunciado: "5+5 ?",
            opciones:
            {
              opcion1: null,
              opcion2: null,
              opcion3: null,
              opcion4: null
            },
            respuesta: "10"
          },


          {
            errores: 4,
            tiempoDeRespuesta: 15,
            enunciado: "0-5 ?",
            opciones:
            {
              opcion1: null,
              opcion2: null,
              opcion3: null,
              opcion4: null
            },
            respuesta: "-5"
          },

          {
            errores: null,
            tiempoDeRespuesta: null, //nunca respondi'o
            enunciado: "8+4 ?",
            opciones:
            {
              opcion1: null,
              opcion2: null,
              opcion3: null,
              opcion4: null
            },
            respuesta: "11"
          }
        ]
      },
      estudiante: estudiante.id,
      submodulo: submoduloModulo2Bdd.id,
      curso:cursoBdd.id
    })






    sails.log('creacion de estudiante correcta!');
  }




  // ```
  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)

  // intento numero uno por importar un componente de vue : fallido
  // sails.vuesidebarmenu = require('vue-sidebar-menu');
  return done();

};
