parasails.registerComponent('modulo-contenedor-admin', {
    props: {

        breadcrumb: {
            type: Array,
            required: false,
            default:()=>{return [{nombreModulo:'',id:1,enlace:''}]}
        },
        // usuarioLogueado:{
        //     type:Boolean,
        //     required:false,
        //     defaultsTo:false
        // },
        nombreUsuario: {
            type: String,
            required: false
        }

    },
    // la definicion de clases css para este componente se encuentra en layout-admin.less
    template: //html
        `  
<div class="div-contenido container-fluid" v-cloak>
    <!-- Barra de navegacion en la parte superior-->
    <div class="row" id="div-cabecera"  >
        <div class="col-sm-10">
            <modulo-barra-nav :breadcrumb="breadcrumb"></modulo-barra-nav> 
        </div>
        <div class="col-sm-2">
            <img src="/images/svg/iconoPolhibou.svg" alt="Logo Polhibou"  />
        </div>
    </div>

    <!--Contenido -->
    <div class="row" id="div-body">
        <div v-if="nombreUsuario" class="nombre-usuario"> <i class="fas fa-user-circle"></i> {{nombreUsuario}} <i class="fas fa-bars"></i></div>
        <div v-else class="nombre-usuario"> <a href="/view-login">Inicia Sesión</a> | <a href="/view-registro-usuario">Regístrate</a> </div>
        <div class="col">
            <slot></slot>  
        </div>   
    </div>

</div>

    `,

    data: function () {
        return {};
    },
    methods: {

    }
});
