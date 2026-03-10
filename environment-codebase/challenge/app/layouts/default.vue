<template>
    <div
        class="mr-auto ml-auto flex h-screen max-w-[1300px] flex-col justify-between">
        <div class="mb-5">
            <div
                class="bg-primary text-primary-content flex flex-col justify-between gap-2 rounded-t-md px-5 py-1 md:flex-row"
            >
                <div>
                    The training environment will reset in
                    <Countdown />
                </div>

                <div class="flex gap-4">
                    <NuxtLink to="/handout" target="_blank">
                        GDPR Handout
                    </NuxtLink>
                    <span>|</span>
                    <NuxtLink
                        to="https://project.private-piranha.pics/walkthrough"
                        target="_blank"
                        external
                    >
                        Done? Check your findings
                    </NuxtLink>
                </div>

                <div>
                    <label class="label text-primary-content">
                        <input
                            type="checkbox"
                            class="toggle"
                            :checked="!areProblemsEnabled"
                            @click="toggleProblems"
                        />
                        Disable Problems
                    </label>
                </div>
            </div>
            <header
                class="bg-base-200 flex grid-cols-3 items-center justify-between rounded-b-md px-5 py-2"
            >

                <div>
                    <NuxtLink to="/">
                        <div class="text-4xl tracking-wide">
                            <span class="inline font-[Carosello] opacity-90"
                                >Private</span
                            >
                            <img
                                class="mr-1 inline h-12"
                                src="/icon.png"
                                @click="$trackAction('navigation', 'logo')"
                            />
                            <span class="inline font-[Carosello] opacity-90"
                                >Pics</span
                            >
                        </div>
                    </NuxtLink>
                </div>
                <div>
                    <div class="grid grid-cols-2 gap-5">
                        <NuxtLink class="grid justify-items-end" to="/">
                            <span @click="$trackAction('navigation', 'start')">
                                Start
                            </span>
                        </NuxtLink>
                        <NuxtLink class="grid" to="/products">
                            <span
                                @click="$trackAction('navigation', 'products')"
                            >
                                Products
                            </span>
                        </NuxtLink>
                    </div>
                </div>
                <div class="flex gap-4 justify-self-end">
                    <div class="dropdown dropdown-end">
                        <button
                            tabindex="0"
                            role="button"
                            class="cursor-pointer"
                        >
                            <svg
                                class="icon icon-tabler icon-tabler-user"
                                fill="none"
                                height="24"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                    stroke="none"
                                />
                                <circle cx="12" cy="7" r="4" />
                                <path
                                    d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"
                                />
                            </svg>
                        </button>

                        <ul class="menu dropdown-content bg-base-200 p-0">
                            <AuthState v-slot="{ loggedIn }">
                                <template v-if="loggedIn">
                                    <li>
                                        <NuxtLink to="/account">
                                            <span
                                                @click="
                                                    $trackAction(
                                                        'navigation',
                                                        'account',
                                                    )
                                                "
                                            >
                                                Account
                                            </span>
                                        </NuxtLink>
                                    </li>
                                    <li>
                                        <a @click.prevent="logout">
                                            <span
                                                @click="
                                                    $trackAction(
                                                        'navigation',
                                                        'logout',
                                                    )
                                                "
                                            >
                                                Logout
                                            </span>
                                        </a>
                                    </li>
                                </template>
                                <template v-else>
                                    <li>
                                        <NuxtLink to="/login">Login</NuxtLink>
                                    </li>
                                    <li>
                                        <NuxtLink to="/register">
                                            Register
                                        </NuxtLink>
                                    </li>
                                </template>
                            </AuthState>
                        </ul>
                    </div>

                    <NuxtLink to="/cart">
                        <div class="indicator">
                            <span
                                class="indicator-item indicator-bottom badge badge-primary"
                            >
                                <ClientOnly>
                                    {{ cart.contents.length }}
                                </ClientOnly>
                            </span>
                            <span @click="$trackAction('navigation', 'cart')">
                                <svg
                                    class="icon icon-tabler icon-tabler-shopping-cart"
                                    fill="none"
                                    height="24"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                        stroke="none"
                                    />
                                    <circle cx="6" cy="19" r="2" />
                                    <circle cx="17" cy="19" r="2" />
                                    <path d="M17 17h-11v-14h-2" />
                                    <path d="M6 5l14 1l-1 7h-13" />
                                </svg>
                            </span>
                        </div>
                    </NuxtLink>
                </div>
            </header>
            </div>

        <div class="mb-auto">
            <slot />
            <AboutModal v-model="aboutOpen" />
        </div>

        <footer class="custom-card-small mt-5 grid gap-y-3">
            <div class="grid content-center">
                <div class="flex justify-center gap-x-3">
                    <NuxtLink to="/imprint">Imprint</NuxtLink>
                    <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
                    <button class="cursor-pointer hover:underline flex items-center gap-1" @click="aboutOpen = true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                        </svg>
                        Info
                    </button>
                </div>
            </div>
            <div class="grid content-center">
                <div class="flex justify-center gap-x-3">
                    <a
                        href="https://facebook.com"
                        class="inline-block"
                        target="_blank"
                    >
                        <svg
                            class="icon icon-tabler icon-tabler-brand-facebook"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 0h24v24H0z" fill="none" stroke="none" />
                            <path
                                d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
                            />
                        </svg>
                    </a>
                    <a
                        v-if="areProblemsEnabled"
                        class="twitter-hashtag-button"
                        data-show-count="false"
                        href="https://twitter.com/intent/tweet?button_hashtag=privatepiranhapics&ref_src=twsrc%5Etfw"
                        >Tweet #privatepiranhapics</a
                    >
                    <a
                        v-else
                        class="inline-block align-baseline"
                        href="https://twitter.com/intent/tweet?button_hashtag=privatepiranhapics&ref_src=twsrc%5Etfw"
                        >Tweet #privatepiranhapics</a
                    >
                    <a
                        href="https://www.instagram.com/officialrickastley/"
                        class="inline-block"
                        target="_blank"
                    >
                        <svg
                            class="icon icon-tabler icon-tabler-brand-instagram"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 0h24v24H0z" fill="none" stroke="none" />
                            <rect height="16" rx="4" width="16" x="4" y="4" />
                            <circle cx="12" cy="12" r="3" />
                            <line x1="16.5" x2="16.5" y1="7.5" y2="7.501" />
                        </svg>
                    </a>
                      
                </div>
            </div>
        </footer>
        <CookieControl locale="en" />
    </div>
