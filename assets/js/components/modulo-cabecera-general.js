parasails.registerComponent("modulo-cabecera-general", {
	props: {
		breadcrumb: {
			type: Array,
			required: true,
			default: () => {
				return [{ nombreModulo: "", id: 1, enlace: "" }];
			}
		},
		usuario: {
			type: Object,
			required: false,
			default: () => {
				return { nombre: "Visitante", id: 1, rol: "Estudiante" };
			}
		}
	},
	data() {
		return {};
	},
	beforeMount() {},
	mounted() {},

	template: /*template */ `  
	<div class="row" id="div-cabecera">
		<div :class="usuario ? 'col-sm-8' : 'col-sm-6'">
			<modulo-barra-nav :breadcrumb="breadcrumb" :usuario="usuario"></modulo-barra-nav>
		</div>
		<div class="col-sm-2">
			<img src="/images/svg/iconoPolhibou.svg" alt="Logo Polhibou" />
		</div>
		
		<div :class="usuario ? 'col-sm-2':'col-sm-4'">
			<template v-if="usuario">
				<div class="btn-group">
					<button type="button" class="btn dropdown-toggle boton_formulario" data-toggle="dropdown"
						aria-haspopup="true" aria-expanded="false">
						<i class="fas fa-user-circle"></i> <span > {{usuario.nombre}} </span>
					</button>
					<div id="boton_desplegable_personalizado" class="dropdown-menu">
						<a class="dropdown-item  ">Rol: {{usuario.administrador && usuario.nombre !='Visitante'? "Administrador":"Estudiante"}}</a>
						<template  v-if="usuario.nombre !='Visitante'">
							<a class="dropdown-item  " href="/view-actualizar-usuario">Cambiar contraseña</a>
							<a class="dropdown-item  " href="/logout">Cerrar sesión</a>
						</template>
					</div>
				</div>
			</template>
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
</div>`,
	methods: {},
	computed: {}
});
