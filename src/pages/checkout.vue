<template>
    <q-page>
        <div class="container row q-gutter-md q-pt-xl">
        
        <div class="col-4 q-pl-xl">
            <q-card class="my-card" style="border: 5px solid;border-color: pink;">
                <q-card-section class="bg-grey-3"> 
                <div class="row q-gutter-sm items-center">
                <q-icon name="shopping_cart" class="text-black" color="pink" style="font-size: 3rem;" />
                <div class="text-h4">Basket Summary</div>
                </div>
            </q-card-section>
            <!-- <q-separator color="black" /> -->
            <q-card-section>
                <div class="q-pt-sm">
                <q-list separator>
                    <q-item>
                    <q-item-section>
                        <div class="row q-gutter-md">
                        <img src="statics/pics/foo.jpeg" style="height:50px;width:50px">
                        <div class="column">
                            <q-item-label>FOODNAME</q-item-label>
                            <q-item-label caption lines="1">size</q-item-label>
                            <q-item-label class="text-subtitle2" lines="1">₱ price</q-item-label>
                        </div>
                        </div>
                    </q-item-section>
                    <q-item-section side>
                    <q-item-label caption class="q-mt-lg">x 1</q-item-label>
                    <q-item-label lines="1" class="text-subtitle2 text-pink-6 text-weight-bold">₱ price</q-item-label>
                    </q-item-section>
                    </q-item>

                    <q-separator color="black" />

                    <q-item>
                    <q-item-section>
                        <div class="row q-gutter-md">
                        <img src="statics/pics/foo.jpeg" style="height:50px;width:50px">
                        <div class="column">
                            <q-item-label>FOODNAME</q-item-label>
                            <q-item-label caption lines="1">size</q-item-label>
                            <q-item-label class="text-subtitle2" lines="1">₱ price</q-item-label>
                        </div>
                        </div>
                    </q-item-section>
                    <q-item-section side>
                    <q-item-label caption class="q-mt-lg">x 1</q-item-label>
                    <q-item-label lines="1" class="text-subtitle2 text-pink-6 text-weight-bold">₱ price</q-item-label>
                    </q-item-section>
                    </q-item>
                </q-list>

                </div>
            </q-card-section>

            <q-separator color="black" />
            
            <div class="row justify-end q-pa-md">
                <div>Sub Total:</div>
                <div class="q-pl-sm"><b>TOTAL</b></div>
            </div>
            </q-card>
        </div>
        
        <div class="col-7">
            <q-card class="my-card">
                 <q-stepper
                    v-model="step"
                    ref="stepper"
                    color="pink-4"
                    active-color="pink-3" inactive-color="grey-8"
                    animated
                    >
                    <q-step
                        :name="1"
                        title="Customer Details"
                        icon="settings"
                        :done="step > 1"
                    >
                        <div class="text-h5">Please fill-up all the details below </div>

                        <div class="column q-gutter-sm q-pt-md">
                            <div class="row">
                                <div class="col q-pr-sm"><q-input dense outlined v-model="fname" color="pink-3" label="First Name" /></div>
                                <div class="col q-pl-sm"><q-input dense outlined v-model="lname" color="pink-3" label="Last Name" /></div>
                            </div>
                            <q-input 
                            dense outlined v-model="cnum"  
                            mask="(###) ### - ####"
                            fill-mask
                            color="pink-3" 
                            label="Contact Number" />
                            <q-input dense color="pink-3" outlined v-model="address" label="Address" />
                            <q-select dense color="pink-3" outlined v-model="model" label="Select City" />
                        </div>
                    </q-step>

                    <q-step
                        :name="2"
                        title="Payment Details"
                        icon="credit_card"
                        :done="step > 2"
                    >
                    <div class="row">
                        <div class="bg-grey-3 q-pa-md col">
                            <div class="text-h5 text-weight-bold">Order Summary</div>
                            <div class="q-pl-md row q-gutter-sm items-center q-pt-sm">
                                <q-icon name="place" class="text-black" color="pink" style="font-size: 1.5rem;" />
                                <div class="text-weight-medium">Delivery Address</div>
                            </div>
                            <div class="row q-gutter-md q-pt-md">
                                <div class="q-pl-xl">First Name</div>
                                <div>Number</div>
                            </div>
                            <div class="q-pl-xl">Full Address Here</div>
                        </div>    
                        
                        <div class="col q-pl-md">    
                            <q-input
                            v-model="message"
                            filled
                            dense
                            type="textarea"
                            class="bg-white"
                            label="Leave your message here."
                            />

                            <div class="q-pt-md q-pb-sm text-center text-weight-bold">Payment Method</div>
                            <div class="row q-gutter-md justify-center">
                            <q-btn color="pink-5" label="Cash" style="width:150px" />
                            <q-btn color="pink-5" label="Card" style="width:150px" />
                        </div>    
                    </div>    
                </div>  
                    </q-step>

                    <template v-slot:navigation>
                        <q-stepper-navigation>
                        <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
                        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                        </q-stepper-navigation>
                    </template>
                    </q-stepper>
            </q-card>
        </div>
        </div>

    </q-page>    
</template>     

<script>
export default {
    data () {
        return {
            step: 1
        }
    }
}
</script>