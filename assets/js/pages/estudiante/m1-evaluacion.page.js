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
    console.log(this.elementos.toString())
    this.iniciaConteo();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    iniciaConteo() {
      this.timer = setInterval(() => this.cuentaRegresiva(), 1000);

    },
    cuentaRegresiva() {
      let conteoElementos = this.elementos.length;
      do{
        this.elementoTurno = this.elementos[conteoElementos-1];
      }
      while (conteoElementos >= 1) {
        if (this.tiempoSegundos >= 1) {
          this.tiempoSegundos--;
        } else {
          this.tiempoSegundos = 5;
          this.elementoTurno = this.elementos[conteoElementos];
        }
        conteoElementos--;
      }
      // clearInterval(this.timer);
      //     this.regresaLaPagina()
    },
    regresaLaPagina() {
      console.log('regresa a la página anterior')
    },
    mouseClickPc(event) {
      let elementoSeleccionado = event.target;

    }
  },
  computed: {
    // objetoDeTurno() {
    //   let elem = 
    //   return
    // }
  }
});
