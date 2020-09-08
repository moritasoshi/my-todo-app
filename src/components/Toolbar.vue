<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
    <v-toolbar-title>My Todo App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="$store.state.login_user">
      <v-btn text @click="logout">ログアウト</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style></style>
