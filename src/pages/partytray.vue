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
                    <q-item clickable v-close-popup>
                    <q-item-section>
                        <q-item-label>Photos</q-item-label>
                    </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup>
                    <q-item-section>
                        <q-item-label>Videos</q-item-label>
                    </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup>
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
                                        <q-btn round color="pink-3" @click="openDialog(props.row)" class="q-ml-lg" flat size="md" icon="shopping_cart"/>
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
        

            <q-dialog v-model="addPorder" persistent="">
            <q-card class="text-center text-weight-bold" style="min-width: 400px">
                            <q-img
                                :src="this.selectedPorder.foodPic"
                                :ratio="4/3"
                                >
                                <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                                    {{this.selectedPorder.foodName}}
                                </div>
                            </q-img>
                            <div class="q-mt-md">
                            <span class="text-center text-weight-bold text-h6" style="font-family: 'Roboto Slab', serif;">PARTY TRAY SIZE/s AND PRICES</span>
                            </div>
                            <div class="q-pa-sm row q-pr-xl" v-for="(price, index) in this.selectedPorder.partyTrayPrice" :key="index">
                                <div class="col">                                
                                    <q-checkbox class="q-mt-md" keep-color color="deep-orange-4" dense :val="price" v-model="pOrderSelected" :label="price.label+' ( '+price.paxMin+' - '+price.paxMax+' ) ₱'+price.price" @input="checkIfRemoved(price)"/>
                                    <!-- {{ price.label }}({{price.paxMin}} - {{price.paxMax}}) for {{ price.price }}php -->
                                </div>
                                <div class="col-3">
                                    <q-input :rules="[val => val !== null && val !== '' || 'Please type quantity', val => val > 0 || 'Mininum value is 1']" color="grey-10" v-model="orderQty[price.label]" type="number" label="QTY" outlined="" dense v-show="returnStatus(price)"/>
                                </div>
                            </div>

                    <q-card-actions align="right" class="text-primary q-pa-md">
                        <q-btn flat color="grey-6" label="Cancel" v-close-popup @click="pOrderSelected = [], orderQty = []"/>
                        <q-btn flat color="deep-orange-4" label="Add To Basket" v-close-popup icon="shopping_cart" @click="addToBasket(selectedPorder)"/>
                    </q-card-actions>
                </q-card>
            </q-dialog>      
        
</q-page>
</template>


