parasails.registerPage('m-2-aplicaciones', {
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

    //atributos propios
      
    indice:null,
    indicaciones:[
      {descripcion:''},//la primera descripción es la del objetoSeleccionado
      {descripcion:'Existen varias formas de abrir una aplicación en Windows, la primera es por medio del botón de inicio de windows, al dar clic sobre él, se despliega una lista de programas instalados en la computadora'},
      {descripcion:'Paso 2: Seleccionar de entre la lista, el icono de la aplicación que queremos abrir y dar clic'},
      {descripcion:'Paso 3: Esperar un momento mientras carga la aplicación, al abrirse, se crea un icono en la barra de tareas de la parte inferior, aquí se muestran las aplicaciones abiertas'},
      {descripcion:'La otra forma de abrir una aplicación es por medio de un acceso directo del escritorio, para ello se ubica el icono deseado en el escritorio y se da doble clic.'},
      {descripcion:'Esperar un momento mientras se carga la aplicación, al abrirse, se crea un icono en la barra de tareas de la parte inferior, aquí se muestran las aplicaciones abiertas.'},
    ],
    silenciar:true

    // elemento:{
    //   id:'', 
    //   titulo:'',
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
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    
    this.indicaciones[0].descripcion=this.objetoSeleccionado.descripcion;
    this.usuario = SAILS_LOCALS.usuario;
    this.objetoSeleccionado = SAILS_LOCALS.objetoSeleccionado,
    this.navegarSiguiente = SAILS_LOCALS.siguiente.enlace;
    this.navegarAtras = SAILS_LOCALS.anterior.enlace;
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
      // if (idObjeto == 'escritorio') {
      //   $(function () {
      //     $('#modalEscritorioVacio').modal('show');
      //   });

      // } else if (idObjeto == 'notificacion') {
      //   $(function () {
      //     $('#modalBarraDeNotificacion').modal('show');
      //   });

    

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
    obtenerIndice(){
      console.log('clic en obtenerIndice');
      var _this= this;
      this.$refs.curso.clickSilenciar();
    //slide.bs.carousel	This event fires immediately when the slide instance method is invoked.
    //slid.bs.carousel	This event is fired when the carousel has completed its slide transition.
      $('#carouselAbrir').on('slid.bs.carousel', function () {
        this.indice=$('.indicador.active').text(); //obtiene el indice del indicador actual
        let posicion= parseInt(this.indice)-1;

        _this.objetoSeleccionado.descripcion=_this.indicaciones[posicion].descripcion;
        console.log('POSICION:'+posicion);
        })
   

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