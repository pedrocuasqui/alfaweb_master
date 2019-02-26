parasails.registerPage('m-1-conexion-componentes-monitor', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    tituloContenido: "Conexión del monitor al CPU",
    descripcionObjeto: 'La conexión entre el monitor y el CPU se hace a través del cable VGA. Dicho cable sale de la parte trasera del monitor y se conecta en la placa de video del CPU. Normalmente los conectores son de color azul.',
    navegarAtras: '/m1-conexion-componentes',
    navegarSiguiente: '/m1-conexion-componentes-teclado',

    breadcrumb: [{ id: '', texto: 'indice', enlace: '/indice-estudiante' },
    { id: '', texto: 'La computadora', enlace: '/m1-computadora' },
    { id: '', texto: 'Conexion componentes a la computadora', enlace: '/m1-conexion-componentes' },
    { id: '', texto: 'Conexion monitor-CPU', enlace: '/m1-conexion-componentes-monitor' },
  ],
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
  }
});
