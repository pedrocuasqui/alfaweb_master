parasails.registerComponent('modulo-contenedor-admin', {
    props: {
        tituloContenido: String,

        descripcionObjeto: [String],
        navegarAtras: {
            type: String,
            required: false,
        },
        navegarSiguiente: {
            type: String,
            required: false,
        },
        breadcrumb: {
            type: Array,
            required: false,
        },
        contenidos: {
            type: Object,
            required: false,
        },
    },
    template: `  
<div class="div-contenido container-fluid" v-cloak>
    <div class="row" id="div-cabecera"  >
        <div class="col-sm-10">
            <modulo-barra-nav :breadcrumb="breadcrumb"></modulo-barra-nav> 
        </div>
        <div class="col-sm-2">
            <img src="images/svg/iconoPolhibou.svg" alt="Logo Polhibou"  />
        </div>
    </div>

    <!-- Primera fila -Titulo del contenido -->
    <div class="row" id="div-body">
        
        
        
    </div>
</div>

    `,

    data: function () {
        return {};
    },
    methods: {

    }
});
