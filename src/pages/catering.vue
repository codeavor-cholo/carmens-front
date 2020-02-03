<template>
<q-page>
      <div class="row">
<!-- LEFT PART -->
        <div class="q-pa-sm q-pt-lg q-pl-xl">
            <p style="font-size:60px;font-family: 'Domine', serif;padding:0;margin:0;line-height:60px">A taste of local organ<br> & seasonal flavours</p>
            <p class="q-pt-md" style="font-size:18px;font-family: 'Noto Serif SC', serif;">Whether you're in the mood for a 'small' poutine or a 'big' salad, 'just <br>one' beer or a double shot espresso, when it satisfies your tastebuds. </p>
            <!-- BUTTON FOR PARTYTRAY -->
            <div class="q-pa-sm q-pt-md">
             <q-btn style="background-color:#e4acbf;width:280px;height:50px" @click="$router.push('/cateringpage')" text-color="white" label="CATERING SERVICES" />
            </div>
            <div class="q-pa-md q-pt-xl" style="font-size:20px;font-family: 'Noto Serif SC', serif;"><b>Our Hot Offers</b></div>
            
            <div class="row q-gutter-md">
                <q-card flat class="my-card" style="width:180px;height:185px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section>
                <div><b>Breakfast Food</b></div>
                <div class="text-subtitle2">20 items</div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:180px;height:185px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section>
                <div><b>Lunch Food</b></div>
                <div class="text-subtitle2">15 heads</div>
                </q-card-section>
                </q-card> 

                <q-card flat class="my-card" style="width:180px;height:185px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section>
                <div><b>Dinner Food</b></div>
                <div class="text-subtitle2">40 items</div>
                </q-card-section>
                </q-card>   
            </div>      
        </div>       
<!-- END OF LEFT PART -->
<!-- RIGHT PART -->
        <div class="q-pa-sm q-pt-lg q-pl-xl">
          <div class="row q-gutter-md q-pt-sm">
            
            <div>
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

            <div>
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
        </div>
<!-- END OF RIGHT PART -->

      </div>

</q-page>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>