<template>
    <div class="flex justify-center custom-card">
        <div class="prose max-w-3xl">
            <h1>Welcome!</h1>
            <p>
                The <strong>private-piranha.pics</strong> shop is a training
                environment for common privacy problems in web applications. It focuses
                on the General Data Protection Regulation (GDPR) while considering
                best practices. The training environment targets developers and service
                operators, but is also useful for anyone looking to deepen their
                understanding of the GDPR and its real-world impact on web
                applications.
            </p>
            <p>
                The shop implements a set of privacy-related issues (referred to as
                <em>privacy problems</em>). Your goal is to find them using your
                knowledge of the GDPR. You can validate your findings using the
                <NuxtLink to="/walkthrough">Problem Walkthrough</NuxtLink>.
            </p>
            <p>
                Please take everything with a grain of salt. This project does not
                provide legal advice. Implemented problems may be outdated, and new
                ones may be missing.
            </p>

            <h1 id="guide">Guide</h1>
            <h2 id="requirements">What are the requirements?</h2>
            <p>
                Having basic knowledge about the GDPR and its most essential articles
                is strongly recommended. You should also have some experience in web
                development and be familiar with the developer tools of your preferred
                browser.
            </p>
            <p>
                Finding and understanding all problems can be challenging — you need to
                be attentive and persistent.
            </p>

            <h2 id="how-to-start">How to start?</h2>
            <p>
                Open the training environment:
                <a
                    href="https://private-piranha.pics"
                    target="_blank"
                    rel="noopener noreferrer"
                    >private-piranha.pics</a
                >
            </p>
            <p>The problems vary in difficulty and fall into three groups:</p>
            <ul>
                <li>problems that are <em>visible</em> to the user,</li>
                <li>problems that result from something that is <em>missing</em>, and</li>
                <li>
                    problems that are <em>hidden</em> and only visible in the source
                    code or via browser developer tools.
                </li>
            </ul>
            <p>
                Besides the privacy problems, there are false flags — pay attention to
                whether something is a privacy problem, a security problem, or no
                problem at all.
            </p>
            <p>
                There is no guidance inside the shop itself. You must independently
                identify and understand each issue. A privacy problem can be as subtle
                as a single faulty sentence or line of code.
            </p>
            <p>
                <strong>
                    Ensure that ad blockers, content blockers, and anti-tracking
                    extensions are disabled. Safari is not recommended. Do not use real
                    payment, address, or account information — data may be publicly
                    viewable due to intentional privacy or security problems.
                </strong>
            </p>

            <h2 id="resources">Resources</h2>
            <p>
                A <a href="https://private-piranha.pics/handout" target="_blank" rel="noopener noreferrer">GDPR Handout</a> with key concepts and legal foundations is available directly within the training environment. It is also linked from the header bar inside the shop.
            </p>

            <h2 id="help">I need help!</h2>
            <p>
                The <NuxtLink to="/walkthrough">Problem Walkthrough</NuxtLink>
                describes how to find each problem and explains why it is a problem.
                Use it after you have explored the shop, or if you get stuck.
            </p>
            <p>
                You can also toggle <em>Disable Problems</em> in the shop's header bar
                to see the shop without the introduced issues and compare the
                difference.
            </p>

            <h1 id="about">More about the project</h1>
            <h2 id="tech-stack">How is private-piranha.pics built?</h2>
            <p>
                The shop uses a modern web tech stack. The frontend and backend are
                built with <a href="https://nuxt.com" target="_blank" rel="noopener noreferrer">Nuxt 4</a>,
                using server-side rendering. Data is stored in a
                <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">PostgreSQL</a>
                database, accessed via
                <a href="https://orm.drizzle.team/" target="_blank" rel="noopener noreferrer">Drizzle ORM</a>.
                The training environment resets daily to a clean state.
            </p>
            <p>
                This project page is a separate Nuxt application served from
                <code>project.private-piranha.pics</code>. It hosts the project
                overview, the GDPR handout, and the problem walkthrough.
            </p>
            <p>
                Both applications use
                <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>
                and
                <a href="https://daisyui.com/" target="_blank" rel="noopener noreferrer">daisyUI</a>
                for styling. Icons are from
                <a href="https://tabler-icons.io/" target="_blank" rel="noopener noreferrer">Tabler Icons</a>
                and
                <a href="https://www.flaticon.com/free-icons/piranha" target="_blank" rel="noopener noreferrer">Flaticon</a>.
                The piranha pictures were generated using
                <a href="https://www.craiyon.com/" target="_blank" rel="noopener noreferrer">Craiyon</a>.
            </p>

            <h2 id="why">Why was private-piranha.pics developed?</h2>
            <p>
                There are many training environments in the security space — cyber
                ranges, Capture The Flag (CTF) games, and serious games are common
                approaches. The most popular example is probably the
                <a
                    href="https://owasp.org/www-project-juice-shop/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >OWASP Juice Shop</a
                >. The GDPR, in force since 2018, is a major milestone for data
                protection — yet the privacy area lacks comparable training tools for
                developers. private-piranha.pics tries to fill that gap, bridging the
                developer-unfriendly wording of the GDPR and its real-world
                implications for web applications.
            </p>

            <h2 id="contact">I have a question or an idea. How can I contact you?</h2>
            <p>
                You can reach us via
                <a href="mailto:mail@private-piranha.pics">mail@private-piranha.pics</a>.
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>
