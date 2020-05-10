import Vue from 'vue';
import ComponentA from './ComponentA.vue';

new Vue({
  el: '#component_b',
  render: h => h(ComponentA, {props: {message: 'I am B'}}),
});
