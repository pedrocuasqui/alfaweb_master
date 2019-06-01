parasails.registerPage('m-1-computadora', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    
    descripcionActividad: "BIENVENIDO!!! \n Pasa el mouse sobre las imágenes para que puedas ver el nombre de los objetos.",
    breadcrumb: [],

    // modulo:{
    //   nombreModulo: 'Módulo 1- La computadora ',
    //   descripcion: 'La computadora es una máquina electrónica capaz de recibir un conjunto de órdenes y ejecutarlas realizando cálculos complejos, o agrupando y correlacionando otro tipo de información. Es también conocida como ordenador o computador.',
    // },
    usuario:Object,
    navegarSiguiente:'',
    navegarAtras:'',
    tituloEvaluacion:'',
    evIndividual:false,
    objetoSeleccionado:'',

    mouseX: 0,
    mouseY: 0,
    mostrarToolTip: false,
    textoToolTip: {
      type: String,
      default: "computador"
    },
    
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝

  created() {
    // aqui se puede ejecutar código apenas la instancia vue ha sido creada, la propiedad "el" aun no estará disponible
    // mostramos el modal
    this.mostrarModal();
  },
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    

    this.objetoSeleccionado=SAILS_LOCALS.objetoSeleccionado;
    this.usuario= SAILS_LOCALS.usuario;
    this.navegarAtras= '/indice-estudiante/?usuarioId='+this.usuario.id+'&cursoId='+this.curso.id,
    this.navegarSiguiente=this.objetoSeleccionado.submodulos[0].enlace;
    this.breadcrumb.push(SAILS_LOCALS.curso);
    this.breadcrumb.push(SAILS_LOCALS.modulo);
  
    console.log(this.usuario);
  },
  mounted: async function () {
    //…

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    mostrarModal() {
      // para verficar que el DOM está listo se puede usar: $(fn)
      // fuente: https://es.stackoverflow.com/questions/51946/cu%C3%A1l-es-la-diferencia-entre-window-onload-y-document-ready
      $(function () {
        $('#modalInicial').modal('show');
      });
    },
    infoObjeto(idObjeto){
      if(idObjeto=='cpu'){
        console.log('cpu aslkdjfa;lk');
        $(function(){
          $('#modalCpu').modal('show');
        });

      }else if(idObjeto=='teclado'){
        $(function(){
          $('#modalTeclado').modal('show');
        });

      }else if(idObjeto=='mouse'){
        
        $(function(){
          $('#modalMouse').modal('show');
        });
      }else {
        $(function(){
          $('#modalMonitor').modal('show');
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
    evaluacionIndividual(contenido) { //funcion recibida del componente modulo-contenedor-curso
      if(contenido=='contenido'){
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = false;
      }else{
        this.tituloEvaluacion = this.objetoSeleccionado.nombreModulo;
        this.evIndividual = true;
      }
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
