<template>
  <div>
    <AppHeader /> 

    <main class="p-8 min-h-screen">
      <slot /> 
    </main>

    <footer class="bg-gray-200 p-4 text-center text-gray-700 border-t">
      <p>&copy; 2025 private-piranha.pics</p>
    </footer>
  </div>
</template>