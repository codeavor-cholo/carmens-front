<template>
<q-page>
        <div>
            <div class="row q-gutter-md">
            <div class="q-pa-md q-pl-xl" style="font-size:60px;font-family: 'Domine', serif;padding-left:130px">PARTY TRAYS</div>
            <div class="row items-center q-pa-sm" style="padding-left:120px">
            <q-input dense style="width:400px" rounded standout v-model="search" label="Search" />
            </div>
            <div class="row items-center">
            <q-btn-dropdown dense label="filter by">
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
            <div style="font-size:20px;font-family: 'Domine', serif;padding-left:130px">MOST POPULAR</div>
            <div class="row q-gutter-md q-pl-lg">
                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn dense round size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn round dense size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn round dense size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn round dense size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn dense round size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn dense round size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>   
            </div>       
        </div>

        <div class="row justify-center q-pa-lg" style="font-size:20px;font-family: 'Domine', serif"> OUR FOOD SELECTION </div>
<!-- FOOD CATERGORY -->
        <div class="row">
            <div style="font-size:20px;font-family: 'Domine', serif;padding-left:130px">FOOD CATEGORY</div>
            <div class="row q-gutter-md q-pl-md">
                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn dense round size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn round dense size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn round dense size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn round dense size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn dense round size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn dense round size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>   
            </div>       
        </div>

        <!-- SECOND FOOD CATEGORY -->
        <div class="row q-pt-lg">
            <div style="font-size:20px;font-family: 'Domine', serif;padding-left:130px">FOOD CATEGORY</div>
            <div class="row q-gutter-md q-pl-md">
                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn dense round size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn round dense size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn round dense size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn round dense size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn dense round size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:140px;height:165px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section align="left" style="margin:3px;padding:1px">
                <div class="row">
                <div class="column">       
                <div class="q-pt-sm">     
                <b>Breakfast Food</b>
                </div>
                <div class="text-subtitle2">20 items</div>
                </div>
                <div class="col q-py-sm q-pl-sm" style="margin:0">
                <q-btn dense round size="md" text-color="pink-3" flat icon="shopping_cart" />
                </div>
                </div>
                </q-card-section>
                </q-card>   
            </div>       
        </div>
        
</q-page>
</template>


<script>
export default {
  data () {
    return {
      search: ''
    }
  }
}
</script>