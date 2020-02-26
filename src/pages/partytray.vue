<template>
<q-page>
        <div>
            <div class="row q-gutter-md">
            <div class="q-pa-md q-pl-xl" style="font-size:60px;font-family: 'Domine', serif;padding-left:130px">PARTY TRAYS</div>
            <div class="row items-center q-pa-sm" style="padding-left:120px">
            <q-input v-model="filter" dense style="width:400px" rounded standout="bg-white text-grey-8" clearable input-class="text-pink-3" label="Search Food" class="q-ma-md" outlined icon="search" >
                <template v-slot:prepend>
                    <q-icon name="search" color="pink-3"/>
                </template>
            </q-input>
            </div>
            <div class="row items-center">
            <q-btn-dropdown dense label="filter by" flat color="grey-8">
                <q-list>
                    <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                        <q-item-label>Photos</q-item-label>
                    </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                        <q-item-label>Videos</q-item-label>
                    </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                        <q-item-label>Articles</q-item-label>
                    </q-item-section>
                    </q-item>
                </q-list>
                </q-btn-dropdown>
                </div>
                </div>          
        </div>

<!-- MOST POPULAR -->
            
            
            <div class="row">
                <div class="col-3 q-pt-xl q-pl-xl" style="font-size:30px;font-family: 'Domine', serif"> ALL PARTY TRAYS </div>
                <div class="col-9">
                <q-table grid :data="returnWithPartyTrays" :columns="columns" :pagination="pagination" :filter="filter" class="row items-center q-pa-lg q-ma-lg">
                <template v-slot:item="props">            
                    <div class="q-pa-sm grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
                        <q-card flat class="my-card" style="width:165px;height:200px" >
                            <div>
                                <q-img :src="props.row.foodPic" styl="height:200px" :ratio="4/3"/>
                            
                            <q-card-section side>
                            <q-list dense>
                                <div class="row items-center justify-between">
                                    <div class="col">    
                                        <div>
                                            <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><b>{{props.row.foodName}}</b></div>
                                            <div style="font-size:12px">{{props.row.partyTrayPrice[0].price}} Pesos</div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <q-btn round color="pink-3" @click="addPorder = true, openPorder(props)" class="q-ml-lg" flat size="md" icon="shopping_cart"/>
                                    </div>
                                </div>
                            </q-list>
                            </q-card-section>
                            </div>
                        </q-card>
                    </div>
                </template>
            </q-table>
            </div>
            </div> 
        

            <!-- <q-dialog v-model="addPorder">
            <q-card class="text-center text-weight-bold" style="min-width: 400px">
                            <q-img
                                :src="this.selectedPorder.foodPic"
                                :ratio="4/3"
                                >
                                <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                                    {{this.selectedPorder.foodName}}
                                </div>
                            </q-img>
                            <span class="text-center text-weight-bold text-h6" style="font-family: 'Roboto Slab', serif;">PARTY TRAY SIZE/s AND PRICES</span>
                                <div class="q-pa-sm" v-for="(price, index) in this.selectedPorder.partyTrayPrice" :key="index">
                                    <div>
                                        <q-checkbox @input="consolePorder" keep-color color="deep-orange-4" dense :val="price" v-model="pOrderSelected" />
                                        {{ price.label }}({{price.paxMin}} - {{price.paxMax}}) for {{ price.price }}php
                                        </div>
                                </div>
                        <q-card-section>
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn flat color="grey-8" label="Cancel" v-close-popup />
                        <q-btn flat color="deep-orange-4" label="Add To Order" @click="addToCart" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>       -->
        
</q-page>
</template>


<script>
export default {
  data () {
    return {
      search: '',
      storageRef: null,
      Food: [],
      FoodCategory: [],
      PartyTrayLabel: [],
      selectedPorder: [],
      addPorder: false,
      filter: '',
                  pagination: { sortBy: 'Category', descending: false, page: 1, rowsPerPage: 10},
            columns: [
                { name: 'category', required: true, label: 'Food Category', align: 'center', field: 'category', sortable: true },
                { name: 'foodName', align: 'center', label: 'Food Name', field: 'foodName', sortable: true },
                // { name: 'foodPrice', align: 'center', label: 'Package Price', field: 'foodPrice', sortable: true },

            ],
    }
  }, 
  mounted (){   
      this.$binding('PartyTrayLabel', this.$firestoreApp.collection('PartyTrayLabel'))
        .then(PartyTrayLabel => {
        console.log(PartyTrayLabel, 'PartyTrayLabel')
        }),
        this.$binding('FoodCategory', this.$firestoreApp.collection('FoodCategory'))
        .then(FoodCategory => {
        console.log(FoodCategory, 'FoodCategory')
        }),
        this.$binding('Food', this.$firestoreApp.collection('Food'))
        .then(Food => {
        console.log(Food, 'Food')
        }),
        this.storageRef = this.$firebase.storage().ref()
        console.log(this.storageRef, 'store')
  },
  created(){

  },
  computed: {
        returnWithPartyTrays(){
            let party = this.$lodash.filter(this.Food, a=>{
                if(a.partyTrayPrice != null){
                    return a
                } 
            })
            return party
        }
  },
  methods: {

  }
}
</script>