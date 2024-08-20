<script lang="ts">
import Vue from "vue";
import { BFormInput, BFormGroup, BFormDatepicker } from "bootstrap-vue";
import axios from "axios";

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
      suggestions: [] as string[], // Store postcode suggestions here
      isFetching: false, // To manage loading state
    };
  },
  methods: {
    async fetchPostcodeSuggestions() {
      if (this.postcode.length < 3) {
        this.suggestions = []; // Clear suggestions if postcode length is less than 3
        return;
      }

      this.isFetching = true; // Set fetching state to true
      try {
        const response = await axios.get(
          `https://api.postcodes.io/postcodes/${this.postcode}/autocomplete`
        );
        // Log the full response
        console.log("API Response:", response.result);

        // Check if response.data.result is an array
        if (Array.isArray(response.data.result)) {
          this.suggestions = response.data.result;
        } else {
          console.error("Unexpected API response format:", response.data);
          this.suggestions = [];
        }

        console.log("Postcode suggestions:", this.suggestions);
      } catch (error) {
        console.error("Error fetching postcode suggestions:", error);
        this.suggestions = [];
      } finally {
        this.isFetching = false; // Reset fetching state
      }
    },
    selectPostcode(postcode: string) {
      this.postcode = postcode;
      console.log("Selected postcode:", postcode);
      this.suggestions = []; // Clear suggestions after selection
    },
  },
});
</script>

<template>
  <div class="address-input mb-4">
    <!-- Address Line 1 -->
    <!-- prettier-ignore -->
    <b-form-group label="Address Line 1">
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
      <!-- Suggestions Dropdown -->
      <!-- prettier-ignore -->
      <b-list-group
        v-if="suggestions.length"
        class="mt-2"
      >
        <b-list-group-item
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="selectPostcode(suggestion)"
          class="cursor-pointer"
        >
          {{ suggestion }}
        </b-list-group-item>
      </b-list-group>
    </b-form-group>

    <!-- Date Moved In -->
    <!-- prettier-ignore -->
    <b-form-group label="Date Moved In">
      <b-form-datepicker
        v-model="dateMovedIn"
        required
      />
    </b-form-group>
  </div>
</template>

<style scoped>
.address-input {
  max-width: 500px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
