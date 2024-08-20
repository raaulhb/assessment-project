<script lang="ts">
import Vue from "vue";
import { BFormInput, BFormGroup, BFormDatepicker } from "bootstrap-vue";

export default Vue.extend({
  name: "AddressInputComponent",
  components: {
    BFormInput,
    BFormGroup,
    BFormDatepicker,
  },
  data() {
    return {
      addressLine1: "",
      postcode: "",
      dateMovedIn: "",
    };
  },
  methods: {
    fetchPostcodeSuggestions() {
      // TODO: Call postcodes.io API to get suggestions
    },
  },
});
</script>

<template>
  <div class="address-input mb-4">
    <!-- Address Line 1 -->
    <b-form-group label="Address Line 1">
      <!-- prettier-ignore -->
      <b-form-input
        v-model="addressLine1"
        required
      />
    </b-form-group>

    <!-- Postcode with Autocomplete -->
    <b-form-group label="Postcode">
      <b-form-input
        v-model="postcode"
        @input="fetchPostcodeSuggestions"
        required
      />
    </b-form-group>

    <!-- Date Moved In -->
    <b-form-group label="Date Moved In">
      <!-- prettier-ignore -->
      <b-form-datepicker
        v-model="dateMovedIn"
        required
      />
    </b-form-group>
  </div>
</template>
>

<style scoped>
.address-input {
  max-width: 500px;
}
</style>
