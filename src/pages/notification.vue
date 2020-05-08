<template>
    <q-page id="page">
        <div id="noti" class="text-weight-bold">
            Notifications
        </div>

        <div id="list">
            <q-list bordered separator>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <div id="row" class="row items-center justify-between">
                            <div>
                                <q-chip color="pink-3" text-color="white">
                                    Catering
                                </q-chip>
                            </div>
                            <div>
                                Date
                            </div>
                        </div>
                        <div id="eve">Event Name</div>
                        <div>Status of your reservation.</div>
                        <q-item-label class="text-blue" caption>3 hours ago.</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                    <q-item-section>
                        <div id="row" class="row items-center justify-between">
                            <div>
                                <q-chip color="pink-3" text-color="white">
                                    Party Tray
                                </q-chip>
                            </div>
                            <div>
                                Date
                            </div>
                        </div>
                        <div id="eve">Food Names</div>
                        <div id="eve">Food Names</div>
                        <div id="eve">Food Names</div>
                        <div>Status of your order.</div>
                        <q-item-label class="text-blue" caption>3 hours ago.</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </q-page>
</template>

<style type = "text/css">
    /* #page {
        padding-top:50px;
    } */
    #noti {
        font-size:30px;
        padding-left:10px;
        padding-bottom:10px;
        padding-top:50px;
    }
    #eve {
        font-size:17px;
        font-weight: bold;
    }
    #row {
        padding-right:25px;
    }

@media only screen and (min-width: 1200px) {
  #noti {
      padding-top:85px;
      padding-bottom:20px;
      font-size:30px;
      padding-left:350px;
  }
  #list{
      padding-left:350px;
      padding-right:350px;
  }
}

</style>