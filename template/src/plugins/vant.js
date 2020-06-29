import Vue from 'vue';
import { Toast, Popup, Grid, GridItem } from 'vant';

[Toast, Popup, Grid, GridItem].forEach(plugin => {
  Vue.use(plugin);
});
