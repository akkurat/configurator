<template>
  <div>
    <h1>{{option.caption}}</h1>
    <div >

      <div v-if="message" class="message">{{message}}</div>
      <div v-for="value in option.values" :key="value.id" >
        <input
          @change="$emit('change', value.id)"
          type="radio"
          :name="'option'+option.id"
          :id="option.id+'_'+value.id"
          v-bind:value="valueid"
          :checked="valueid==value.id"
          :disabled="value.disabled"
        />
        <label :for="option.id+'_'+value.id">{{option.id+'_'+value.id + ' ' + value.caption}}</label>
        <div>{{option.message}}{{value.exclusions}}</div>
        
      </div>
    </div>
    {{valueid}}
  </div>
</template>

<script>
export default {
  props: ["option", "valueid", "message" ],
  methods: {}
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
</style>