</template>



<script lang="ts" setup>
import AboutModal from '~/components/AboutModal.vue';

const aboutOpen = ref(false)

onMounted(() => {
    if (!localStorage.getItem('about-seen')) {
        aboutOpen.value = true
        localStorage.setItem('about-seen', '1')
    }
})



const cart = useCart();
const { isEnabled: areProblemsEnabled, toggle: toggleProblems } =
    useChallengeState();

const {
    public: { mainDomain, fontUrl, plausibleScript },
} = useRuntimeConfig();
const { clear: clearUserSession } = useUserSession();

useHead(() =>
    areProblemsEnabled
        ? {
              link: [
                  {
                      rel: 'stylesheet',
                      href: fontUrl,
                  },
              ],
              script: [
                  {
                      src: plausibleScript,
                      'data-domain': mainDomain,
                      async: true,
                      defer: true,
                  },
                  {
                      src: 'https://platform.twitter.com/widgets.js',
                      async: true,
                  },
              ],
          }
        : {},
);

watch(
    () => areProblemsEnabled,
    (newValue) => {
        if (!newValue) {
            const twitterScript = document.head.querySelector(
                'script[src^="https://platform.twitter.com"]',
            );

            twitterScript?.remove();
        }
    },
);

async function logout() {
    await clearUserSession();

    await navigateTo('/');
}
</script>
