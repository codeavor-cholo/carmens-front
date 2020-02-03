<template>
    <q-page>
      <div class="row justify-around">  
        <div class=" col-5 q-pa-xl q-pl-xl">
            <p class="q-pa-sm" style="font-size:60px;font-family: 'Domine', serif;padding:0;margin:0;line-height:50px">CATERING<br>SERVICES</p>
            <p class="q-pt-md q-pa-sm" style="color:#e4acbf;font-size:18px;font-family: 'Noto Serif SC', serif;"><i>Avail our budget friendly catering packages for</i><br><i>your special life events.</i></p>
            <p class="q-pa-sm" style="font-size:15px;font-family: 'Noto Serif SC', serif;">Fill up our reservation form to get a free quotation</p>
        </div>
        <div class="col-5 q-pa-xl">
             <q-card flat class="my-card">
                <q-card-section>
                    <div class="column items-center q-pa-sm q-pb-lg" style="font-size:20px"><b>RESERVATION FORM</b></div>
                    <div class="column q-gutter-lg">
                    <q-input dense filled v-model="name" label="Event Name" />
                    <q-input dense filled v-model="pax" label="Number of Head" />
                    </div>
                    <div class="q-pa-sm q-pt-lg column items-center">
                    <q-btn dense style="background-color:#e4acbf;width:250px" text-color="white" @click="$router.push('/reservation')" label="PROCEED TO PACKAGES" />
                    </div>
                </q-card-section>
             </q-card>
        </div>    
      </div>  

      <div>
          <div class="row q-pt-lg">
            <div style="color:#e4acbf;font-size:20px;font-family: 'Domine', serif;padding-left:110px">FOOD CHOICES</div>
            <div class="row q-gutter-md q-pl-xl">
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
                </div>
                </q-card-section>
                </q-card>   
            </div>       
        </div>

        <div class="row q-pt-lg">
            <div class="row q-gutter-md q-pl-xl" style="padding-left:310px">
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
                </div>
                </q-card-section>
                </q-card>   
            </div>       
        </div>

        <div class="row q-pa-sm q-pt-xl q-gutter-lg">
            <div style="color:#e4acbf;font-size:20px;font-family: 'Domine', serif;padding-left:110px">PACKAGES</div>
            <div class="q-pl-xl">
            <q-card class="my-card" style="width:300px">
                <q-card-section class="column items-center">
                  <div style="font-size:50px;color:#E4ACBF;font-family: 'Zhi Mang Xing', cursive;">The Paradise</div>
                  <div style="font-size:15px"><b>CATERING MENU</b></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>STARTER</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Lentif Salad with Cumin and Garlic</i></div>
                  <div style="font-size:12px"><i>Tabbouich with Mint and Parsier Puree</i></div>
                  <div style="font-size:12px"><i>Bobo Ghanoush with Pita Bread</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>ENTREE</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Chicken Souviaki with Tzatziki Sauce</i></div>
                  <div style="font-size:12px"><i>Beef Falafel with Walnuts and Red Pepper</i></div>
                  <div style="font-size:12px"><i>Chickpea Stew with Saffron and Roasted Onions</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>DESSERT</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Turkish Delight Cheesecake</i></div>
                  <div style="font-size:12px"><i>Semolina Almond-Anis Tea Cake</i></div>
                  <div style="font-size:12px"><i>Knafeh with Orange Blossom Syrup</i></div>
                </q-card-section>
              </q-card>
            </div>

              <q-card class="my-card" style="width:300px">
                <q-card-section class="column items-center">
                  <div style="font-size:50px;color:#E4ACBF;font-family: 'Zhi Mang Xing', cursive;">The Paradise</div>
                  <div style="font-size:15px"><b>CATERING MENU</b></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>STARTER</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Lentif Salad with Cumin and Garlic</i></div>
                  <div style="font-size:12px"><i>Tabbouich with Mint and Parsier Puree</i></div>
                  <div style="font-size:12px"><i>Bobo Ghanoush with Pita Bread</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>ENTREE</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Chicken Souviaki with Tzatziki Sauce</i></div>
                  <div style="font-size:12px"><i>Beef Falafel with Walnuts and Red Pepper</i></div>
                  <div style="font-size:12px"><i>Chickpea Stew with Saffron and Roasted Onions</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>DESSERT</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Turkish Delight Cheesecake</i></div>
                  <div style="font-size:12px"><i>Semolina Almond-Anis Tea Cake</i></div>
                  <div style="font-size:12px"><i>Knafeh with Orange Blossom Syrup</i></div>
                </q-card-section>
              </q-card>
            
            <q-card class="my-card" style="width:300px">
                <q-card-section class="column items-center">
                  <div style="font-size:50px;color:#E4ACBF;font-family: 'Zhi Mang Xing', cursive;">The Paradise</div>
                  <div style="font-size:15px"><b>CATERING MENU</b></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>STARTER</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Lentif Salad with Cumin and Garlic</i></div>
                  <div style="font-size:12px"><i>Tabbouich with Mint and Parsier Puree</i></div>
                  <div style="font-size:12px"><i>Bobo Ghanoush with Pita Bread</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>ENTREE</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Chicken Souviaki with Tzatziki Sauce</i></div>
                  <div style="font-size:12px"><i>Beef Falafel with Walnuts and Red Pepper</i></div>
                  <div style="font-size:12px"><i>Chickpea Stew with Saffron and Roasted Onions</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:15px"><b>DESSERT</b></div>
                  <div class="q-pt-sm" style="font-size:12px"><i>Turkish Delight Cheesecake</i></div>
                  <div style="font-size:12px"><i>Semolina Almond-Anis Tea Cake</i></div>
                  <div style="font-size:12px"><i>Knafeh with Orange Blossom Syrup</i></div>
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
      name: '',
      pax: ''
    }
  }
}
</script>