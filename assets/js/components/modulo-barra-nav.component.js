parasails.registerComponent('modulo-barra-nav', {
  props: {
    breadcrumb: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      isAlfaWeb: false,
      cursoAlfaWeb: Object,
    };
  },
  beforeMount() {
    console.log('BREADCRUMB componente');
    console.log(this.breadcrumb);
    console.log('BREADCRUMB NOMBRE');
    console.log(this.breadcrumb[0]);

    if (this.breadcrumb[0].nombre == 'Alfabetizacion informática') {//el primer elemento siempre sera el curso, por tanto se verifica si el curso es alfabetizacion informatica
      this.isAlfaWeb = true;
      this.cursoAlfaWeb = this.breadcrumb.shift(); //elimina el primer elemento del curs
    }
    console.log('DESPUES DE IF');

  },
  mounted() {

  },
  template://html
    `  
    <div id="breadcrumb">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li><a href="/"><i class="fas fa-home"> </i></a></li>
          
          <li v-if="isAlfaWeb"  key="rutaAlfaweb" class="breadcrumb-item"> <a :href="'/indice-estudiante/?usuarioId=nada&cursoId='+cursoAlfaWeb.id"></a>/ {{cursoAlfaWeb.nombre}}</li>
          <li class="breadcrumb-item" v-for="item in breadcrumb">
          <a v-if="item.nombreModulo"  key="modulo" :href="'/contenido-alfaweb/?enlace='+item.enlace">{{item.nombreModulo}}</a>
          <a v-else key="submodulo" :href="'/contenido-alfaweb/?enlace='+item.enlace">{{item.nombreSubmodulo}}</a>
          </li>
        </ol>
      </nav>
    </div>`,
  methods: {


  }



});