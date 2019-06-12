parasails.registerPage('m-1-hardware-teclado', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    breadcrumb: [],

    usuario: Object,
    navegarSiguiente: '',
    navegarAtras: '',
    tituloEvaluacion: '',
    evIndividual: false,
    objetoSeleccionado: '',

    mouseX: 0,
    mouseY: 0,
    mostrarToolTip: false,
    textoToolTip: {
      type: String,
      default: "software"
    },


    funcion: {
      id: 'TeclasDeFuncion',
      titulo:'Teclas de función',
      detalle: '',
      leerMas: 'https://es.wikipedia.org/wiki/Tecla_de_funci%C3%B3n',
      carousel: [
        {
          posicion: '1', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'Las teclas de función sirven como atajos para acceder rápidamente a determinadas funciones en los distintos programas. Los siguientes son solo algunos ejemplos de aplicaciones predeterminadas que realizan las teclas de función bajo distintos programas. En general, la tecla F1 está asociada a la ayuda que ofrecen los distintos programas, es decir que, pulsándola se abre la pantalla de ayuda del programa que se esté usando en este momento. ',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f1.png',
          alt: 'Tecla de función f1',

        },
        {
          posicion: '2', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'F2: renombra el archivo, acceso directo o carpeta seleccionada. Cambiar a opción de búsqueda, también para maximizar los juegos en red',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f2.png',
          alt: 'Tecla de función f2',

        },
        {
          posicion: '3', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'F3: inicia una búsqueda en el directorio donde se encuentra el usuario.',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f3.png',
          alt: 'Tecla de función f3',

        },
        {
          posicion: '4', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'F4: despliega el menú «Ir a» una carpeta diferente desde la barra de herramientas de una carpeta, buscar la lista de la barra de direcciones en el Explorador de Windows y en otros administradores de archivos.',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f4.png',
          alt: 'Tecla de función f4',

        },
        {
          posicion: '5', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'F5: actualiza el contenido de la ventana seleccionada. «Buscar y reemplazar» en Microsoft Word. «Ir a» en Microsoft Excel. Cambia el plano de referencia en AutoCAD.',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f5.png',
          alt: 'Tecla de función f5',

        },
        {
          posicion: '6', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'F6: desplazarse por los elementos de la pantalla de una ventana o del escritorio. En AutoCAD modifica el estado del sistema de coordenadas. ',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f6.png',
          alt: 'Tecla de función f6',

        },
        {
          posicion: '7', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'F7:en Microsoft Word y Excel lanza el revisor gramatical y ortográfico de textos. En AutoCAD pone o quita la grilla de referencia. En Firefox habilita la navegación con cursor o «caret browsing».',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f7.png',
          alt: 'Tecla de función f7',

        },
        {
          posicion: '8', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'F8: para arrancar la computadora en modo a prueba de fallos.',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f8.png',
          alt: 'Tecla de función f8',

        },
        {
          posicion: '9', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'F9: en Microsoft Word recalcula los códigos de campo. En Excel recalcula fórmulas. En Corel Draw abre una presentación como en Microsoft PowerPoint. En AutoCAD habilita o deshabilita el modo snap.',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f9.png',
          alt: 'Tecla de función f9',

        },
        {
          posicion: '10', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'F10:activar la barra de menús en el programa activo. En AutoCAD entra o sale del modo de coordenadas polares.',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f10.png',
          alt: 'Tecla de función f10',

        },
        {
          posicion: '11', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'F11:habilitar el modo a pantalla completa de diversos navegadores web, juegos y aplicaciones. En Microsoft Excel abre la ventana de inserción de gráficos.',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f11.png',
          alt: 'Tecla de función f11',

        },
        {
          posicion: '12', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'F12: en Microsoft Word y Excel abre la ventana de «Guardar como». En Chrome abre las herramientas para desarrolladores.',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/f12.png',
          alt: 'Tecla de función f12',

        },
        {
          posicion: '13', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'ESC: La tecla de escape generalmente sirve para salir de la pantalla temporal que se muestra en pantalla. Si presiona en este momento la tecla escape, esta ventana se cerrará  .',
          imagen: '/images/informaticabasica/modulo1/computadora/teclado/esc.png',
          alt: 'Tecla de ESC',
        }
      ]
    },
    alfanumerico: {
      id: 'TeclasAlfanuméricas',
      titulo:'Teclas Alfanuméricas',
      detalle: 'Estas teclas sirven para escribir porque incluyen las letras del alfabeto, números, signos de puntuación y símbolos que se encuentran en las máquinas de escribir tradicionales.',
      leerMas: 'https://sites.google.com/site/tecnocecprimaria/home/grado-cuarto/tercer-periodo/el-teclado',
      imgs: [

        {
          src: 'https://sites.google.com/site/tecnocecprimaria/_/rsrc/1472862105428/home/grado-cuarto/tercer-periodo/el-teclado/teclado%20alfanumerico.png',
          alt: 'Teclado alfanumérico'
        },

      ]
    },
    posicion: {
      id: 'TeclasDePosición',
      titulo:'Teclas de posición',
      detalle: 'Este teclado también recibe el nombre de direccional o navegación. Estas teclas se utilizan para desplazarse por documentos o páginas web y editar texto. Incluyen teclas de dirección, Inicio, Fin, Re Pág, Av Pág, Supr e Insert.',
      leerMas: 'https://sites.google.com/site/tecnocecprimaria/home/grado-cuarto/tercer-periodo/el-teclado',
      imgs: [

        {
          src: 'https://sites.google.com/site/tecnocecprimaria/_/rsrc/1472862108555/home/grado-cuarto/tercer-periodo/el-teclado/teclado%20desplazamiento.png',
          alt: 'Teclas de posición o desplazamiento'
        },

      ]
    },
    numerico: {
      id: 'TeclasNuméricas',
      titulo:'Teclas numéricas',
      detalle: 'Estas teclas se agrupan en un bloque al igual que una calculadora, ubicadas a la derecha del teclado. Sirven para escribir los números en forma más rápida.',
      leerMas: 'https://sites.google.com/site/tecnocecprimaria/home/grado-cuarto/tercer-periodo/el-teclado',
      imgs: [

        {
          src: 'http://3.bp.blogspot.com/-bZTFxXLEBfk/UcixTwPY7ZI/AAAAAAAAAPg/PVDvQiGjpPM/s1600/numeric+keypad.jpg',
          alt: 'Teclas numéricas'
        },

      ]
    },
    otras: {
      id: 'OtrasTeclas',
      titulo:'Otras teclas',
      detalle: 'Son tres teclas que tienen funcionalidades especiales, "impr pant", "bloq desbloq", "pause" ',
      leerMas: 'https://www.areatecnologia.com/TECNOLOGIA%20EN%20IMAGENES/EL%20TECLADO%20DEL%20ORDENADOR.htm',
      imgs: [

        {
          src: '',
          alt: ''
        },

      ]
    },
    especiales: {
      id: 'TeclasEspeciales',
      titulo:'Teclas especiales',
      detalle: 'Estas teclas se utilizan por sí solas o en combinación con otras teclas para realizar determinadas acciones. Las teclas que se usan con más frecuencia son Bloq Mayús, Barra espaciadora, Ctrl, Alt, la tecla del logotipo de Windows y Esc.',
      leerMas: 'https://sites.google.com/site/tecnocecprimaria/home/grado-cuarto/tercer-periodo/el-teclado',
      imgs: [

        {
          src: 'https://jsequeiros.com/archivos/computacion/teclado/descripcion_del_teclado.png',
          alt: 'Teclas especiales'
        },

      ]
    }

    // elemento:{
    //   id:'', 
    //   detalle:'', 
    //   leerMas:'', 
    //   imgs:[

    //       {
    //         src:'',
    //         alt:''
    //         } ,

    //       ]
    // }  
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.usuario = SAILS_LOCALS.usuario;
    this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado,
      this.navegarSiguiente = SAILS_LOCALS.siguiente.enlace;
    this.navegarAtras = SAILS_LOCALS.anterior.enlace;
    this.breadcrumb.push(SAILS_LOCALS.curso);
    this.breadcrumb.push(SAILS_LOCALS.modulo);
    this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    evaluacionIndividual(contenido) { //funcion recibida del componente modulo-contenedor-curso
      if(contenido=='contenido'){
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = false;
      }else{
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = true;
      }
    },


    infoObjeto(idObjeto) {
      if (idObjeto == 'funciones') {
        console.log('funciones');
        $(function () {
          $('#modalTeclasDeFuncion').modal('show');
        });

      } else if (idObjeto == 'alfanumerico') {
        $(function () {
          $('#modalTeclasAlfanuméricas').modal('show');
        });

      } else if (idObjeto == 'posicion') {

        $(function () {
          $('#modalTeclasDePosición').modal('show');
        });
      } else if (idObjeto == 'numerico') {
        $(function () {
          $('#modalTeclasNuméricas').modal('show');
        });
      }
      else if (idObjeto == 'otras') { //usb
        $(function () {
          $('#modalOtrasTeclas').modal('show');
        });
      }
      else { //especiales
        $(function () {
          $('#modalTeclasEspeciales').modal('show');
        });
      }






    },
    mouseMovePc(event) {
      // clientX/Y obtiene las coordenadas del elemento con respecto al elemento padre, en este caso las coordenadas con respecto a <div id="m1-computadora"

      this.mouseX = event.clientX;
      this.mouseY = event.clientY;


      // El text del tooltip se basa en valor de la propiedad ""id"" de cada elemento ""
      let elementoSeleccionado = event.target.parentNode.id;
      this.textoToolTip = elementoSeleccionado.toString().toUpperCase();

      //una vez que los valores para x y y del texto del tooltip han sido establecidos, se muestra en la pantalla
      this.mostrarToolTip = true;
    },
    mouseOutPc(evet) {
      this.mostrarToolTip = false;
    },
  },
  computed: {
    styleToolTip() {
      // translate define cuanto se moverá el objeto a partir de su posicion original
      // funciona solo con comillas dobles
      //{ transform: "translate(" + this.mouseX + "px," + this.mouseY + "px)" };
      let estilo = {
        top: this.mouseY + 'px',
        left: this.mouseX + 'px'
      }
      return estilo;
    }
  }
});
