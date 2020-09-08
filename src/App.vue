<template>
  <v-app>
    <!-- toolbar -->
    <Toolbar />

    <!-- main -->
    <v-content>
      <v-container fluid fillMheight align-start>
        <!-- router-view: the matched component for the given path  -->
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";

export default {
  name: "App",
  components: {
    Toolbar,
  },

  data: () => ({
    //
  }),
};
</script>
