parasails.registerComponent('modulo-side-var-menu', {
    props: {
        objetoSeleccionado: {
            type: Object,
            default: () => { return { id: '1', nombreModulo: 'crearModulo', rol: 'Administrador' } }
        },
        curso: {
            type: Object,
            required: true
        },
        usuario: {
            type: Object,
            default: () => { return { nombre: 'Admin', rol: 'Administrador' } }
        },
        posicionSeleccionada: null,
        crearSubmodulo: false

    },
    data() {
        return {

            showSidebar: false,
            cursoInformatica: false,

        };
    },
    mounted() {

        if (this.curso.nombre == 'Alfabetizacion informática') {
            this.cursoInformatica = true;
        }
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
                <!--ES ADMIN, PUEDE CREAR CURSO Y MODIFICARLOS, EXCEPTO EL CURSO INFORMATICA BASICA-->
                <a v-if="esAdmin" key="admin" class="btn btn-primary dropbtn-modulo" :class="{'modulo-seleccionado':perteneceObjeto(modulo.id)}" :href="'/administrar-contenido/?objetoId='+modulo.id+'&tipoContenido=Modulo'" :style="colorModulo(modulo.id)">{{modulo.nombreModulo}}</a>
                <!--ES CURSO INFORMATICA, TODOS PUEDEN ACCEDER A EL PERO NADIE, NI EL ADMINISTRADOR ni ESTUDIANTE PUEDEn EDITARLO-->
                <a v-else-if="cursoInformatica" key="informatica" clgit ass="btn btn-primary dropbtn-modulo" :class="{'modulo-seleccionado':perteneceObjeto(modulo.id)}" :href="'/contenido-alfaweb/?enlace='+modulo.enlace" :style="colorModulo(modulo.id)" >{{modulo.nombreModulo}}</a>
                <!--ES ESTUDIANTE Y HA INGRESADO A OTRO CURSO QUE NO SEA INFORMATICA BASICA-->
                <a v-else key="estudiante" class="btn btn-primary dropbtn-modulo" :class="{'modulo-seleccionado':perteneceObjeto(modulo.id)}" :href="'/interfaz-modulos/?objetoId='+modulo.id+'&tipoContenido=Modulo'" :style="colorModulo(modulo.id)">{{modulo.nombreModulo}}</a>

                <div :class="[perteneceObjeto(modulo.id) ? 'dropdown-submodulo':'dropdown-submodulo-deselect' ]">
                    <template v-if="esAdmin"> 
                         <a  v-for="submodulo in modulo.submodulos" :href="'/administrar-contenido/?objetoId='+submodulo.id+'&tipoContenido=Submodulo'" :key="submodulo.id" :class="[submodulo.id==objetoSeleccionado.id? 'submodulo-seleccionado':'submodulo-deseleccionado']">{{submodulo.nombreSubmodulo}}</a>
                    </template>
                    <template v-else-if="cursoInformatica">
                         <a  v-for="submodulo in modulo.submodulos" :href="'/contenido-alfaweb/?enlace='+submodulo.enlace" :key="submodulo.id" :class="[submodulo.id==objetoSeleccionado.id? 'submodulo-seleccionado':'submodulo-deseleccionado']">{{submodulo.nombreSubmodulo}}</a>
                    </template >
                    <template v-else>
                    <a  v-for="submodulo in modulo.submodulos" :href="'/interfaz-modulos/?objetoId='+submodulo.id+'&tipoContenido=Submodulo'" :key="submodulo.id" :class="[submodulo.id==objetoSeleccionado.id? 'submodulo-seleccionado':'submodulo-deseleccionado']">{{submodulo.nombreSubmodulo}}</a>
               </template >
                    <a v-if="esAdmin" :href="'/view-crear-submodulo/?moduloId='+modulo.id" :class="[crearSubmodulo? 'submodulo-seleccionado':'']"><i class="fas fa-plus-circle"></i> Agregar Submódulo</a>
                </div>
            </div>
          <div v-if="esAdmin" class="dropdownModulo" >
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
            var pertenece = false;
            console.log('modulo.id:' + moduloId + 'vs Submodulo.modulo' + this.objetoSeleccionado.modulo);
            if (this.objetoSeleccionado.id == moduloId || this.objetoSeleccionado.modulo == moduloId) {
                pertenece = true;
            }
            return pertenece;
        },
        colorModulo(moduloId) {

            var estilo = {};
            console.log('modulo.id:' + moduloId + 'vs Submodulo.modulo' + this.objetoSeleccionado.modulo);
            if (this.objetoSeleccionado.id == moduloId || this.objetoSeleccionado.modulo == moduloId) {
                estilo = { backgroundColor: this.objetoSeleccionado.color };

            }
            return estilo;

        },
        objetoPerteneceModulo(moduloId) {
            let valor = false;
            //primera parte, se evalua que el objeto seleccionado sea un modulo y que sea el modulo del arreglo
            //la segunda parte se evalua si el objetoSeleccionado es un submodulo y su propiedad modulo corresponda con el modulo actual
            if (this.moduloId == this.objetoSeleccionado.id || this.moduloId == this.objetoSeleccionado.modulo) {
                valor = true;
            }


            return valor;
        }


    },
    computed: {
        esAdmin() {
            let esadmin = false;
            //si el usuario es administrador pero no ha seleccionado el curso de informatica basica, se le da permiso de administrador
            if (this.usuario.rol == 'Administrador' && this.cursoInformatica == false) {
                esadmin = true;
            }
            // si el usuario es estudiante entonces se le niega el permiso de administrador, asi que hay dos opciones 
            //1) seleccionó curso 'Informática báscia' --> se habilita solo el curso informática básica
            //2) seleccionó cualquier otro curso --> se habilita la última opcion de modulos que corresponde a solo visualizar el contenido creado por un administrador
            else if (this.usuario.rol == 'Estudiante') {
                esadmin = false;
            }


            return esadmin;
        },
        esAlfaweb(){

        }
    }

});