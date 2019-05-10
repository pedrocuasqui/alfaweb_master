parasails.registerComponent('modulo-side-var-menu', {
    props: {
        moduloSeleccionado:{
            type:Object,
            default: ()=>{return {id:'1',nombreModulo:'crearModulo', rol:'Administrador'}}
        },
        curso: Object,

        usuario: {
            type: Object,
            default: () => { return { nombre: 'Pablo Neruda', rol: 'Administrador' } }
        },
        posicionSeleccionada:null

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
            <div v-for="(modulo, index) in curso.modulos" class="dropdown" :key="modulo.id" >
                <a class="btn btn-primary dropbtn" :class="{'modulo-seleccionado':modulo.id==moduloSeleccionado.id}" :href="modulo.enlace" >{{modulo.nombreModulo}}</a>
                
                <div class="dropdown-content" :class="{'contenido-modulo-seleccionado':modulo.id==moduloSeleccionado.id}">
                    <a v-for="submodulo in modulo.submodulos" :href="submodulo.enlace" :key="submodulo.id">{{submodulo.nombre}}</a>
                    <a v-if="usuario.rol=='Administrador'" href=""><i class="fas fa-plus-circle"></i> Agregar Submódulo</a>
                </div>
            </div>
          <div v-if="usuario.rol=='Administrador'" class="dropdown" >
                <a class="btn btn-primary dropbtn" :href="'/view-crear-modulo/?cursoId='+curso.id" ><i class="fas fa-plus-circle" ></i> Agregar Módulo</a>
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