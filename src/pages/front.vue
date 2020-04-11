<template>
<q-page>
<!-- START OF DESKTOP ONLY -->
    <div class="desktop-only">
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
    </div>
<!-- END OF DESKTOP ONLY -->


<!-- START OF MOBILE ONLY -->
    <div class="mobile-only">
        <!-- PARTY TRAY PART -->
        <div class="q-pt-xl">
            <p class="q-px-md text-weight-bold" style="font-size:28px;font-family: 'Domine', serif;">A taste of local organ<br> & seasonal flavours</p>
            <p class="q-px-md" style="font-size:15px;font-family: 'Noto Serif SC', serif;">Whether you're in the mood for a 'small' poutine or a 'big' salad, 'just one' beer or a double shot espresso, when it satisfies your tastebuds. </p>
            <!-- BUTTON FOR PARTYTRAY -->
            <div class="q-px-md text-center">
             <q-btn class="full-width" style="background-color:#e4acbf;height:40px" @click="$router.push('/partytray')" text-color="white" label="PARTY TRAY" />
            </div>
            <div class="q-pa-md q-pt-lg" style="font-size:20px;font-family: 'Noto Serif SC', serif;"><b>Our Hot Offers</b></div>
            
            <div class="row q-pl-sm ">
                <div>
                <q-table grid :data="returnWithPartyTrays" :columns="columns" :rows-per-page-options="[0]" hide-bottom :pagination.sync="pagination" :filter="filter" class="row justify-center items-center">
                <template v-slot:item="props">            
                      <q-card flat class="my-card col-4 q-pa-sm" style="width:174px;height:200px" >
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
<!-- END OF PARTY TRAY PART -->

<!-- START OF CATERING PART -->
        <div class="q-pt-md">
            <p class="q-px-md text-weight-bold" style="font-size:28px;font-family: 'Domine', serif;">A taste of local organ<br> & seasonal flavours</p>
            <p class="q-px-md" style="font-size:15px;font-family: 'Noto Serif SC', serif;">Whether you're in the mood for a 'small' poutine or a 'big' salad, 'just one' beer or a double shot espresso, when it satisfies your tastebuds. </p>
            <!-- BUTTON FOR PARTYTRAY -->
            <div class="q-px-md text-center">
                <q-btn class="full-width" style="background-color:#e4acbf;height:40px" @click="$router.push('/cateringpage')" text-color="white" label="CATERING SERVICES" />
            </div>
        </div>

        <div class="q-px-lg q-pt-sm">
             <q-table grid :data="Packages" :columns="columnpack" :rows-per-page-options="[0]" hide-bottom :pagination.sync="paginationpack" row-key=".key">
                    <template v-slot:item="props">
                        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-6 col-lg-4 grid-style-transition" color="pink-3">
                            <q-card class="my-card" style="height: 470px">
                              <q-card-section class="column items-center">
                                <div style="font-size:50px;color:#E4ACBF;font-family: 'Zhi Mang Xing', cursive;">{{props.row.name}}</div>
                                <div style="font-size:15px"><b>{{props.row.price}}php per pax</b></div>
                                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px" ><b>FOOD CHOICES</b></div>  
                                <div v-for="(price, index) in props.row.viands" :key="index" >
                                  <div class="q-pt-sm" style="font-size:12px"><i>{{ price.viandsQty }} viand<span v-show="price.viandsQty != '1'">s</span> of {{ price.category }}</i></div>
                                </div>
                                <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>INCLUSIONS</b></div>
                                <div v-for="(s, indexs) in props.row.inclusions" :key="indexs">
                                  <div style="font-size:12px"><i>{{ s.inclusion }}</i></div>
                                </div>
                              </q-card-section>
                            </q-card>
                            
                            
                            <!-- <q-card class="my-card" style="height: 555px;border: 2px solid;border-color: grey;">
                                <q-card-section side>
                                    <q-list dense>
                                    <q-item class="q-mt-sm">
                                    <span class="full-width text-center text-teal text-h6 text-weight-bold">
                                        <strong dense>{{props.row.name}} </strong>
                                        <br>
                                        <q-chip class="text-center">{{props.row.price}}php per pax</q-chip>
                                    </span>
                                    </q-item>     
                                    <q-separator class="q-mt-sm"/>
                                    <q-item class="q-mt-sm text-grey-8" v-show="props.row.viands">
                                    <span class="full-width text-center text-weight-bold">FOOD CATEGORIES</span>
                                    </q-item>
                                    <q-item v-for="(price, index) in props.row.viands" :key="index" class="text-grey-8">
                                        <q-item-section>
                                        <q-item-label> {{ price.viandsQty }} viand<span v-show="price.viandsQty != '1'">s</span> of {{ price.category }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator class="q-mt-sm"/>
                                    <q-item class="q-mt-sm" v-show="props.row.inclusions">
                                    <span class="full-width text-center text-weight-bold text-grey-8" >INCLUSIONS</span>
                                    </q-item>
                                    <q-item v-for="(price, index) in props.row.inclusions" :key="index" class="text-grey-8">
                                        <q-item-section>
                                        <q-item-label> {{ price.inclusion }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                                </q-card-section>
                            </q-card> -->
                        </div>
                    </template>
                </q-table>      
            </div>
<!-- END OF CATERING PART -->
    </div>
<!-- END OF MOBILE ONLY -->
</q-page>
</template>

<script>
export default {
  data () {
    return {
        Food: [],
        Packages: [],
        filter: '',
        paginations: { sortBy: 'Category', descending: false, page: 2, rowsPerPage: 2},
        pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10000},
        paginationpack: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 100},
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
        columnpack: [
            { name: 'name', required: true, label: 'Package name', align: 'center', field: 'name', sortable: true },
            { name: 'price', align: 'center', label: 'Package Per Head Price', field: 'price', sortable: true },
        ],
    }
  },
  mounted(){
    this.$binding('Food', this.$firestoreApp.collection('Food'))
        .then(Food => {
        console.log(Food, 'Food')
        })
    this.$binding('Packages', this.$firestoreApp.collection('Packages'))
            .then(Packages => {
            console.log(Packages, 'Packages')
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