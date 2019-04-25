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
      <div class="nombre-usuario"> Nombre de usuario <i class="fas fa-bars"></i></div>
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
