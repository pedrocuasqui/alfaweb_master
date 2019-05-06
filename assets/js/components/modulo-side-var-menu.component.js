parasails.registerComponent('modulo-side-var-menu', {
    props: {
curso:{
    type:Object,
    required:false,
    default:function (){ return {nombre:'Inserta un curso', descripcion:'Inserta una descripción'} }
},
contenidos:{
    type:Array,

}

    },
    data() {
        return {
            
            showSidebar: false,
            // contenidos: [
            //     {
            //         id: 'a',
            //         nombreModulo: 'Introduccion al curso', descripcion: 'descripcion de la intro',
            //         enlace: '',
            //         multimedia: 'http://...',
            //         submodulos: []
            //     },
            //     {
            //         id: 'b',
            //         nombreModulo: 'antes de empezar', descripcion: 'descripcion antes de empezar',
            //         enlace: '',
            //         multimedia: 'http://...',
            //         submodulos: []
            //     },
            //     {
            //         id: 'c',
            //         nombreModulo: 'Módulo 1- La computadora ',
            //         enlace: '/m1-computadora',
            //         descripcion: 'descripcion la computadora',
            //         multimedia: 'http://...',
            //         submodulos: [{
            //             id: 'c1',
            //             nombre: 'El sistema informático (Hardware y software)',
            //             enlace: '/m1-sistema-informatico',
            //             descripcion: 'Descripcion submódulo',
            //             multimedia: 'http://..',
            //             /* temas: [
            //                 {
            //                  id:'12',
            //                  nombre: 'Monitor',
            //                  enlace:'/m1-sistema-informatico-monitor',
            //                  descripcion: 'El monitor ...',
            //                  multimedia: 'http://...'
            //                },
            //                {
            //                  id:'13',
            //                  nombre: 'Mouse',
            //                  enlace:'/m1-sistema-informatico-mouse',
            //                  descripcion: 'El monitor ...',
            //                  multimedia: 'http://...'
            //                }]*/
            //         },
            //         {
            //             id: 'c2',
            //             nombre: 'Conexion de los distintos componentes de la computadora',
            //             enlace: '/m1-conexion-componentes',
            //             descripcion: 'Descripcion submódulo',
            //             multimedia: 'http://...',

            //         }]
            //     },

            //     {
            //         id: 'd',
            //         nombreModulo: 'Módulo 2- Navegacion en escritorio',
            //         descripcion: 'descripcion Navegacion escritorio',
            //         enlace: '/m2-navegacion-escritorio',
            //         multimedia: 'http://...',
            //         submodulos: [{
            //             id: 'd1',
            //             nombre: 'El escritorio',
            //             enlace: '/m2-navegacion-escritorio-escritorio',
            //             descripcion: 'Descripcion submódulo',
            //             multimedia: 'http://..',
            //         },

            //         ]
            //     },

            //     {
            //         id: 'e',
            //         nombreModulo: 'Módulo 3- Edición de documentos',
            //         descripcion: 'descripcion edicion de documentos',
            //         enlace: '/',
            //         multimedia: 'http://...',
            //         submodulos: [{
            //             id: 'e1',
            //             nombre: 'Pantalla principal de word',
            //             enlace: '/',
            //             descripcion: 'Descripcion submódulo',
            //             multimedia: 'http://..',
            //         },
            //         {
            //             id: 'e2',
            //             nombre: 'Redacción de un documento',
            //             enlace: '/',
            //             descripcion: 'Descripcion submódulo',
            //             multimedia: 'http://..',
            //         },

            //         ]
            //     },
            // ],
        
        };
    },
    template: `  
    <div >
  
    <div id="sidebar-menu" v-bind:class="{'sidebar-oculto':showSidebar}" >
        <div id="menuContenidos" >
            <h3>Contenidos {{curso.nombre}}</h3>
            <div v-for="modulo in contenidos" class="dropdown">
                <a class="btn btn-primary dropbtn" :href="modulo.enlace" >{{modulo.nombreModulo}}</a>
                <div class="dropdown-content ">
                    <a v-for="submodulo in modulo.submodulos" :href="submodulo.enlace">{{submodulo.nombre}}</a>
                </div>
            </div>
    
        </div> 

                
        <div class="caret-container ">
          <i v-if="!showSidebar" @click="onClickLeftCaret" id="left-caret" class="caret fas fa-caret-left "></i>
          <i v-else @click="onClickRightCaret" id="right-caret" class="caret fas fa-caret-right "></i>
        </div>
        
    </div>
    </div>`,
    methods: {
        onClickLeftCaret() {
            this.showSidebar = true;
        },
        onClickRightCaret() {
            this.showSidebar = false;
        }

    },
    computed: {

    }

});