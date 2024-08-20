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
      addresses: [] as {
        addressLine1: string;
        postcode: string;
        dateMovedIn: string;
      }[], // Array to hold all address entries
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
        console.log("API Response:", response);

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
    addAddress() {
      if (this.addressLine1 && this.postcode && this.dateMovedIn) {
        this.addresses.push({
          addressLine1: this.addressLine1,
          postcode: this.postcode,
          dateMovedIn: this.dateMovedIn,
        });
        // Clear the current input fields
        this.addressLine1 = "";
        this.postcode = "";
        this.dateMovedIn = "";
      } else {
        alert("Please fill out all fields before adding an address.");
      }
    },
    removeAddress(index: number) {
      this.addresses.splice(index, 1);
    },
    calculateAddressCoverage(): boolean {
      if (this.addresses.length === 0) return false;

      const threeYearsAgo = new Date();
      threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

      // Sort addresses by dateMovedIn in descending order
      const sortedAddresses = this.addresses
        .map((addr) => new Date(addr.dateMovedIn))
        .sort((a, b) => b.getTime() - a.getTime());

      const earliestDate = sortedAddresses[sortedAddresses.length - 1];

      return earliestDate <= threeYearsAgo;
    },
    submitForm() {
      if (this.calculateAddressCoverage()) {
        // Proceed with form submission
        console.log("Form is valid. Proceeding with submission.");
        // Implement form submission logic here
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
  <div class="address-input mb-4">
    <!-- Address Entry -->
    <!-- prettier-ignore -->
    <b-form-group label="Address Line 1">
      <b-form-input
        v-model="addressLine1"
        required
      />
    </b-form-group>

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

    <b-form-group label="Date Moved In">
      <!-- prettier-ignore -->
      <b-form-datepicker
        v-model="dateMovedIn"
        required
      />
    </b-form-group>

    <b-button @click="addAddress">Add Address</b-button>

    <!-- Display added addresses with Remove button -->
    <div v-if="addresses.length">
      <h5>Address History</h5>
      <ul>
        <!-- prettier-ignore -->
        <li
          v-for="(address, index) in addresses"
          :key="index"
        >
          {{ address.addressLine1 }}, {{ address.postcode }},
          {{ address.dateMovedIn }}
          <b-button
            @click="removeAddress(index)"
            variant="danger"
            size="sm"
          >
            Remove
          </b-button>
        </li>
      </ul>
    </div>

    <!-- prettier-ignore -->
    <b-button
      @click="submitForm"
      class="mt-4"
      >Submit</b-button
    >
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
