import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { StripeElements } from 'vue-stripe-checkout';

export default async ({ Vue }) => {
    Vue.prototype.$axios = axios
    Vue.prototype.$moment = moment
    Vue.prototype.$lodash = _
    Vue.use(StripeElements)
}
