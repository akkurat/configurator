<template>
  <div>
    <h1>{{option.caption}}</h1>
    <div>
      <div v-if="allMessages" class="message" v-html="allMessages"></div>

      <select :id="'select_'+option.id" :name="'option'+option.id" v-model="val">
        <option
          v-for="value in option.values"
          :key="value.id"
          :id="option.id+'_'+value.id"
          :value="value.id"
          :disabled="isExcludedNow(value)"
          :data-test="isExcludedNow(value)"
        >{{option.id+'_'+value.id + ' ' + value.caption}}</option>

      </select>
    </div>
    {{selectedValue}}
  </div>
</template>

<script>
export default {
  props: ["option", "values", "exclusions", 'isExcludedNow'],
  methods: {
    emitChange(ev) {
      this.$emit("change", ev.currentTarget.value);
    }
  },
  computed: {
    selectedValue: function() {
      return this.values[this.option.id];
    },
    val: {
      get() {
        return this.values[this.option.id].id;
      },
      set(val) {
        this.$emit("change", val);
      }
    },
    allMessages: function() {
      let out =""
      for( const value of this.option.values)
      {
        const message = this.isExcludedNow(value)
        if( message ) {
          out += message
        }
      }
      return out
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
  }
  /**
   * 
   * @param {Option} parent
   */
  setParent(parent) {
    this.parent = parent
  }
  toString() {
    let returnValue = this.id + ':' + this.caption
    if(this.parent) {
      returnValue = this.parent + "/" + returnValue
    }
    return returnValue
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
    this.values.forEach( v => v.setParent(this))
    this.defaultValueId = defaultValueId;
  }
  toString() {
    return this.id + ':' + this.caption
  }
}
</script>
<style scoped>
.message {
  border: 1px solid red;
}
.disabled {
  color: blue;
  background-color: chartreuse;
}
</style>