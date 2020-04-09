<template>
<q-page>
        <div class="container row">
<!-- LEFT PART -->
        <div class="col-6 q-pa-sm q-pt-xl q-pl-xl">
            <p style="font-size:60px;font-family: 'Domine', serif;padding:0;margin:0;line-height:60px">A taste of local organ<br> & seasonal flavours</p>
            <p class="q-pt-md" style="font-size:18px;font-family: 'Noto Serif SC', serif;">Whether you're in the mood for a 'small' poutine or a 'big' salad, 'just <br>one' beer or a double shot espresso, when it satisfies your tastebuds. </p>
            <!-- BUTTON FOR PARTYTRAY -->
            <div class="q-pa-sm q-pt-md">
             <q-btn style="background-color:#e4acbf;width:280px;height:50px" @click="$router.push('/partytray')" text-color="white" label="PARTY TRAY" />
            </div>
            <div class="q-pa-md" style="font-size:20px;font-family: 'Noto Serif SC', serif;"><b>Our Hot Offers</b></div>
            <div class="row">
                <div style="margin-top: -40px">
                <q-table grid :data="returnWithPartyTrays" :columns="columns" :rows-per-page-options="[0]" hide-bottom :pagination.sync="pagination" :filter="filter" class="row items-center q-pa-lg q-ma-lg">
                <template v-slot:item="props">            
                      <q-card flat class="my-card col-3 q-pa-sm" style="width:165px;height:200px" >
                          <div>
                              <q-img :src="props.row.foodPic" styl="height:200px" :ratio="4/3"/>
                          <q-card-section side>
                          <q-list dense>
                              <div class="row items-center justify-between">
                                  <div>    
                                      <div>
                                          <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><b>{{props.row.foodName}}</b></div>
                                          <!-- <div style="font-size:12px">{{props.row.partyTrayPrice[0].price}} Pesos</div> -->
                                      </div>
                                  </div>
                                  <!-- <div class="col">
                                      <q-btn round color="pink-3" @click="openDialog(props.row)" class="q-ml-lg" flat size="md" icon="shopping_cart"/>
                                  </div> -->
                              </div>
                          </q-list>
                          </q-card-section>
                          </div>
                      </q-card>
                  </template>
            </q-table>
            </div>
            </div>    
        </div>
<!-- END OF LEFT PART -->
<!-- RIGHT PART -->
        <div class="col q-pa-sm q-pt-lg">
          <div class="row">
                <div style="margin-top: -40px">
                <q-table grid :data="returnFood" :columns="columnss" :rows-per-page-options="[0]" hide-bottom :pagination.sync="paginations" :filter="filter" class="row items-center q-pa-lg q-ma-lg">
                <template v-slot:item="props">            
                      <q-card flat class="transparent my-card col-6 q-pa-sm" style="width:280px;height:400px" >
                          <div>
                              <q-img :src="props.row.foodPic" style="height:400px" :ratio="4/3"/>
                          <q-card-section side>
                          <q-list dense>
                              <div class="row items-center justify-between">
                                  <div>    
                                      <div>
                                          <div class="text-h6" style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><b>{{props.row.foodName}}</b></div>
                                          <!-- <div style="font-size:12px">{{props.row.partyTrayPrice[0].price}} Pesos</div> -->
                                      </div>
                                  </div>
                                  <!-- <div class="col">
                                      <q-btn round color="pink-3" @click="openDialog(props.row)" class="q-ml-lg" flat size="md" icon="shopping_cart"/>
                                  </div> -->
                              </div>
                          </q-list>
                          </q-card-section>
                          </div>
                      </q-card>
                  </template>
            </q-table>
            </div>
            </div>
            <!-- <div class="row q-gutter-md q-pt-sm">
                <div>
                <q-card flat class="transparent my-card">
                  <img style="height:400px;width:300px" src="statics/pics/foo.jpeg">
                  <q-card-section style="margin:0;padding:0">
                    <div class="text-h6 q-pa-sm">Noodle Soup</div>
                    <div class="text-subtitle2 q-pt-sm q-px-sm">This photo makes me feel comforted. There</div>
                    <div class="text-subtitle2 q-px-sm">is no food more comforting than soup.</div>
                  </q-card-section>
                </q-card>
                </div>
                <div>
                <q-card flat class="transparent my-card">
                  <img style="height:400px;width:300px" src="statics/pics/foo.jpeg">
                  <q-card-section style="margin:0;padding:0">
                    <div class="text-h6 q-pa-sm">Noodle Soup</div>
                    <div class="text-subtitle2 q-pt-sm q-px-sm">This photo makes me feel comforted. There</div>
                    <div class="text-subtitle2 q-px-sm">is no food more comforting than soup.</div>
                  </q-card-section>
                </q-card>
                </div>
            </div>     -->
        </div>       
<!-- END OF RIGHT PART -->

        </div>
</q-page>
</template>

<script>
export default {
  data () {
    return {
        Food: [],
        filter: '',
        paginations: { sortBy: 'Category', descending: false, page: 2, rowsPerPage: 2},
        pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10000},
        columnss: [
            { name: 'category', required: true, label: 'Food Category', align: 'center', field: 'category', sortable: true },
            { name: 'foodName', align: 'center', label: 'Food Name', field: 'foodName', sortable: true },
            // { name: 'foodPrice', align: 'center', label: 'Package Price', field: 'foodPrice', sortable: true },
        ],
        columns: [
            { name: 'category', required: true, label: 'Food Category', align: 'center', field: 'category', sortable: true },
            { name: 'foodName', align: 'center', label: 'Food Name', field: 'foodName', sortable: true },
            // { name: 'foodPrice', align: 'center', label: 'Package Price', field: 'foodPrice', sortable: true },
        ],
    }
  },
  mounted(){
    this.$binding('Food', this.$firestoreApp.collection('Food'))
        .then(Food => {
        console.log(Food, 'Food')
        })
  },
  computed:{
    returnWithPartyTrays(){
            let party = this.$lodash.filter(this.Food, a=>{
                return a.partyTrayPrice
            })
            return party
        },
    returnFood(){
            let party = this.$lodash.filter(this.Food, a=>{
                return a.foodPrice
            })
            return party
        },
  }
}
</script>