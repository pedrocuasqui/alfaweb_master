parasails.registerPage('m-1-computadora-ev', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // tituloContenido: 'Demuestra tus conocimientos',
    objetoSeleccionado:{
      id:'1',
      nombreModulo:'Módulo 1- La computadora- Evaluación',
      descripcion:'',
    },
    descripcionActividad: 'Tienes 12 segundos para seleccionar el objeto que se te indica. Si necesitas ayuda presiona el avatar... Suerte!',
    
    navegarAtras: '/m1-computadora',
    navegarSiguiente: '/m1-sistema-informatico',
    accion: 'Da clic sobre el: ',
    elementos: [],
    elementoTurno: '',
    timer: null,
    tiempoSegundos: 12,
    contadorTimer: 0,
    idElementoSeleccionado: null,
    // esCorrecto: false,
    conteoAciertos: 0,
    actividadFinaliza: false,
    
    breadcrumb: [{ id: '', texto: 'indice', enlace: '/indice-estudiante' },
    { id: '', texto: 'La computadora - evaluacion', enlace: '/m1-computadora' },],
    mostrarIconoRepetir:false,
    

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeCreate(){
// Llamada sincronicamente inmediatamente despues de que la instancia ha sido inicializada antes de que data-observation y event/watcher sean establecidas,

  },
  created() {
    // aqui se puede ejecutar código apenas la instancia vue ha sido creada, la propiedad "el" aun no estará disponible
    // mostramos el modal
    this.mostrarModal();
  },
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

  },

  mounted: async function () {

    // cargamos los objetos "g" que se van a usar para evaluar
    let objetosg = document.getElementById("lienzo-svg").getElementsByTagName("g")
    for (i = 0; i < objetosg.length; i++) {
      this.elementos.push(objetosg[i].getAttribute('id'))
    }
    // cargamos el primer elemento en la vista
    this.elementoTurno = this.elementos[this.contadorTimer];


  },
  updated: function () {
    // console.log('actualizado');
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
    iniciaConteo() {
      
      this.timer = setInterval(this.cuentaRegresiva, 1000);
      
    },
    cuentaRegresiva() {
      // Si el contador aun no ha llegado a cero, continua restando un numero cada segundo
      if (this.tiempoSegundos >= 1) {
        this.tiempoSegundos--;

        this.objetoSeleccionado.descripcion=this.accion+" "+this.elementoTurno.toUpperCase()+ ", Tienes " +this.tiempoSegundos+" segundos";
      } else {
        // si aún no se han recorrido todos los elementos del arreglo  se aumenta el contador de elementos y se obtiene un elemento "g" actual
        if (this.contadorTimer < (this.elementos.length - 1)) {
          this.contadorTimer++;
          this.elementoTurno = this.elementos[this.contadorTimer];
          this.nextTimer();

        }

       
        // si se terminan de evaluar todos los objetos, se detiene la funcion setInterval
        else {

          this.actividadFinaliza = true;
          clearInterval(this.timer);
          this.mostrarModalFinalizacion();
        }

      }

    },
    mostrarModalFinalizacion() {
      // no funciona el modal si se hace un v-show
      $('#actividadFinalizada').modal('show');
      this.mostrarIconoRepetir=true;
      this.guardarEvaluacion();
    },
    guardarEvaluacion(){

    },
    empezarEvaluacion() {
      this.iniciaConteo();
    },
    moseDownPc(event) {
      console.log(this.contadorTimer)
      if (this.contadorTimer < (this.elementos.length)) {
        // event.target funciona tal como document.getElementById() 
        // fuente: https://stackoverflow.com/questions/7723188/what-properties-can-i-use-with-event-target
        let elementoSeleccionado = event.target;
        if (elementoSeleccionado) {// si el elemento seleccionado es un elemento "path" entonces selecciona al objeto padre
          this.idElementoSeleccionado = elementoSeleccionado.parentNode;
          // caso contrario selecciona al elemento "event"
        } else {
          this.idElementoSeleccionado = elementoSeleccionado;
        }
        // verifica que el elemento seleccionado sea el correcto
        if (this.idElementoSeleccionado.getAttribute('id') == this.elementoTurno) {
          this.idElementoSeleccionado.setAttribute("style", "fill: chartreuse;")
          this.conteoAciertos++;
          this.contadorTimer++;
          //si ya se aumenta un valor mas a la posicion final del arreglo, se termina la actividad
          if (this.contadorTimer == this.elementos.length) {
            this.objetoSeleccionado.descripcion="Se acabó el tiempo \n Has obtenido "+ this.conteoAciertos+ " aciertos de"+ this.elementos.length;
            this.actividadFinaliza = true;
            clearInterval(this.timer);
            this.mostrarModalFinalizacion();
          } else {
            this.elementoTurno = this.elementos[this.contadorTimer];
            this.nextTimer();

          }

        } else {
          this.idElementoSeleccionado.setAttribute("style", "fill: red;")
        }
      }
    },
    nextTimer() {
      // this.tiempoSegundos=0;
      clearInterval(this.timer); //se cancela el timer actual
      this.tiempoSegundos = 12;
      this.iniciaConteo();//comienza nuevamente el timer

    },
    omitirActividad(){
      return res.view("/");
    },
    intentarNuevamente(){
      this.mostrarModal();
      //volver los colores como al inicio
    }
  },
  computed: {

  }
});
