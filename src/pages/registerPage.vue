<template>
    <q-page class="flex flex-center">
        <div class="container text-center">
            <div class="text-h6 text-grey-8 q-mb-md">Create Account</div>
            <q-stepper
                v-model="step"
                ref="stepper"
                color="pink-3"
                active-color="pink-3"
                done-color="teal"
                animated
                :flat="$q.platform.is.mobile || $q.platform.is.cordova"
                contracted=""
                :style="$q.platform.is.mobile || $q.platform.is.cordova ? 'width:90vw' : 'width:50vw'"
            >
                <q-step
                    :name="1"
                    title="Select campaign settings"
                    icon="settings"
                    :done="step > 1"
                >
                    <q-input v-model="registerName" type="text" label="Enter Full Name" class="q-pa-sm q-px-md" outlined="" color="orange-7" :dense="$q.platform.is.mobile"/>
                    <q-input v-model="registerEmail" type="email" label="Enter Email Address" class="q-pa-sm q-px-md" outlined="" color="orange-7" :dense="$q.platform.is.mobile"/>
                    <q-input v-model="registerPassword" type="password" label="Enter Password" class="q-pa-sm q-px-md" outlined="" color="orange-7" :dense="$q.platform.is.mobile"/>
                    <q-input v-model="registerConfirmPassword" type="password" label="Confirm Password" class="q-pa-sm q-px-md" outlined="" color="orange-7" :dense="$q.platform.is.mobile"/>                    
                
                </q-step>
                <q-step
                    :name="2"
                    title="Create an ad group"
                    caption="Optional"
                    icon="create_new_folder"
                    :done="step > 2"
                >
                    <div v-if="returnType == 'pending'">
                        <div class="text-h6">Please verify your email <span class="text-orange-7">{{registerEmail}}</span>.</div>
                        <div>We have sent an verification email to your email.</div>
                        <div class="q-mt-md q-gutter-md">
                            <q-btn color="grey-10" icon-right="email" label="Resend Email" @click="resendEmail" />
                            <q-btn flat color="grey-10" icon="check" label="click here if you already verified your email" @click="clickThis" />
                        </div>
                    </div>
                    <div v-else>
                        <div class="text-h6">Your email <span class="text-orange-7">{{registerEmail}} </span> has been verified.</div>
                        <div>Go to our home page to start with your event reservation and party tray orders.</div>
                        <div class="row q-mt-md">
                            <q-btn color="grey-10" icon-right="house" label="home" @click="$router.push('/')" />
                        </div>            
                    </div>
                </q-step>
                <template v-slot:navigation>
                    <q-stepper-navigation>
                         <q-btn v-if="step > 1" flat color="grey-8" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" v-show="step !== 2 " />
                        <q-btn @click="registerUser" color="pink-3" v-show="step !== 2" :label="step === 2 ?'Finish' : 'Continue'" :loading="loadingButton"/>
                       
                    </q-stepper-navigation>
                </template>
            </q-stepper>
            <q-btn color="grey-10" icon="arrow_left" label="back to login" @click="$router.push('/login')" class="q-mt-md" v-show="$q.platform.is.cordova"/>
        </div>
    </q-page>
