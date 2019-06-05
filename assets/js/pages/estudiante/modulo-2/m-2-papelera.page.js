parasails.registerPage('m-2-papelera', {
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
    
    
    papeleraVacia: {
      id: 'PapeleraVacia',
      titulo: 'Papelera de reciclaje vacía',
      detalle: 'La papelera de reciclaje se encuentra vacía cuando no se ha borrado ningún archivo'  ,
      leerMas: 'https://recoverit.wondershare.com/es/deleted-recovery/recycle-bin-recovery.html',
      imgs: [

        {
          src: 'http://images.gofreedownload.net/empty-recycle-27191.jpg',
          alt: 'Papelera de reciclaje vacia'
        },

      ]
    },
    papeleraLlena: {
      id: 'PapeleraLlena',
      titulo: 'Papelera de reciclaje llena',
      detalle: 'Cuando Windows se da cuenta de que el usuario envía un nuevo archivo a la papelera de reciclaje que haría la carpeta "reciclado" más grande de lo que se le permite ser, reacciona eliminando suficientes archivos para que la carpeta no se llene en exceso. Para ello, determina qué archivos son más viejos, y luego calcula el espacio para borrar. Los archivos más antiguos siempre se eliminan primero. El usuario puede ayudar a evitar esta circunstancia mediante la inspección regular del contenido de la Papelera de reciclaje en busca de los artículos que le gustaría guardar y luego hacer clic en la opción "Vaciar la papelera de reciclaje".' ,
      leerMas: 'https://techlandia.com/sucede-papelera-reciclaje-computadora-llena-info_303933/',
      imgs: [
        {
          src: 'https://www.softzone.es/app/uploads/2017/02/papelera-reciclaje.jpg?',
          alt: 'Papelera de reciclaje llena'
        },
      ]
    }
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
      if (idObjeto == 'papelera-llena') {
        $(function () {
          $('#modalPapeleraLlena').modal('show');
        });

      } else if (idObjeto == 'papelera-vacia') {

        $(function () {
          $('#modalPapeleraVacia').modal('show');
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