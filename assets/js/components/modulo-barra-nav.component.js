parasails.registerComponent('modulo-barra-nav',{
    props:[
      'breadcrumb',
    ],
    data(){
        return {};
    },
    template:`  <div id="div-header" class="row">
    <div class="col">
    <nav aria-label="ruta">
      <ol class="breadcrumb">
        <li class="breadcrumb-item " v-for="item in breadcrumb"><a :href="item.enlace">{{item.texto}}</a></li>
        <!-- <li class="breadcrumb-item active" aria-current="pagina">La computadora</li> -->
      </ol>
    </nav>
    </div>
  </div>`,
    methods:{

    }

});