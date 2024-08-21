<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",
});
</script>

<template>
  <!-- Create a responsive container -->
  <!--prettier-ignore-->
  <div
    id="app"
    class="d-flex flex-column min-vh-100 py-3"
  >
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
