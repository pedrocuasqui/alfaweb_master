parasails.registerComponent('modulo-barra-nav', {
  props: {
    breadcrumb: {
      type: Array,
      required: true,
      default: () => { return [{ nombreModulo: '', id: 1, enlace: '' }] }
    },

  },
  data() {
    return {
      isAlfaWeb: false,
      cursoAlfaWeb: Object,
      breadcrumbTieneValores:true,
    };
  },
  beforeMount() {
    console.log('BREADCRUMB componente');
    console.log(this.breadcrumb);
    console.log('BREADCRUMB TAMANIO');
    console.log(this.breadcrumb.lenght);

    if (this.breadcrumb[0].nombre!='') {//verifica si existe el objeto 
      
      if (this.breadcrumb[0].nombre == 'Alfabetizacion informática') {//el primer elemento siempre sera el curso, por tanto se verifica si el curso es alfabetizacion informatica
        this.isAlfaWeb = true;
        this.cursoAlfaWeb = this.breadcrumb.shift(); //retorna el curso alfaweb
      }

    }else{
      console.log('NO EXISTEN VALORES DE BREAD');
      this.breadcrumbTieneValores=false;
    }
    

  },
  mounted() {

  },
  template://html
    `  
    <div id="breadcrumb">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/" title="Home"><a class="textoOculto"  href="/">home</a><i class="fas fa-home" > </i></a></li>
          
          <li v-if="isAlfaWeb"  key="rutaAlfaweb" class="breadcrumb-item"> <a :href="'/indice-estudiante/?cursoId='+cursoAlfaWeb.id"> {{cursoAlfaWeb.nombre}}</a></li>
          <li v-if="breadcrumbTieneValores" class="breadcrumb-item" v-for="item in breadcrumb">
          <a v-if="item.nombreModulo"  key="modulo" :href="'/contenido-alfaweb/?enlace='+item.enlace">{{item.nombreModulo}}</a>
          <a v-if="item.nombreSubmodulo" key="submodulo" :href="'/contenido-alfaweb/?enlace='+item.enlace">{{item.nombreSubmodulo}}</a>
          </li>
        </ol>
      </nav>
    </div>`,
  methods: {


  }



});