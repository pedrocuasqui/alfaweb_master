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
      nombre: 'TeclasDeFuncion',
      detalle: 'Estas teclas, de F1 a F12, sirven como atajos para acceder más rápidamente a determinadas funciones que le asignan los distintos programas. Los siguientes son solo algunos ejemplos de aplicaciones predeterminadas que corren las teclas de función bajo distintos programas: existe una tendencia a la normalización de aplicaciones en determinadas teclas. En general, la tecla F1 está asociada a la ayuda que ofrecen los distintos programas, es decir que, pulsándola se abre la pantalla de ayuda del programa que se esté usando en este momento.   F1: menús y rutinas de ayuda en la mayoría de los programas, por ejemplo AutoCAD, Microsoft Word, Microsoft Excel. En Firefox lleva a una página de ayuda en línea de Mozilla.1​'+
      "F2: renombra el archivo, acceso directo o carpeta seleccionada. Cambiar a opción de búsqueda, también para maximizar los juegos en red. En AutoCAD entra o sale del modo ortogonal."+
      "F3: inicia una búsqueda en el directorio donde se encuentra el usuario."+
      "F4: despliega el menú «Ir a» una carpeta diferente desde la barra de herramientas de una carpeta, buscar la lista de la barra de direcciones en el Explorador de Windows y en otros administradores de archivos."+
      "F5: actualiza el contenido de la ventana seleccionada. «Buscar y reemplazar» en Microsoft Word. «Ir a» en Microsoft Excel. Cambia el plano de referencia en AutoCAD."+
      "F6: desplazarse por los elementos de la pantalla de una ventana o del escritorio. En AutoCAD modifica el estado del sistema de coordenadas."+
      "F7: en Microsoft Word y Excel lanza el revisor gramatical y ortográfico de textos. En AutoCAD pone o quita la grilla de referencia. En Firefox habilita la navegación con cursor o «caret browsing»."+
      "F8: para arrancar la computadora en modo a prueba de fallos."+
      "F9: en Microsoft Word recalcula los códigos de campo. En Excel recalcula fórmulas. En Corel Draw abre una presentación como en Microsoft PowerPoint. En AutoCAD habilita o deshabilita el modo snap."+
      "F10: activar la barra de menús en el programa activo. En AutoCAD entra o sale del modo de coordenadas polares."+
      "F11: habilitar el modo a pantalla completa de diversos navegadores web, juegos y aplicaciones. En Microsoft Excel abre la ventana de inserción de gráficos."+
      "F12: en Microsoft Word y Excel abre la ventana de «Guardar como». En Chrome abre las herramientas para desarrolladores'",
      leerMas: 'https://es.wikipedia.org/wiki/Tecla_de_funci%C3%B3n',
      imgs: [

        {
          src: 'https://sites.google.com/site/tecnocecprimaria/_/rsrc/1472862108403/home/grado-cuarto/tercer-periodo/el-teclado/teclado%20funcion.png',
          alt: 'Teclado de función'
        },

      ]
    },
    alfanumerico: {
      nombre: 'TeclasAlfanuméricas',
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
      nombre: 'TeclasDePosición',
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
      nombre: 'TeclasNuméricas',
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
      nombre: 'OtrasTeclas',
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
      nombre: 'TeclasEspeciales',
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
    //   nombre:'', 
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
    evaluacionIndividual() { //funcion recibida del componente modulo-contenedor-curso
      this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
      console.log(this.objetoSeleccionado.nombreModulo);
      this.evIndividual = true;
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
