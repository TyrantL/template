import Vue from 'vue';
import { Toast } from 'vant';

[Toast].forEach(plugin => {
  Vue.use(plugin);
});