<script>
export default {
  data () {
    return {
        orderQty: [],  
        pOrderSelected: [],
        search: '',
        storageRef: null,
        Food: [],
        FoodCategory: [],
        PartyTrayLabel: [],
        selectedPorder: [],
        CartItems: [],
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
        this.$binding('CartItems', this.$firestoreApp.collection('CartItems'))
        .then(CartItems => {
        console.log(CartItems, 'CartItems')
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
        },

  },
  methods: {
    openDialog(item){
        this.selectedPorder = item
        this.addPorder = true
    },
    addToBasket(props){
        let item = {...props}
        
        let key = item['.key']
        delete item['.key']
        item.foodKey = key
        let size = this.pOrderSelected
        let qty = this.orderQty

        let keys = this.$lodash.keys(this.orderQty)
        // console.log(keys,'keys')

        if(size.length != keys.length){
            // this.showCompleteBanner = true
            console.log('no sqty')
        }

        let merge = [] //sizes and qty
        for( var x = 0; x < size.length; x++){
            let m = {...size[x]}
            m.qty = qty[m.label]
            merge.push(m)
        }

        console.log(merge,'merge')
        console.log(item,'itemAddToBasket')

        let value = this.$q.localStorage.getItem('addCart')
        var user = this.$firebase.auth().currentUser
        if(user){
            let uid = user.uid
            console.log(this.CartItems,'checking')
            let index = this.$lodash.findIndex(this.CartItems,a=>{
                return a['.key'] == uid
            })
            console.log(index,'index uid')
            if(index == -1){
                //first cart is add if none in database index
                this.firstCart(item,merge[0],uid)
            } else {
                for( var y= 0; y < merge.length; y++){
                    this.openPorder(item,merge[y],uid)
                }                
            }
            
        }
        else{
            if(value == null){
                this.firstCart(item,merge[0],'')
            } else {
                for( var y= 0; y < merge.length; y++){
                    this.openPorder(item,merge[y],'')
                }
            }
        }


        
        this.pOrderSelected = []
        this.orderQty = []
        
    },
    openPorder(props,sizeQty,uid){

        // console.log(props,'props')
        // console.log(sizeQty,'size')
        let order = {...props}
        order.size = sizeQty.label
        order.price = sizeQty.price
        order.min = sizeQty.paxMin
        order.max = sizeQty.paxMax
        order.qty = sizeQty.qty
        order.checkerName = order.foodName+'_'+sizeQty.label
        delete order.partyTrayPrice
        let key = 'addCart'
        // get value
        let value = this.$q.localStorage.getItem(key)
        

        // console.log(value,'value')
        // console.log(order,'order ko')
        if(value == null && uid == ''){
            let itemss = []
            itemss.push(order)
            console.log(itemss,'to push no local')  
            let addCart = {
                items: itemss
            }
            // console.log(addCart,'to db')
            this.$firestoreApp.collection('CartItems').add(addCart)
            .then((ref) =>{
                // console.log(ref.id, 'ref id')
                let dbKey = ref.id
                this.$q.localStorage.set(key, dbKey)
                console.log('updated key', this.$q.localStorage.getItem(key))
            })    
        } else {
            let basis
            if(uid != ''){
                basis = uid
            } else {
                basis = value
            }

            console.log(itemss,'to push no local')  
            let itemss = []
            let cartItems = this.$lodash.filter(this.CartItems, a=>{
                return a['.key'] == basis
            })

            console.log(cartItems[0].items,'cartItema')
            if(cartItems[0].items !== undefined){
                itemss = cartItems[0].items
            }
            

            let indexing = this.$lodash.findIndex(itemss,a=>{
                return a.checkerName == order.checkerName
            })
            // console.log(indexing,'indexing')
            if(indexing > -1){
                itemss[indexing].qty = parseInt(itemss[indexing].qty) + parseInt(order.qty)
            } else {
                itemss.push(order) 
            }

            let addCart = {
                items: itemss
            }

            this.$firestoreApp.collection('CartItems').doc(basis).set(addCart)
            .then((ref) =>{
                console.log('cart updated')
            })    
        }
        
    },
    firstCart(props,sizeQty,uid){
        let order = {...props}
        order.size = sizeQty.label
        order.price = sizeQty.price
        order.min = sizeQty.paxMin
        order.max = sizeQty.paxMax
        order.qty = sizeQty.qty
        order.checkerName = order.foodName+'_'+sizeQty.label
        delete order.partyTrayPrice
        let key = 'addCart'
        let itemss = []

        itemss.push(order)

        console.log(itemss,'to push no local firstCart')  
        let addCart = {
            items: itemss
        }
        if(uid != ''){
            this.$firestoreApp.collection('CartItems').doc(uid).set(addCart)
            .then((ref) =>{
            // console.log(ref.id, 'ref id')
                // location.reload()
                this.$q.localStorage.clear()
            }) 
        } else {
            this.$firestoreApp.collection('CartItems').add(addCart)
                .then((ref) =>{
                // console.log(ref.id, 'ref id')
                    let dbKey = ref.id
                    this.$q.localStorage.set(key, dbKey)
                    console.log('updated key', this.$q.localStorage.getItem(key))
                    location.reload()
                }) 
        }

    },
    returnStatus(size){
        // console.log(size)
        // console.log(this.pOrderSelected,'asd')
        let index = this.$lodash.findIndex(this.pOrderSelected,a=>{
            return a == size
        })
        // console.log(index)
        if(index > -1){
            return true
        } else {
            return false
        }
    },
    findIndexSelection(arr,val){
        return this.$lodash.findIndex(arr,val)
    },
    checkIfRemoved(category){
        var index = this.findIndexSelection(this.pOrderSelected,category.label)
        if(index == -1){
            delete this.orderQty[category.label]
            // console.log(this.orderQty,'this.orderQty')
        }
    },
  }
}
</script>