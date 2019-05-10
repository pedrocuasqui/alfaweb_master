parasails.registerComponent('modulo-side-var-menu', {
    props: {
        // curso:{
        //     type:Object,
        //     required:false,
        //     default:function (){ return {nombre:'Inserta un curso', descripcion:'Inserta una descripción'} }
        // },
        contenidos: {
            type: Array,

        },
        usuario: {
            type: Object,
            default: () => { return { nombre: "Pablo Neruda", rol: "Administrador" } }
        }

    },
    data() {
        return {

            showSidebar: false,

        };
    },
    template: //html
        `  
    <div >
  
    <div id="sidebar-menu" v-bind:class="{'sidebar-oculto':showSidebar}" >
        <div id="menuContenidos" >
            <h3>Contenidos </h3>
            <div v-for="modulo in contenidos" class="dropdown">
                <a class="btn btn-primary dropbtn" :href="modulo.enlace" >{{modulo.nombreModulo}}</a>
                <div class="dropdown-content ">
                    <a v-for="submodulo in modulo.submodulos" :href="submodulo.enlace">{{submodulo.nombre}}</a>
                </div>
            </div>
            <div  class="dropdown">
                <a class="btn btn-primary dropbtn" :href="" ><i class="fas fa-plus-circle"></i></a>
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