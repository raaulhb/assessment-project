<script lang="ts">
import Vue from "vue";
import FormComponent from "@/components/form.vue";
import TextComponent from "@/components/text.vue";
import SubmitComponent from "@/components/submit.vue";

export default Vue.extend({
  name: "FormView",
  components: {
    FormComponent,
    TextComponent,
    SubmitComponent,
  },
  data() {
    return {
      userName: "", // TODO: This should be fetched from Vuex or props
    };
  },
  created() {
    // TODO: Load user data here and set userName
  },
});
</script>
<template>
  <div class="container my-4">
    <!-- Render the form with title, subtitle, and address history input slots -->
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

      <!-- TODO: Address history form fields go here -->

      <!-- Submit Button Slot -->
      <template v-slot:submit>
        <SubmitComponent />
      </template>
    </FormComponent>
  </div>
</template>
