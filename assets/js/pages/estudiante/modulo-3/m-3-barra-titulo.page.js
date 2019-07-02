parasails.registerPage('m-3-barra-titulo', {
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

    titulo: {
      id: 'Titulo',
      titulo: 'Barra de título',
      detalle: 'La barra de título es aquella parte de una ventana abierta que muestra la información de aquello para lo que la ventana está siendo utilizada actualmente. Es una barra horizontal, normalmente de color rojo o azul, en la parte superior de la ventana del ordenador que muestra el nombre de la ventana y que, generalmente, contiene opciones para minimizar, maximizar y cerrar ventana.'  ,
      leerMas: 'http://informatica1-2-3-4.blogspot.es/categoria/barra-de-titulo/',
      imgs: [

        {
          src: 'http://informatica1-2-3-4.blogspot.es/cache/media/files/01/576/448/2018/03/1519912539_07-barra-de-titulo-word.png',
          alt: 'Barra de título'
        },

      ]
    },
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.usuario = SAILS_LOCALS.usuario;
    this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado;
    this.navegarSiguiente = '/contenido-alfaweb/?enlace=' + SAILS_LOCALS.siguiente.enlace;
    this.navegarAtras = '/contenido-alfaweb/?enlace=' + SAILS_LOCALS.anterior.enlace;
    this.breadcrumb.push(SAILS_LOCALS.curso);
    this.breadcrumb.push(SAILS_LOCALS.modulo);
    this.breadcrumb.push(SAILS_LOCALS.objetoSeleccionado);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {evaluacionIndividual(contenido) { //funcion recibida del componente modulo-contenedor-curso
    if (contenido == 'contenido') {
      this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
      this.evIndividual = false;
    } else {
      this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
      this.evIndividual = true;
    }
  },

  infoObjeto(idObjeto) {
    if (idObjeto == 'titulo') {
      $(function () {
        $('#modalTitulo').modal('show');
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

    
      // El audio se encuentra en el componente modulo-contenedor-curso.component
      let audioMouseOver = document.getElementById("audioMouseOver");
      audioMouseOver.volume = 0.2;
      // audioMouseOver.load(); //carga el archivo, esto implica detener la reproduccion actual
      audioMouseOver.play(); //reproduce el archivo de audio
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
