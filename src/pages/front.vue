<template>
<q-page>
        <div class="row">
<!-- LEFT PART -->
        <div class="q-pa-sm q-pt-lg q-pl-xl">
            <p style="font-size:60px;font-family: 'Domine', serif;padding:0;margin:0;line-height:60px">A taste of local organ<br> & seasonal flavours</p>
            <p class="q-pt-md" style="font-size:18px;font-family: 'Noto Serif SC', serif;">Whether you're in the mood for a 'small' poutine or a 'big' salad, 'just <br>one' beer or a double shot espresso, when it satisfies your tastebuds. </p>
            <!-- BUTTON FOR PARTYTRAY -->
            <div class="q-pa-sm q-pt-md">
             <q-btn style="background-color:#e4acbf;width:280px;height:50px" @click="$router.push('/partytray')" text-color="white" label="PARTY TRAY" />
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