<template>
  <div>
    <div>{{ exclusions }}</div>
    <div class="flexcontainer">
      <dropdown
        class="dropflex"
        v-for="option in options"
        :key="option.id"
        :option="option"
        @change="function(ev){dropchange(option.id, ev)}"
        :values="values"
        :exclusions="exclusions(option.id)"
      />
    </div>
  </div>
</template>

<script>
import Dropdown, { OptionValue, Option } from "./Dropdown.vue";
import { LoremIpsum } from "lorem-ipsum";
export default {
  data: function() {
    const options = optionGenerator();
    const values = options.map(o => ({
      id: o.defaultValueId,
      timestamp: Date.now()
    }));
    this.exclusions_ = [
      ["0_0", "1_0"],
      ["0_0", "1_1"],
      ["2_0", "1_2"],
      ["2_0", "1_1"],
      ["2_0", "0_0"],
      ["3_0", "4_1"]
    ];
    this.exclusionMap = createExclusionMap(this.exclusions_);
    writExclusionsToOptions(this.exclusionMap, options);
    const validity = [];

    return { options, values, validity };
  },
  created: () => {},
  methods: {
    dropchange: function(optionid, valId) {
      this.$set(this.values, optionid, { id: valId, timestamp: Date.now() });
    },
    exclusions: function(optionid) {
      const ownValue = this.values[optionid];
      const exclusions = this.exclusionMap.get(
        toStringKey(optionid, ownValue.id)
      );

      let messages = [];
      if (exclusions) {
        for (const uuid of exclusions) {
          const [oId, vId] = fromStringKey(uuid);
          if (this.values[oId].id == vId) {
            const otherValue = this.values[oId];
            messages.push({
              otherTimestamp: otherValue.timestamp,
              ownTimestamp: ownValue.timestamp,
              ownValueId: ownValue.id,
              message: `Current Selection (${ownValue}) is not allowd with ${uuid}`
            });
          }
        }
      }
      return messages;
    },

  },
  components: { dropdown: Dropdown },
  watch: {}
};

    export const toStringKey = (oId, vId) => oId + "_" + vId
    export const fromStringKey = str => str.split("_")
/**
 * @param exclusions {[String,String][]}
 * @param options {Option[]}
 */
function writExclusionsToOptions(lookupMap, options) {
  for (const option of options) {
    for (const value of option.values) {
      const key = option.id + "_" + value.id;
      value.exclusions = lookupMap.get(key);
    }
  }
}
function createExclusionMap(exclusions) {
  const lookupMap = new Map();

  for (const [ov1, ov2] of exclusions) {
    if (!lookupMap.has(ov1)) {
      lookupMap.set(ov1, []);
    }
    if (!lookupMap.has(ov2)) {
      lookupMap.set(ov2, []);
    }
    lookupMap.get(ov1).push(ov2);
    lookupMap.get(ov2).push(ov1);
  }
  return lookupMap;
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});
function optionGenerator() {
  const options = [];
  for (let i = 0; i < 10; i++) {
    const optionvalues = [];
    for (let j = 0; j < Math.random() * 5 + 2; j++) {
      optionvalues.push(new OptionValue(j, lorem.generateWords(2)));
    }
    options.push(
      new Option(
        i,
        lorem.generateWords(1),
        optionvalues,
        Math.floor(Math.random() * 5)
      )
    );
  }

  return options;
}

// function exclusionGenerator(options) {

// }
</script>

<style>
#app {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  color: blue;
}
.flexcontainer {
  display: flex;
  flex-flow: row wrap;
}
.dropflex {
  min-width: 400px;
}
</style>
