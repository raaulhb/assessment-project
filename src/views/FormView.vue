<script lang="ts">
import Vue from "vue";
import FormComponent from "@/components/form.vue";
import TextComponent from "@/components/text.vue";
import AddressInputComponent from "@/components/AddressInput.vue";

export default Vue.extend({
  name: "FormView",
  components: {
    FormComponent,
    TextComponent,
    AddressInputComponent,
  },
  data() {
    return {
      userName: null,
      userExists: true,
    };
  },
  created() {
    // Load the user from the Vuex store when the component is created
    const user = this.$store.getters.getUser;
    if (user && user.firstName) {
      this.userName = user.firstName;
    } else {
      this.userExists = false;
    }
  },
});
</script>

<template>
  <div class="container my-4">
    <div v-if="userExists">
      <FormComponent>
        <!-- Title Slot -->
        <template v-slot:title>
          <TextComponent
            type="h1"
            :text="`Welcome Back, ${userName}`"
            classes="mb-3"
          />
        </template>

        <!-- Subtitle Slot -->
        <template v-slot:subtitle>
          <TextComponent
            type="h5"
            text="Please provide your address history for the past 3 years"
            classes="mb-4"
          />
        </template>

        <!-- Address History Fields -->
        <template v-slot:question><AddressInputComponent /></template>

        <!-- TODO: Add logic for additional address inputs if required -->
      </FormComponent>
    </div>
    <div v-else>
      <TextComponent
        type="h1"
        text="User not found. Please contact support."
        classes="text-danger"
      />
    </div>
  </div>
</template>
