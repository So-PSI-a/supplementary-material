<script setup lang="ts">
const model = defineModel<boolean>({ default: false })
</script>

<template>
    <UModal
        v-model:open="model"
        title="About this Project"
        description="Training environment information"
        :close="{ color: 'primary', variant: 'outline', class: 'rounded-full' }"
    >
        <template #body>
            <h2>Important note:</h2>
            <p>
                This is a training environment for detecting common privacy flaws on
                the web. Any data and information on this page, including the imprint
                and the privacy policy, are purely fictional. Please do not use
                personal data (that could identify you), and do not use real payment
                data. Contact details of the responsible party and more information
                about the project can be found on the
                <a
                    href="https://project.private-piranha.pics"
                    target="_blank"
                    rel="noopener noreferrer"
                    >project page</a
                >.
            </p>
            <br />
            <h2>Usage instructions:</h2>
            <p>
                Explore this online shop and try to find the GDPR- and
                privacy-related issues. There are 13 in total. You might need to use
                browser developer tools to check what's going on under the hood.
            </p>
            <p>
                The problems vary in difficulty and fall into three groups: things
                that are <em>visible</em> in the UI, things that are
                <em>missing</em>, and things that are <em>hidden</em> in the source
                code or network traffic.
            </p>
            <br />
            <h2>Resources</h2>
            <div class="flex flex-col gap-2">
                <NuxtLink to="/handout" target="_blank">
                    <UButton
                        label="GDPR Handout"
                        icon="i-heroicons-document-text"
                        variant="outline"
                    />
                </NuxtLink>
                <a
                    href="https://project.private-piranha.pics/walkthrough"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <UButton
                        label="Problem Walkthrough"
                        icon="i-heroicons-check-circle"
                        variant="outline"
                        color="neutral"
                    />
                </a>
            </div>
            <br />
            <p class="text-sm text-gray-500">
                Tip: If you get stuck, toggle "Disable Problems" in the top bar to
                see the shop without issues and compare.
            </p>
        </template>
    </UModal>
</template>
