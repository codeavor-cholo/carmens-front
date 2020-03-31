<template>
<q-page>
      <div class="container row">
<!-- LEFT PART -->
        <div class="col-6 q-pa-sm q-pt-xl q-pl-xl">
            <p style="font-size:60px;font-family: 'Domine', serif;padding:0;margin:0;line-height:60px">A taste of local organ<br> & seasonal flavours</p>
            <p class="q-pt-md" style="font-size:18px;font-family: 'Noto Serif SC', serif;">Whether you're in the mood for a 'small' poutine or a 'big' salad, 'just <br>one' beer or a double shot espresso, when it satisfies your tastebuds. </p>
            <!-- BUTTON FOR PARTYTRAY -->
            <div class="q-pa-sm q-pt-md">
             <q-btn style="background-color:#e4acbf;width:280px;height:50px" @click="$router.push('/cateringpage')" text-color="white" label="CATERING SERVICES" />
            </div>
            <div class="q-pa-md q-pt-xl" style="font-size:20px;font-family: 'Noto Serif SC', serif;"><b>Our Hot Offers</b></div>
            
            <div class="row">
                <div style="margin-top: -40px">
                <q-table grid :data="returnFood" :columns="columns" :rows-per-page-options="[0]" hide-bottom :pagination.sync="pagination" :filter="filter" class="row items-center q-pa-lg q-ma-lg">
                <template v-slot:item="props">            
                      <q-card flat class="my-card col-3 q-pa-sm" style="width:165px;height:200px" >
                          <div>
                              <q-img :src="props.row.foodPic" :ratio="4/3"/>
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
        <div class="col-6 q-pa-sm q-pt-xl q-pl-xl">
          <div class="row q-gutter-md q-pt-sm">
            
            <div>
             <q-table grid :data="Packages" :columns="columnss" :rows-per-page-options="[0]" hide-bottom :pagination.sync="paginations" row-key=".key">
                    <template v-slot:item="props">
                        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-6 col-lg-4 grid-style-transition" color="pink-3">
                            <q-card class="my-card" style="height: 555px;border: 2px solid;border-color: grey;">
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
                            </q-card>
                        </div>
                    </template>
                </q-table>      
            </div>
          </div>       
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
      Packages: [], 
      filter: '',
      pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 100},
      paginations: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 100},
      columns: [
            { name: 'category', required: true, label: 'Food Category', align: 'center', field: 'category', sortable: true },
            { name: 'foodName', align: 'center', label: 'Food Name', field: 'foodName', sortable: true },
            // { name: 'foodPrice', align: 'center', label: 'Package Price', field: 'foodPrice', sortable: true },
        ],
      columnss: [
            { name: 'name', required: true, label: 'Package name', align: 'center', field: 'name', sortable: true },
            { name: 'price', align: 'center', label: 'Package Per Head Price', field: 'price', sortable: true },
        ],
    }
  },
  mounted(){
    this.$binding('Food', this.$firestoreApp.collection('Food'))
        .then(Food => {
        console.log(Food, 'Food')
        }),
    this.$binding('Packages', this.$firestoreApp.collection('Packages'))
            .then(Packages => {
            console.log(Packages, 'Packages')
            })
  },
  computed:{
    returnFood(){
            let party = this.$lodash.filter(this.Food, a=>{
                return a.foodPrice 
            })
            return party
        },
  }
}
</script>