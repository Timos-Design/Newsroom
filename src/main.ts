import LottieAnimation from 'lottie-vuejs';
import Vue from 'vue';
import Vuement from 'vuement';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { formatTimestamp } from './utils/functions';

Vue.config.productionTip = false;
Vue.prototype.$fmt = formatTimestamp;

Vue.use(Vuement, {
  colors: { primary: '#08f' },
});
Vue.use(LottieAnimation);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
