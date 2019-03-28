parasails.registerComponent('side-var-menu', {
    props: {
        

    },
    data() {
        return {
            showSidebar: false,
            contenidos: [
                {
                  id:'a',
                  nombreModulo: 'Introduccion al curso', descripcion: 'descripcion de la intro',
                  enlace:'',
                  multimedia: 'http://...',
                  submodulos: []
                },
                {
                  id:'b',
                  nombreModulo: 'antes de empezar', descripcion: 'descripcion antes de empezar',
                  enlace:'',
                  multimedia: 'http://...',
                  submodulos: []
                },
                {
                  id:'c',
                  nombreModulo: 'Módulo 1- La computadora',
                  enlace:'/m1-computadora',
                  descripcion: 'descripcion modulo',
                  multimedia: 'http://...',
                  submodulos: [{
                    id:'c1',
                    nombre: 'El sistema informático (Hardware y software)',
                    enlace:'/m1-sistema-informatico',
                    descripcion: 'Descripcion submódulo',
                    multimedia: 'http://..',
                    temas: [
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
                      }]
                  },
                  {
                    id:'c2',
                    nombre: 'Conexion de los distintos componentes de la computadora',
                    enlace:'/m1-conexion-componentes',
                    descripcion: 'Descripcion submódulo',
                    multimedia: 'http://...',
                    temas: [
                      {}
                    ]
                  }
                  ]
                }],
        };
    },
    template: `  <div >
    <div id="sidebar-menu" v-bind:class="{'oculta-sidebar':showSidebar}">
      
        <i v-if="!showSidebar" @click="onClickLeftCaret" id="left-caret" class="caret fas fa-caret-left"></i>
        <i v-else @click="onClickRightCaret" id="right-caret" class="caret fas fa-caret-right"></i>
        <div id="menuContenidos">
            <ul>
                <li v-for="item in contenidos"> <a :href="item.enlace">{{item.nombreModulo}} </a></li>    
            </ul>
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