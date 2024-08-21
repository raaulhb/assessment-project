<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FormComponent",
});
</script>

<template>
  <div class="container mt-4 px-3">
    <!-- Title Slot -->
    <div class="mb-3">
      <slot name="title"></slot>
    </div>

    <!-- Subtitle Slot -->
    <div class="mb-3">
      <slot name="subtitle"></slot>
    </div>

    <!-- Question Slot -->
    <div class="mb-4">
      <slot name="question"></slot>
    </div>

    <div class="mb-4">
      <slot name="not-found"></slot>
    </div>

    <!-- Submit Slot -->
    <div class="mt-4">
      <slot name="submit"></slot>
    </div>
  </div>
</template>
