<template>
<q-page class="q-py-md">

        <!-- <div class="fixed-center" v-show="splashscreen">
          <div class="q-pa-sm" >
              <img class="col" style="width:350px;height:100%" src="statics/pics/carmen-logo.png">
          </div>

          <div class="row justify-center">
          <q-spinner-hourglass
            color="primary"
            size="4em"
          />
          <q-tooltip :offset="[0, 8]">QSpinnerBall</q-tooltip>
          </div>
        </div> -->

<!-- <div v-show="!splashscreen"> -->
<!-- PARTY TRAY PART -->
        <div class="q-pt-xl">
            <p class="q-px-md text-weight-bold" style="font-size:28px;font-family: 'Domine', serif;">A taste of local organ<br> & seasonal flavours</p>
            <p class="q-px-md" style="font-size:15px;font-family: 'Noto Serif SC', serif;">Whether you're in the mood for a 'small' poutine or a 'big' salad, 'just one' beer or a double shot espresso, when it satisfies your tastebuds. </p>
            <!-- BUTTON FOR PARTYTRAY -->
            <div class="q-px-md text-center">
             <q-btn class="full-width" style="background-color:#e4acbf;height:40px" @click="$router.push('/partytray')" text-color="white" label="PARTY TRAY" />
            </div>
            <div class="q-pa-md q-pt-lg" style="font-size:20px;font-family: 'Noto Serif SC', serif;"><b>Our Hot Offers</b></div>
            
            <div class="q-px-md row q-gutter-lg">
                <q-card flat class="my-card" style="width:150px;height:170px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section>
                <div><b>Breakfast Food</b></div>
                <div class="text-subtitle2">20 items</div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:150px;height:170px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section>
                <div><b>Breakfast Food</b></div>
                <div class="text-subtitle2">20 items</div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:150px;height:170px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section>
                <div><b>Breakfast Food</b></div>
                <div class="text-subtitle2">20 items</div>
                </q-card-section>
                </q-card>

                <q-card flat class="my-card" style="width:150px;height:170px">
                <img src="statics/pics/foo.jpeg">
                <q-card-section>
                <div><b>Breakfast Food</b></div>
                <div class="text-subtitle2">20 items</div>
                </q-card-section>
                </q-card>

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

        <div class="row q-pa-sm q-pt-md q-gutter-sm">
             <q-card class="my-card" style="width:165px">
                <q-card-section class="column items-center">
                  <div style="font-size:30px;color:#E4ACBF;font-family: 'Zhi Mang Xing', cursive;">The Paradise</div>
                  <div style="font-size:12px"><b>CATERING MENU</b></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:12px"><b>STARTER</b></div>
                  <div class="q-pt-sm" style="font-size:11px"><i>Lentif Salad with Cumin</i></div>
                  <div style="font-size:11px"><i>Tabbouich with Mint</i></div>
                  <div style="font-size:11px"><i>Bobo Ghanoush</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:12px"><b>ENTREE</b></div>
                  <div class="q-pt-sm" style="font-size:11px"><i>Chicken Souviaki</i></div>
                  <div style="font-size:11px"><i>Beef Falafel with Walnuts</i></div>
                  <div style="font-size:11px"><i>Chickpea Stew with Saffron</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:12px"><b>DESSERT</b></div>
                  <div class="q-pt-sm ellipsis" style="font-size:11px"><i>Turkish Delight Cheesecake</i></div>
                  <div class="ellipsis" style="font-size:11px"><i>Semolina Almond-Anis</i></div>
                  <div style="font-size:11px"><i>Knafeh with Orange</i></div>
                </q-card-section>
              </q-card>

              <q-card class="my-card" style="width:165px">
                <q-card-section class="column items-center">
                  <div style="font-size:30px;color:#E4ACBF;font-family: 'Zhi Mang Xing', cursive;">The Paradise</div>
                  <div style="font-size:12px"><b>CATERING MENU</b></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:12px"><b>STARTER</b></div>
                  <div class="q-pt-sm" style="font-size:11px"><i>Lentif Salad with Cumin</i></div>
                  <div style="font-size:11px"><i>Tabbouich with Mint</i></div>
                  <div style="font-size:11px"><i>Bobo Ghanoush</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:12px"><b>ENTREE</b></div>
                  <div class="q-pt-sm" style="font-size:11px"><i>Chicken Souviaki</i></div>
                  <div style="font-size:11px"><i>Beef Falafel with Walnuts</i></div>
                  <div style="font-size:11px"><i>Chickpea Stew with Saffron</i></div>
                  <div class="q-pt-lg" style="color:#E4ACBF;font-size:12px"><b>DESSERT</b></div>
                  <div class="q-pt-sm ellipsis" style="font-size:11px"><i>Turkish Delight Cheesecake</i></div>
                  <div class="ellipsis" style="font-size:11px"><i>Semolina Almond-Anis</i></div>
                  <div style="font-size:11px"><i>Knafeh with Orange</i></div>
                </q-card-section>
              </q-card>      
            </div>
<!-- END OF CATERING PART -->
<!-- </div> -->
</q-page>
</template>

<script>
export default {
  data () {
    return {
      splashscreen: true,
    }
  },
  created() {
    setTimeout(() => {
          this.splashscreen=false;
          // console.log('sdf')
          }, 5000)
  }
}
</script>