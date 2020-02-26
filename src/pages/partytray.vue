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
            <div class="row justify-center" style="font-size:20px;font-family: 'Domine', serif"> OUR FOOD SELECTION </div>
            <div class="row q-gutter-md q-pl-lg">
                <q-table grid :data="returnWithPartyTrays" :columns="columns" :pagination="pagination" :filter="filter" class="row items-center q-pa-lg q-ma-lg">
                <template v-slot:item="props">            
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-4 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
                        <q-card flat class="my-card" style="border: 2px solid;border-color:pink" >
                            <div>
                            <q-card-section>
                                <q-img :src="props.row.foodPic" style="height:150px;width:250px"/>
                            </q-card-section>
                            <q-card-section side>
                                <q-list dense>
                                <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name" v-show="col.name != 'partyTrayPrice'">
                                    <q-item-section >
                                    <div class="row justify-between">
                                        <div style="font-family: 'Roboto Slab', serif;"><b>
                                            {{ col.label }}
                                            </b>
                                        </div>
                                        <div style="font-family: 'Roboto Slab', serif;">
                                            {{ col.value }}
                                        </div>
                                    </div>
                                    </q-item-section>
                                </q-item>
                                <q-item class="q-mt-sm" v-show="props.row.partyTrayPrice">
                                <span class="full-width text-center text-weight-bold" style="font-size:18px;font-family: 'Roboto Slab', serif;">PARTY TRAY PRICES</span>
                                </q-item>
                                <q-item v-for="(price, index) in props.row.partyTrayPrice" :key="index">
                                    <q-item-section>
                                    <div class="row justify-between">
                                        <div style="font-family: 'Roboto Slab', serif;"><b>
                                            {{ price.label }}({{price.paxMin}} - {{price.paxMax}})
                                            </b>
                                        </div>
                                        <div style="font-family: 'Roboto Slab', serif;">                               
                                            {{ price.price }}
                                        </div>
                                    </div>
                                    </q-item-section>
                                </q-item>
                                <q-item>
                                    <q-item-section class="q-mb-none q-pb-none" side>
                                        <q-btn color="pink-3" @click="addPorder = true, openPorder(props)" class="q-ml-lg" flat size="md" icon="shopping_cart" label="Add To Basket"/>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                            </q-card-section>
                            </div>
                        </q-card>
                    </div>
                </template>
            </q-table>
            </div> 


            <q-dialog v-model="addPorder">
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
            </q-dialog>      
        
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