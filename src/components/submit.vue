<script lang="ts">
import Vue from "vue";
import { Address } from "@/types/Address";
import { createClaim } from "@/core/createClaim";
import { getUserIpAddress } from "@/core/getUserIpAddress";

export default Vue.extend({
  name: "SubmitComponent",
  props: {
    addresses: {
      type: Array as () => Address[],
      required: true,
    },
  },
  data() {
    return {
      submissionSuccess: false,
      submissionError: null as string | null,
    };
  },
  computed: {
    userId(): string {
      return this.$store.getters.getUser.id; // Access user ID from Vuex store
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
    async submit() {
      this.submissionSuccess = false;
      this.submissionError = null;

      if (!this.calculateAddressCoverage()) {
        this.submissionError =
          "Please ensure you have provided address history covering at least 3 years.";
        return;
      }

      try {
        const ipAddress = await getUserIpAddress();
        if (!ipAddress) {
          this.submissionError = "Unable to retrieve your IP address.";
          return;
        }

        const [claim, error] = await createClaim(this.userId, ipAddress, {
          addresses: this.addresses,
        });
        if (error || !claim) {
          this.submissionError = "An error occurred while creating the claim.";
        } else {
          this.submissionSuccess = true;
        }
      } catch (err) {
        console.error("Unexpected error:", err); // Logging error details
        this.submissionError = "An unexpected error occurred.";
      }
    },
  },
});
</script>

<template>
  <div>
    <!-- Error message -->
    <!--prettier-ignore-->
    <div
      v-if="submissionError"
      class="alert alert-danger mt-3"
    >
      {{ submissionError }}
    </div>
    <b-button @click="submit">Submit</b-button>

    <!-- Success message -->
    <!--prettier-ignore-->
    <div
      v-if="submissionSuccess"
      class="alert alert-success mt-3"
    >
      Your information has been submitted successfully!
    </div>
  </div>
</template>
