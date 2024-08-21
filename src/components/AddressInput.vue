<script lang="ts">
import Vue from "vue";
import { BFormInput, BFormGroup, BFormDatepicker } from "bootstrap-vue";
import SubmitComponent from "@/components/submit.vue";

import axios from "axios";

export default Vue.extend({
  name: "AddressInputComponent",
  components: {
    BFormInput,
    BFormGroup,
    BFormDatepicker,
    SubmitComponent,
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
        this.suggestions = [];
        return;
      }

      this.isFetching = true;
      try {
        const response = await axios.get(
          `https://api.postcodes.io/postcodes/${this.postcode}/autocomplete`
        );
        if (Array.isArray(response.data.result)) {
          this.suggestions = response.data.result;
        } else {
          console.error("Unexpected API response format:", response.data);
          this.suggestions = [];
        }
      } catch (error) {
        console.error("Error fetching postcode suggestions:", error);
        this.suggestions = [];
      } finally {
        this.isFetching = false; // Reset fetching state
      }
    },
    selectPostcode(postcode: string) {
      this.postcode = postcode;
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
  },
});
</script>

<template>
  <div class="address-input mb-4">
    <!-- Display added addresses with Remove button -->
    <template>
      <div v-if="addresses.length">
        <!--prettier-ignore-->
        <b-card
          title="Address History"
          class="mb-4"
        >
          <b-list-group>
            <b-list-group-item
              v-for="(address, index) in addresses"
              :key="index"
              class="d-flex justify-content-between align-items-center"
            >
              <div>
                <div>
                  <strong>Address Line 1:</strong> {{ address.addressLine1 }}
                </div>
                <div><strong>Postcode:</strong> {{ address.postcode }}</div>
                <div>
                  <strong>Date Moved In:</strong> {{ address.dateMovedIn }}
                </div>
              </div>
              <b-button
                @click="removeAddress(index)"
                variant="danger"
                size="sm"
                class="ml-2"
              >
                Remove
              </b-button>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
    </template>
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
          class="dropdown-item"
        >
          {{ suggestion }}
        </b-list-group-item>
      </b-list-group>
    </b-form-group>

    <b-form-group label="Date Moved In">
      <!-- prettier-ignore -->
      <b-form-datepicker
        v-model="dateMovedIn"
        size="sm"
        menu-class="w-100"
        class="mb-2"
        calendar-width="100%"
        close-button
        required
      />
    </b-form-group>

    <div class="button-container">
      <!-- prettier-ignore -->
      <b-button
        @click="addAddress"
        class="mt-4"
        >Add Address</b-button
      >
      <!-- prettier-ignore -->
      <SubmitComponent
        class="mt-4"
        :addresses="addresses" />
    </div>
  </div>
</template>

<style scoped>
.address-input {
  max-width: 500px;
}

.dropdown-item {
  cursor: pointer;
}
</style>
