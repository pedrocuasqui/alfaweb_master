parasails.registerComponent('modulo-side-var-menu', {
    props: {
        objetoSeleccionado: {
            type: Object,
            default: () => { return { id: '1', nombreModulo: 'crearModulo', rol: 'Administrador' } }
        },
        curso: Object,

        usuario: {
            type: Object,
            default: () => { return { nombre: 'Admin', rol: 'Administrador' } }
        },
        posicionSeleccionada: null

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
        <h4 class="col text-center">{{curso.nombre}}</h4>    
        <h5 class="col text-center">Contenidos </h5>
            <!--dropdownModulo      : contenedor individual del modulo y sus submodulos-->
            <!--dropbtn-modulo      : el boton que contiene el nombre del modulo -->
            <!--dropdown-submodulo  : contenedor individual del submodulo -->
            <div v-for="(modulo, index) in curso.modulos" class="dropdownModulo" :key="modulo.id" >
                <a class="btn btn-primary dropbtn-modulo" :class="{'modulo-seleccionado':perteneceObjeto(modulo.id)}" :href="modulo.enlace" >{{modulo.nombreModulo}}</a>
                
                <div :class="[modulo.id==objetoSeleccionado.id? 'dropdown-submodulo':'dropdown-submodulo-deselect' ]">
                    <a v-for="submodulo in modulo.submodulos" :href="submodulo.enlace" :key="submodulo.id">{{submodulo.nombreSubmodulo}}</a>
                    <a v-if="usuario.rol=='Administrador'" :href="'/view-crear-submodulo/?moduloId='+modulo.id"><i class="fas fa-plus-circle"></i> Agregar Submódulo</a>
                </div>
            </div>
          <div v-if="usuario.rol=='Administrador'" class="dropdownModulo" >
                <a class="btn btn-primary dropbtn-modulo" :href="'/view-crear-modulo/?cursoId='+curso.id" ><i class="fas fa-plus-circle" ></i> Agregar Módulo</a>
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
        },
        perteneceObjeto(moduloId) {
            var pertenece = null;
            if (this.objetoSeleccionado.id == moduloId || this.objetoSeleccionado.modulo == moduloId) {
                pertenece = true;
            }
            return pertenece;
        }

    },
    computed: {
       
    }

});