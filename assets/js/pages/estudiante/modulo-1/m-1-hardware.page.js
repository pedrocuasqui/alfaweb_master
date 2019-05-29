parasails.registerPage('m-1-hardware', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    tituloContenido:'Sistema informático',
    descripcionObjeto: '',
    breadcrumb: [{ id: '', texto: 'indice', enlace: '/indice-estudiante' },
    { id: '', texto: 'La computadora', enlace: '/m1-computadora' },
    { id: '', texto: 'Sistema informático', enlace: '/m1-sistema-informatico' }],
    
    usuario:Object,
    navegarSiguiente:'',
    navegarAtras:'/m1-computadora',
    tituloEvaluacion:'',
    evIndividual:false,
    objetoSeleccionado:'',
  
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    this.usuario=SAILS_LOCALS.usuario;
    this.objetoSeleccionado= SAILS_LOCALS.objetoSeleccionado,
    this.navegarSiguiente=SAILS_LOCALS.siguiente;

  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    evaluacionIndividual(){ //funcion recibida del componente modulo-contenedor-curso
      this.tituloEvaluacion=this.objetoSeleccionado.nombreModulo;
      console.log(this.objetoSeleccionado.nombreModulo);
      this.evIndividual=true;
    }
  }
});
