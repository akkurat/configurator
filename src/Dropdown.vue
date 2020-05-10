<template>
  <div>
    <h1>{{option.caption}}</h1>
    <div >

      <div v-if="exclusions&&exclusions.length" class="message">{{exclusions}}</div>
      <div v-for="value in option.values" :key="value.id" :class="isExcludedNow(value)?'disabled':''">
        <input
          :id="option.id+'_'+value.id"
          type="radio"
          :name="'option'+option.id"
          :value="value.id"
          @change="$emit('change', value.id)"
          :checked="value.id==selectedValue.id"
          :disabled="isExcludedNow(value)"
        />
        <label :for="option.id+'_'+value.id">{{option.id+'_'+value.id + ' ' + value.caption}}</label>
        <div>{{option.message}}{{value.exclusions}}</div>
        
      </div>
    </div>
    {{selectedValue}}
  </div>
</template>

<script>
import { fromStringKey } from './ComponentA.vue';
export default {
  props: ["option", "values", "exclusions" ],
  methods: {
    isExcludedNow: function(optionValue) {
      if(optionValue.exclusions && optionValue.exclusions.length) {
        for( const exclusion of optionValue.exclusions ) {
          const [oId, vId] = fromStringKey(exclusion)
          if(this.values[oId].id == vId) {
            return true;
          }
        }
      }
      return false;
    }
  },
  computed: {
    selectedValue: function() {
      return this.values[this.option.id];
    }

  }
};
export class OptionValue {
  /**
   * @param {number} id
   * @param {string} caption
   */
  constructor(id, caption) {
    this.id = id;
    this.caption = caption;
    this.disabled = false;
    this.message = "";
  }
}

/**
 *
 */
export class Option {
  /**
   * @param {number} id
   * @param {string} caption
   * @param {OptionValue[]} values
   */
  constructor(id, caption, values, defaultValueId) {
    this.id = id;
    this.caption = caption;
    this.values = values;
    this.defaultValueId = defaultValueId;
  }
}
</script>
<style scoped>
.message {
  border: 1px solid red
}
.disabled {
  color: blue;
  background-color: chartreuse;
}
</style>