<script lang="ts">
import Vue from "vue";
import { Address } from "@/types/Address";
export default Vue.extend({
  name: "SubmitComponent",
  props: {
    addresses: {
      type: Array as () => Address[],
      required: true,
    },
  },
  methods: {
    calculateAddressCoverage(): boolean {
      if (this.addresses.length === 0) return false;

      const threeYearsAgo = new Date();
      threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

      // Sort addresses by dateMovedIn in descending order
      const sortedAddresses = this.addresses
        .map((addr: Address) => new Date(addr.dateMovedIn))
        .sort((a, b) => b.getTime() - a.getTime());

      const earliestDate = sortedAddresses[sortedAddresses.length - 1];

      return earliestDate <= threeYearsAgo;
    },
    submit() {
      // Check address coverage
      if (this.calculateAddressCoverage()) {
        // Proceed with form submission
        console.log("Form is valid. Proceeding with submission.");
      } else {
        alert(
          "Please ensure you have provided address history covering at least 3 years."
        );
      }
    },
  },
});
</script>

<template>
  <b-button @click="submit">Submit</b-button>
</template>
