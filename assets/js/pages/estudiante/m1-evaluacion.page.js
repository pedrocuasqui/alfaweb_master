parasails.registerPage('m1-evaluacion', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    tituloContenido: 'Demuestra tus conocimientos',
    descripcionActividad: 'Da clic sobre el: ',
    elementos: [],
    elementoTurno: '',
    timer: null,
    tiempoSegundos: 5,
    contadorTimer:0,
    idElementoSeleccionado:null,
    esCorrecto:false,
    conteoAciertos: 0,
    actividadFinaliza:false

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
    let objetosg = document.getElementById("lienzo-svg").getElementsByTagName("g")

    for (i = 0; i < objetosg.length; i++) {
      this.elementos.push(objetosg[i].getAttribute('id'))
    }
    console.log(this.elementos.toString());
    this.elementoTurno=this.elementos[this.contadorTimer];
    setTimeout(this.iniciaConteo,1000);
  },
  updated:function(){
// console.log('actualizado');
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    iniciaConteo() {
      this.timer = setInterval(() => this.cuentaRegresiva(), 1000);
    },
    cuentaRegresiva() {
// Si el contador aun no ha llegado a cero, continua restando un numero cada segundo
      if (this.tiempoSegundos >= 1) {
        this.tiempoSegundos--;
      } else {
        // si el contador de elementos ha llegado a su fin, se detiene la funcion setInterval
        if(this.contadorTimer==this.elementos.length-1){
          clearInterval(this.timer);
          this.tiempoSegundos=0;
          this.elementoTurno='';
          this.actividadFinaliza=true;
        }
        // caso contrario se aumenta el contador de elementos y se obtiene un elemento "g" actual
        else{
          this.contadorTimer++;
          this.tiempoSegundos = 5;
          this.elementoTurno=this.elementos[this.contadorTimer];
        }
        
      }

    },
    mouseClickPc(event) {
      // event.target funciona tal como document.getElementById() 
      // fuente: https://stackoverflow.com/questions/7723188/what-properties-can-i-use-with-event-target
      let elementoSeleccionado = event.target;
      // si el elemento seleccionado es un elemento "path" entonces selecciona al objeto padre
      if(elementoSeleccionado){
        this.idElementoSeleccionado=elementoSeleccionado.parentNode;
        // caso contrario selecciona al elemento "event"
      }else{
        this.idElementoSeleccionado=elementoSeleccionado;
      }
      if(this.idElementoSeleccionado.getAttribute('id') == this.elementoTurno){
        this.esCorrecto=true;
        this.conteoAciertos++;
        this.tiempoSegundos = 0;
        this.idElementoSeleccionado.setAttribute("style", "fill: chartreuse;")
        document.getElementById(this.idElementoSeleccionado.getAttribute('id')).removeAttribute('onmousedown');
      }else{
        this.tiempoSegundos = 0;
        this.idElementoSeleccionado.setAttribute("style", "fill: red;")
      }

    }
  },
  computed: {

  }
});
