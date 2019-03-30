parasails.registerComponent('side-var-menu', {
    props: {


    },
    data() {
        return {
            showSidebar: false,
            contenidos: [
                {
                    id: 'a',
                    nombreModulo: 'Introduccion al curso', descripcion: 'descripcion de la intro',
                    enlace: '',
                    multimedia: 'http://...',
                    submodulos: []
                },
                {
                    id: 'b',
                    nombreModulo: 'antes de empezar', descripcion: 'descripcion antes de empezar',
                    enlace: '',
                    multimedia: 'http://...',
                    submodulos: []
                },
                {
                    id: 'c',
                    nombreModulo: 'Módulo 1- La computadora ',
                    enlace: '/m1-computadora',
                    descripcion: 'descripcion la computadora',
                    multimedia: 'http://...',
                    submodulos: [{
                        id: 'c1',
                        nombre: 'El sistema informático (Hardware y software)',
                        enlace: '/m1-sistema-informatico',
                        descripcion: 'Descripcion submódulo',
                        multimedia: 'http://..',
                        /* temas: [
                            {
                             id:'12',
                             nombre: 'Monitor',
                             enlace:'/m1-sistema-informatico-monitor',
                             descripcion: 'El monitor ...',
                             multimedia: 'http://...'
                           },
                           {
                             id:'13',
                             nombre: 'Mouse',
                             enlace:'/m1-sistema-informatico-mouse',
                             descripcion: 'El monitor ...',
                             multimedia: 'http://...'
                           }]*/
                    },
                    {
                        id: 'c2',
                        nombre: 'Conexion de los distintos componentes de la computadora',
                        enlace: '/m1-conexion-componentes',
                        descripcion: 'Descripcion submódulo',
                        multimedia: 'http://...',

                    }]
                },

                {
                    id: 'd',
                    nombreModulo: 'Módulo 2- Navegacion en escritorio',
                    descripcion: 'descripcion Navegacion escritorio',
                    enlace: '/m2-navegacion-escritorio',
                    multimedia: 'http://...',
                    submodulos: [{
                        id: 'd1',
                        nombre: 'El escritorio',
                        enlace: '/m2-navegacion-escritorio-escritorio',
                        descripcion: 'Descripcion submódulo',
                        multimedia: 'http://..',
                    },

                    ]
                },

                {
                    id: 'e',
                    nombreModulo: 'Módulo 3- Edición de documentos',
                    descripcion: 'descripcion edicion de documentos',
                    enlace: '/',
                    multimedia: 'http://...',
                    submodulos: [{
                        id: 'e1',
                        nombre: 'Pantalla principal de word',
                        enlace: '/',
                        descripcion: 'Descripcion submódulo',
                        multimedia: 'http://..',
                    },

                    ]
                },
            ],
        };
    },
    template: `  
    <div >
    <div id="sidebar-menu" v-bind:class="{'sidebar-oculto':showSidebar}">
        <a  href="#menuContenidos" data-toggle="collapse" class="d-md-none d-lg-none d-sm-block d-xs-block"><i class="fas fa-bars"></i>   </a>
 
        <div id="menuContenidos" class=" collapse d-sm-none d-xs-none d-md-block d-lg-block" >
            <div v-for="modulo in contenidos" class="dropdown">
                <button class="dropbtn">{{modulo.nombreModulo}}</button>
                <div class="dropdown-content ">
                    <a v-for="submodulo in modulo.submodulos" href="#">{{submodulo.nombre}}</a>
                </div>
            </div>
    
        </div> 

                
        <div class="caret-container">
          <i v-if="!showSidebar" @click="onClickLeftCaret" id="left-caret" class="caret fas fa-caret-left"></i>
          <i v-else @click="onClickRightCaret" id="right-caret" class="caret fas fa-caret-right"></i>
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