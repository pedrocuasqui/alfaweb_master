parasails.registerComponent('modulo-barra-nav',{
    props:[
      'breadcrumb',
    ],
    data(){
        return {};
    },
    template:`  
    <div id="breadcrumb">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li><a href="/indice-estudiante"><i class="fas fa-home"> </i></a></li>
          <li class="breadcrumb-item" v-for="item in breadcrumb"><a :href="item.enlace">{{item.texto}}</a></li>
        </ol>
      </nav>
    </div>`,
    methods:{

    }

});