</template>
<script>
export default {
    data(){
        return {
            step: 1,
            registerName: '',
            registerEmail:'',
            registerPassword: '123456',
            registerConfirmPassword: '123456',
            userLogged: this.$firebase.auth().currentUser,
            loadingButton: false,
        }
    },
    created(){

        let self = this
        this.$firebase.auth().onAuthStateChanged(function(user) {
            if(user.emailVerified){
                if(self.$q.platform.is.cordova){
                    self.$router.push('/mobilehome')
                } else {
                    self.$router.push('/')
                }
            } else {
                self.step = 2
            }            //if mobile screen $q.screen.lt.sm 
        })
 
    },
    computed:{
        returnType(){
            try {
                
                let user = this.userLogged
                if(user.emailVerified){
                    this.type = 'verified'
                } else {
                    this.type = 'pending'
                }     
                return this.type          
            } catch (error) {
                console.log(error,'returnType')
                return 'pending'
            }
        },
    },
    methods:{
        registerUser(){
            try {
                if(this.registerEmail == '' || this.registerName == '' || this.registerPassword == '' || this.registerConfirmPassword == ''){
                this.$q.dialog({
                    title: `Fill up all required fields`,
                    type: 'negative',
                    color: 'orange-7',
                    class: 'text-grey-8',
                    icon: 'warning',
                    ok: 'Ok',
                    persistent: true
                    
                }).onOk(()=>{
                    
                })
                } else {

                if(this.registerPassword !== this.registerConfirmPassword){
                    this.$q.dialog({
                        title: `Password does not match`,
                        type: 'negative',
                        color: 'orange-7',
                        class: 'text-grey-8',
                        icon: 'warning',
                        ok: 'Ok',
                        persistent: true
                        
                    }).onOk(()=>{
                    this.registerPassword = ''
                    this.registerConfirmPassword = ''
                    
                    })
                } else {
                    
                    let vm = this
                    vm.loadingButton = true
                    this.$firebase.auth().createUserWithEmailAndPassword(this.registerEmail, this.registerPassword)
                    .then((res)=>{
                    console.log(res,'result')
                    let user = this.$firebase.auth().currentUser
                    user.sendEmailVerification().then(function() {
                        console.log('email sent')
                        
                        let newUser = {
                            gAccessToken: '',
                            displayName: vm.registerName,
                            email: vm.registerEmail,
                            emailVerified: user.emailVerified,
                            refreshToken: user.refreshToken
                        }     

                        vm.$firestoreApp.collection('Customers').doc(user.uid).set(newUser)
                        .then(()=>{
                            user.updateProfile({
                                displayName: vm.registerName,
                            })
                            vm.loadingButton = false
                            vm.$refs.stepper.next()                 
                            console.log('saved user')
                            console.log('newUser',newUser)  
                        })
                        .catch((error)=>{
                        console.log(error,'error saving registrants')
                        })

                    }).catch(function(error) {
                        console.log(error,'error email')
                    });
                    })
                    .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode,'error')
                    console.log(errorMessage,'error')
                    self.$q.dialog({
                        title: errorCode,
                        message: errorMessage,
                        type: 'negative',
                        color: 'orange-7',
                        class: 'text-grey-8',
                        icon: 'warning',
                        ok: 'Ok',
                        persistent: true
                        
                    }).onOk(()=>{
                        
                    })                
                    // ...
                    });


                }

                }
        
            } catch (error) {
                console.log(error,'registerUser')
                console.log('error',errorCode)
                console.log('error',errorMessage)
                this.$q.dialog({
                    title: errorCode,
                    message: errorMessage,
                    color: 'pink-6',
                    textColor: 'grey',
                    icon: 'negative',
                    ok: 'Ok'
                })
            }
        },        
        clickThis(){
            if(this.$firebase.auth().currentUser == null){
                this.$q.dialog({
                    title: 'Do Not Click Error',
                    type: 'negative',
                    color: 'warning',
                    class: 'text-grey-8',
                    icon: 'warning',
                    ok: 'Ok',
                    persistent: true
                    
                }).onOk(()=>{

                })
            } else {
                this.$firebase.auth().currentUser.reload()
                let user = this.$firebase.auth().currentUser
                console.log(user,'user reload')
                if(user.emailVerified == false){
                this.$q.dialog({
                    title: 'Email still not verified',
                    message: 'Try resending the verification email',
                    type: 'negative',
                    color: 'orange-7',
                    class: 'text-grey-8',
                    icon: 'warning',
                    ok: 'Ok',
                    persistent: true
                    
                }).onOk(()=>{
                })                  
                } else {
                    this.userLogged = user
                    this.type = 'verified'
                }
            }

        },
        resendEmail(){
            var user = this.$firebase.auth().currentUser;
            user.sendEmailVerification().then(function() {
                  console.log('email sent')
            })
        },        
    }
}
</script>