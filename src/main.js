import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuelidate from "vuelidate";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import locale from 'element-ui/lib/locale/lang/en';



require('@/assets/css/style.css');
require('@/assets/vendors/feather/feather.css');
require('@/assets/vendors/ti-icons/css/themify-icons.css');
require('@/assets/vendors/css/vendor.bundle.base.css');
require('@/assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css');
require('@/assets/vendors/ti-icons/css/themify-icons.css');
require('@/assets/js/select.dataTables.min.css');

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
