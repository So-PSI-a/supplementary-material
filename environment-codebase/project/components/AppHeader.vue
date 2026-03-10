<template>
  <header class="bg-orange-600 text-white p-4 shadow-md">
    <h1>Hands-On Privacy Training</h1>
    <nav>
      <NuxtLink to="/" class="mr-4 hover:underline">Home</NuxtLink>
      <a href="https://private-piranha.pics/handout" target="_blank" rel="noopener noreferrer" class="mr-4 hover:underline">GDPR Handout</a>
      <NuxtLink to="/walkthrough" class="mr-4 hover:underline">Problem Walkthrough</NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
  .router-link-exact-active {
    font-weight: bold;
    text-decoration: underline;
  }
</style>