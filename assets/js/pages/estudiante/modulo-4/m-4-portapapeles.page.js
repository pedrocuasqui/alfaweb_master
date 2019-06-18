parasails.registerPage('m-4-portapapeles', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data:{
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

    /// /images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/0.png
    pegar: {
      id: 'pegar',
      titulo: 'Pegar',
      detalle: '',
   

      carousel: [
        {
          posicion: '1', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'Con	esta opción se puede pegar el primer elemento contenido en el portapapeles. Para ello ir a portapapeles y dar click en pegar',
          imagen: '/images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/2.png',
          alt: 'Dar clic en pegar',

        },
        {
          posicion: '2', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'La imágen o texto aparecerá en el área de trabajo ',
          imagen: '/images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/3.png',
          alt: 'Objeto agregado',

        }
      ]
      
    },
    cortar: {
      id: 'cortar',
      titulo: 'Cortar',
      detalle: '',
       carousel: [
        {
          posicion: '1', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'Para cortar una imágen o un texto. Primero seleccionar el contenido que se desea cortar y dar clic en "cortar"',
          imagen: '/images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/4.png',
          alt: 'Selección de texto a cortar',

        },
        {
          posicion: '2', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'El texto o imágen aparece en la primera posición del portapapeles',
          imagen: '/images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/5.png',
          alt: 'Texto cortado',

        }
      ]
      
    },
    copiar: {
      id: 'copiar',
      titulo: 'Copiar',
      detalle: '',
      carousel: [
        {
          posicion: '1', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'Seleccionar el contenido que se desea copiar, y luego hacer clic en "Copiar". ',
          imagen: '/images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/6.png',
          alt: 'Selección de texto a copiar',

        },
        {
          posicion: '2', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'La opción copiar, envía el contenido al portapapeles sin eliminarlo del documento.',
          imagen: '/images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/7.png',
          alt: 'Texto copiado',

        }
      ]
    },
    formato: {
      id: 'formato',
      titulo: 'Formato',
      detalle: '',
      carousel: [
        {
          posicion: '1', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'Seleccionar el texto con el formato a copiar y dar clic izquierdo en "Portapapeles".',
          imagen: '/images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/8.png',
          alt: 'Selección de texto con el formato a copiar',

        },
        {
          posicion: '2', //siempre empezar en uno para poder identificar a los elementos
          detalle: 'Seleccionar el texto en el cuál aplicará el formato copiado.',
          imagen: '/images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/9.png',
          alt: 'seleccionar el texto la que se desea aplicar el formato',

        },
        {
          posicion: '3', //siempre empezar en uno para poder identificar a los elementos
          detalle: ' El texto adquirirá el formato copiado.',
          imagen: '/images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/10.png',
          alt: 'El texto seleccionado adquirirá el formato copiado',

        }
      ]
    },
    //images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/0.png
    portapapeles: {
      id: 'portapapeles',
      titulo: 'Portapapeles',
      detalle: 'Al dar clic en esta opción se desplegará una interfaz en la parte izquierda de la pantalla que muestra las imágenes y textos que se encuentran en el portapapeles. ',
      leerMas:'',
      imgs: [
  
        {
          src: '/images/informaticabasica/modulo4/portapapeles/p_inicio/portapapeles/1.png',
          alt: 'El portapapeles muestra varias opciones',
        },
  
      ],
      html:''
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
      if (idObjeto == 'pegar') {
        $(function () {
          $('#modalpegar').modal('show');
        });

      } else if (idObjeto == 'cortar') {

        $(function () {
          $('#modalcortar').modal('show');
        });
      }
      else if (idObjeto == 'copiar') {

        $(function () {
          $('#modalcopiar').modal('show');
        });
      }
      else if (idObjeto == 'formato') {

        $(function () {
          $('#modalformato').modal('show');
        });
      }
      else if (idObjeto == 'portapapeles') {

        $(function () {
          $('#modalportapapeles').modal('show');
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
