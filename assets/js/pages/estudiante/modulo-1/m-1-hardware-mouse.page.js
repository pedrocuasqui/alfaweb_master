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

   clic_derecho:{
      nombre:'ClicDerecho', 
      detalle:'El clic derecho del ratón o mouse es la acción de presionar (hacer clic) sobre el botón derecho del mouse.'+

      'Esta acción suele utilizarse para abrir el menú contextual del elemento donde se posa el cursor del ratón en ese momento. Si el mouse está configurado para zurdos, el clic derecho será en ese caso el botón de la izquierda.'+
      
      'Algunos usos concretos del clic derecho del ratón:- En un programa editor de texto, como bloc de notas o Microsoft Word, se puede seleccionar una porción del texto. Se presiona clic derecho sobre la selección y se abrirá un menú con distintas opciones que podemos hacer con ese texto: copiar, cortar, reemplazar, etc. También aparecerán funciones relacionadas al documento y no necesariamente para el texto seleccionado. - En Windows, el clic derecho es muy empleado para manipular archivos y carpetas seleccionados. A través del menú contextual que se abre se pueden Copiar, Cortar, Pegar, renombrar y crear nuevos archivos y carpetas, entre otras funciones. - En el Escritorio de Windows, al hacer clic derecho sobre una porción vacía del Escritorio, es posible acceder a funciones especiales como ser las Propiedades de pantalla, cambios en la distribución de íconos del escritorio, etc.', 
      leerMas:'http://www.alegsa.com.ar/Dic/clic_derecho.php', 
      imgs:[

          {
            src:'http://www.alegsa.com.ar/Imagen/clic_derecho.png',
            alt:'Clic derecho'
            } ,

          ]
    } ,
    clic_izquierdo:{
      nombre:'ClicIzquierdo', 
      detalle:'Onomatopeya en español del sonido de la pulsación de un botón del ratón. Cuando se dice que "se debe hacer clic", se hace referencia a la acción de presionar un botón del mouse (ratón) que suele ser el botón izquierdo en configuración para diestros. Esto vale también para su correspondiente en otros dispositivos con puntero como el trackball o el touchpad. Es "click" en inglés. En tanto en español suele usarse en frases como: hacer clic, dar clic, clicar o cliquear, sin "k" según la Real Academia Española.', 
      leerMas:'http://www.alegsa.com.ar/Dic/clic.php', 
      imgs:[

          {
            src:'http://www.alegsa.com.ar/Imagen/clic_izquierdo.png',
            alt:'Clic izquierdo'
            } ,

          ]
    },
    scroll:{
      nombre:'Scroll', 
      detalle:'La rueda de desplazamiento (scroll wheel) o rueda del ratón (mouse wheel) de computadora, es el disco de plástico duro o goma dura, perpendicular a la superficie del ratón de computadora. Normalmente está ubicada entre medio de los botones izquierdo y derecho del ratón.', 
      leerMas:'https://es.wikipedia.org/wiki/Rueda_de_desplazamiento', 
      imgs:[

          {
            src:'https://i.ytimg.com/vi/8thLK4Gar0E/maxresdefault.jpg',
            alt:'Scroll'
            } ,

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
