parasails.registerPage('m-1-hardware-mouse', {
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

    clic_derecho: {
      id: 'ClicDerecho',
      titulo: 'Clic derecho',
      detalle: '',
      leerMas: 'http://www.alegsa.com.ar/Dic/clic_derecho.php',
      carousel: [
        {
          posicion: '1', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'El clic derecho del ratón o mouse es la acción de presionar (hacer clic) sobre el botón derecho del mouse. Esta acción suele utilizarse para abrir el menú contextual del elemento donde se posa el cursor del ratón en ese momento. Si el mouse está configurado para zurdos, el clic derecho será en ese caso el botón de la izquierda.',
          imagen: 'https://4.bp.blogspot.com/-bUIk7H52CJg/WvIgCwe00cI/AAAAAAAAAC4/FK9bXoH0yAgLBzFlZOeZppZ5vt9TEuRLwCLcBGAs/s400/mouse.gif',
          alt: 'Clic derecho',
        },
        {
          posicion: '2', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'Algunos usos concretos del clic derecho del ratón:- En un programa editor de texto, como bloc de notas o Microsoft Word, se puede seleccionar una porción del texto. Se presiona clic derecho sobre la selección y se abrirá un menú con distintas opciones que podemos hacer con ese texto: copiar, cortar, reemplazar, buscarinónimos, etc. También aparecerán funciones relacionadas al documento y no necesariamente para el texto seleccionado.',
          imagen: 'https://i.stack.imgur.com/dtS3o.gif',
          alt: 'Clic derecho sobre word',
        }

      ],
    },
    clic_izquierdo: {
      id: 'ClicIzquierdo',
      titulo: 'Clic izquierdo',
      detalle: 'Onomatopeya en español del sonido de la pulsación de un botón del ratón. Cuando se dice que "se debe hacer clic", se hace referencia a la acción de presionar un botón del mouse (ratón) que suele ser el botón izquierdo en configuración para diestros. Esto vale también para su correspondiente en otros dispositivos con puntero como el trackball o el touchpad. Es "click" en inglés. En tanto en español suele usarse en frases como: hacer clic, dar clic, clicar o cliquear, sin "k" según la Real Academia Española.',
      leerMas: 'http://www.alegsa.com.ar/Dic/clic.php',
      imgs: [

        {
          src: 'http://www.alegsa.com.ar/Imagen/clic_izquierdo.png',
          alt: 'Clic izquierdo'
        },

      ]
    },
    scroll: {
      id: 'Scroll',
      titulo: 'Scroll',
      detalle: 'La rueda de desplazamiento (scroll wheel) o rueda del ratón (mouse wheel) de computadora, es el disco de plástico duro o goma dura, perpendicular a la superficie del ratón de computadora. Normalmente está ubicada entre medio de los botones izquierdo y derecho del ratón.',
      leerMas: 'https://es.wikipedia.org/wiki/Rueda_de_desplazamiento',
      imgs: [

        {
          src: 'https://media.giphy.com/media/l0HlQXlQ3nHyLMvte/giphy.gif',
          alt: 'Scroll'
        },

      ]
    },
    mouse: {
      id: 'mouse',
      titulo: 'Mouse',
      detalle: '',
      leerMas: 'https://es.wikipedia.org/wiki/Rat%C3%B3n_(inform%C3%A1tica)',
      carousel: [
        {
          posicion: '1', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'El mouse es un elemento que permite controlar al ordenador usando las manos por medio de un puntero',
          imagen: 'https://media1.tenor.com/images/b5e07d01440eb593dcb28f01116d7ec8/tenor.gif',
          alt: 'Mouse en movimiento',
        },
        {
          posicion: '2', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'Existen diferentes tipos de mouse, los más comunes son: 1) El mouse mecánico, funciona con una esfera que al moverse indica la posición del puntero en la pantalla. 2) El mouse Óptico, funciona con una luz en lugar de una esfera. 3)El mouse láser, es el más usado actualmente y funciona con una haz de luz parecido al mouse óptico. 4) Trackball, es un mouse espcial usado para juegos. 5) Touch, es un mouse sensible al tacto, se usa generalmente en los computadores portátiles.',
          imagen: 'https://image.slidesharecdn.com/innovacionestecnolgicas-151108234626-lva1-app6891/95/innovaciones-tecnolgicas-3-638.jpg',
          alt: 'Diferentes tipos de mouse',
        }

      ],
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
      if (contenido == 'contenido') {
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = false;
      } else {
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = true;
      }
    },

    infoObjeto(idObjeto) {
      if (idObjeto == 'clic-izquierdo') {
        console.log('funciones');
        $(function () {
          $('#modalClicIzquierdo').modal('show');
        });

      } else if (idObjeto == 'clic-derecho') {
        $(function () {
          $('#modalClicDerecho').modal('show');
        });

      } else if (idObjeto == 'scroll') {

        $(function () {
          $('#modalScroll').modal('show');
        })
      }
      else if (idObjeto == 'mouse') {

        $(function () {
          $('#modalmouse').modal('show');
        })
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
