<template>
  <section class="max-w-5xl mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold mb-8">Privacy Problem Walkthrough</h1>

    <div class="space-y-8">
      <article
        v-for="p in problems"
        :key="p.id"
        class="border border-gray-300 rounded-lg bg-white shadow-sm p-6"
      >
        <!-- Title -->
        <h2 class="text-xl font-semibold mb-4">{{ p.title }}</h2>

        <!-- Image -->
        <img
          v-if="p.image"
          :src="p.image"
          :alt="p.title"
          class="rounded mb-4 max-w-full"
        />

        <!-- Content -->
        <div class="prose prose-a:underline prose-a:text-blue-700 prose-a:hover:text-blue-600 max-w-none">
          <p><strong>Problem:</strong> <span v-html="p.problem"></span></p>
          <p><strong>Explanation:</strong> <span v-html="p.explanation"></span></p>
          <p><strong>Fix:</strong> <span v-html="p.fix"></span></p>
          <Accordion
            v-if="p.accordion"
            :title="p.accordion.title"
            :content="p.accordion.content"
          />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import problems from '~/content/problems.json' 
import Accordion from '~/components/Accordion.vue'
</script>
