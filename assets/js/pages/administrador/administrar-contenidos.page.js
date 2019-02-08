
parasails.registerPage('administrar-contenidos', {
  // Los script pages y las vistas están del lado del cliente 

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    valorPrueba: 'valores de prueba',
    nombreModulo: '',
    contenidoNuevo: {
      nombreModulo: '',
      descripcion: 'modulo nuevo'
    },
    contenidosFront: [],
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Vincula cualquier dato inicial pasado desde el servidor como parámetro en las páginas ejs por medio de <%- exposeLocalsToBrowser() %>
    _.extend(this, SAILS_LOCALS);
    // aqui se está extendiendo el contenido de la variable CONTENIDOS pasada desde la accion view-administrar-contenidos.js
  },
  mounted: async function () {

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    /* agregarModulo: function(){
      this.contenidoNuevo.nombreModulo=this.nombreModulo;
        this.contenidosFront.push(this.contenidoNuevo);
        this.contenidoNuevo={
          nombreModulo:'',
          descripcion:'modulo nuevo'
        };
    }, */
    clickSeleccionarModulo: function (nombreContenido) {
      console.log('se ha seleccionado el elemento: ' + nombreContenido);
    }

  }
});
