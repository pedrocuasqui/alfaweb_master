parasails.registerComponent("modulo-contenedor-admin", {
	props: {
		breadcrumb: {
			type: Array,
			required: false,
			default: () => {
				return [{ nombreModulo: "", id: 1, enlace: "" }];
			},
		},
		// usuarioLogueado:{
		//     type:Boolean,
		//     required:false,
		//     defaultsTo:false
		// },
		usuario: {
			type: Object,
			required: false, // required false implica que se acepten nulos, desde contenedor-admin se puede enviar un usuario null
		},
	},
	// la definicion de clases css para este componente se encuentra en layout-admin.less

	template: /*html*/ `
<div class="div-contenido container-fluid" v-cloak>
    <!-- Barra de navegacion en la parte superior-->
    <!--contiene a div class="row"-->
    <modulo-cabecera-general :breadcrumb="breadcrumb" :usuario="usuario"></modulo-cabecera-general>

    <!--Contenido -->
    <div class="row" id="div-body">
        <div class="col contenedor-admin-login">
          <slot></slot>
        </div>
    </div>

</div>

    `,
	data: function() {
		return {};
	},
	methods: {},
});
