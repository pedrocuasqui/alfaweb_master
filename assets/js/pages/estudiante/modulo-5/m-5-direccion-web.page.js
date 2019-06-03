parasails.registerPage('m-5-direccion-web', {
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

    siglas: {
      id: 'siglas',
      titulo: 'Siglas web',
      detalle: 'WWW: significa World Wide Web. En su día, sirvió para distinguir que clase de servicio estábamos solicitando, pero hoy su uso es continuado por la costumbre. En ocasiones, hay sitios que no están configurados para acceder a ellos poniendo o sin poner el "www". Si poniendo el prefijo www no entras al sitio correcto (o la página no se abre), prueba volviendo a entrar sin escribirlo. Si el sitio no está caído, es posible que esto funcione.',
      leerMas:'https://www.proyectoautodidacta.com/comics/anatoma-de-una-direccin-web/',
      imgs: [

        {
          src: 'https://www.ba-csirt.gob.ar/images/articulos/2019-03-12-14-14-44_5c87e904878be.jpg',
          alt: 'Siglas web'
        },

      ]
    },
    nombre: {
      id: 'nombre',
      titulo: 'Nombre del sitio web',
      detalle: 'El nombre del sitio web es un texto que permite identificar al contenido en internet, generalmente se corresponde con el nombre de la organización a la que pertenece el sitio, algunos ejemplos son: facebook.com, google.com, epn.edu.ec, youtube.com, etc.',
      leerMas:'https://duplika.com/blog/que-es-un-nombre-de-dominio/',
      imgs: [

        {
          src: 'https://norfipc.com/img/articulos/nombres-dominio-internet.jpeg',
          alt: 'nombres de dominio'
        },

      ]
    },
    tipo: {
      id: 'tipo',
      titulo: 'Extensión de dominio',
      detalle: '.Com Esta parte de la dirección web permite identificar el tipo de sitio, además del país de procedencia. Existen dos tipos de dominios: Geográficos o genéricos. Siendo el más común y más utilizado el genérico .com Genéricos: Este dominio se aplica según la actividad que se realicen. .com es comercial, .edu se refiera a educación, .org representa entidades gubernamentales o sin fines de lucro.'+
      'Geográficos o territoriales: Como su nombre indica se refiera al territorio donde se encuentra la dirección web. Algunos sitios son: .ec (Ecuador), .ar (Argentina), .es (España), .co (Colombia), entre otros. Sin embargo, en ocasiones se registran con dominios genéricos.',
      leerMas:'https://www.proyectoautodidacta.com/comics/anatoma-de-una-direccin-web/',
      imgs: [

        {
          src: 'https://www.coaching-tecnologico.com/wp-content/uploads/2012/04/dominis2.jpg',
          alt: 'tipo de organización'
        },

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
      if (idObjeto == 'siglas') {
        $(function () {
          $('#modalsiglas').modal('show');
        });

      }
      if (idObjeto == 'nombre') {
        $(function () {
          $('#modalnombre').modal('show');
        });

      }
      if (idObjeto == 'tipo') {
        $(function () {
          $('#modaltipo').modal('show');
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
