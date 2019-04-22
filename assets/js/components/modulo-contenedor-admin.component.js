parasails.registerComponent('modulo-contenedor-admin', {
    props: {

        breadcrumb: {
            type: Array,
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
        <slot></slot>     
    </div>
</div>

    `,

    data: function () {
        return {};
    },
    methods: {

    }
});
