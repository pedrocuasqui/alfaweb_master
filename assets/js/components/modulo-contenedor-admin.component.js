parasails.registerComponent('modulo-contenedor-admin', {
	props: {
		breadcrumb: {
			type: Array,
			required: false,
			default: () => {
				return [{ nombreModulo: '', id: 1, enlace: '' }]
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
    <div class="row" id="div-cabecera" >
        <div class="col-sm-8">
            <modulo-barra-nav :breadcrumb="breadcrumb"></modulo-barra-nav>
        </div>
        <div class="col-sm-2">
            <img src="/images/svg/iconoPolhibou.svg" alt="Logo Polhibou"  />
        </div>
        <div class="col-sm-2">

            <div v-if="usuario" class="nombre-usuario">
            <div class="btn-group">
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    <i class="fas fa-user-circle"></i> {{usuario.nombre}} <i class="fas fa-bars"></i>
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="/view-actualizar-usuario">Cambiar contraseña</a>
                    <div class="dropdown-divider"></div>
                    <a v-if="usuario.nombre !='Visitante'" class="dropdown-item" href="/logout">Cerrar sesión</a>
                </div>
            </div>

        </div>


        <div v-else>
          <div class="row">
            <div class="col">
              <a class="btn btn-primary boton_formulario" role="button" href="/view-login">Inicia Sesión</a>
            </div>
            <div class="col">
              <a class="btn btn-primary boton_formulario" role="button" href="/view-registro-usuario">Regístrate</a>
            </div>
          </div>

        </div>



        </div>
    </div>

    <!--Contenido -->
    <div class="row" id="div-body">
        <div class="col contenedor-admin-login">
          <slot></slot>
        </div>
    </div>

</div>

    `,
	data: function() {
		return {}
	},
	methods: {},
})
