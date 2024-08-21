<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",
});
</script>

<template>
  <!--prettier-ignore-->
  <div
    id="app"
    class="app-container"
  >
    <!-- Create a responsive container -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <!-- Place the router-view inside the responsive column -->
          <router-view :key="$route.path" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding-top: 20px;
  padding-bottom: 20px;
  min-height: 100vh; /* Ensure it covers the full height of the screen */
}

@media (max-width: 576px) {
  .app-container {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
