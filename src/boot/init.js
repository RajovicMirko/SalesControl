import Vue from 'vue';

import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.prototype.$eventBus = new Vue();

import { getComponent } from 'components/componentMap';
Vue.prototype.$getComponent = (cmp) => getComponent(cmp);

import { responsiveControl } from '../jsScripts/resizeWindow';
Vue.prototype.$reponsiveControl = responsiveControl.apply(null, [ Vue.prototype ]);

import { formatDate } from '../jsScripts/formatDate';
Vue.prototype.$formatDate = formatDate;

import { dialog } from '../jsScripts/dialogPlg';
Vue.prototype.$dialog = dialog;
