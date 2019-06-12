parasails.registerPage('m-4-ortografia', {
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

    /// /images/word/revisar/0.png
    ortografia: {
      id: 'ortografia',
      titulo: 'Ortografia',
      detalle: 'Con	esta opción se puede controlar la ortografía la gramática y los problemas de escritura.',
      leerMas: '',

      carousel: [
        {
          posicion: '1', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'Al hacer clic sobre Ortografía y gramática aparecerá la siguiente pantalla. Esta interfaz permite paso a paso revisar las faltas ortográficas del documento.',
          imagen: '/images/word/p_revisar/1.png',
          alt: 'Opciones de ortografía',

        },
        {
          posicion: '2', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'Dar clic derecho sobre la palabra subrayada en rojo o verde, se mostrará diferentes opciones de escritura correcta.',
          imagen: '/images/word/p_revisar/2.png',
          alt: 'Opciones para corregir la palabra',

        },
        {
          posicion: '3', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'Finalmente, los errores ortográficos se encuentran corregidos.',
          imagen: '/images/word/p_revisar/3.png',
          alt: 'Errores Corregidos',

        }
      ]
    },


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
      if (idObjeto == 'ortografia') {
        $(function () {
          $('#modalortografia').modal('show');
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
