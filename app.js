Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'en',
    messages: {
        en: {
            title: "DOWNLOAD WEBINARJAM",
            subtitle: "just play",
            links: ["Home", "Privacy Policy", "Terms of service", "Download Extension"],
            notFound: "Page was not found",
            privacyPolicy: privacyEn,
            terms: termsEn,
            homeBody: "You can support me below.",
        },
        cs: {
            title: "STÁHNI WEBINARJAM",
            subtitle: "stáhni a přehrávej",
            links: ["Domů", "GDPR", "Podmínky", "Stáhnout rozšíření"],
            notFound: "Stránka nebyla nalezena",
            privacyPolicy: privacyEn,
            terms: termsEn,
            homeBody: "Můžeš mě podpořit níže.",
        }
    }
})

Vue.component("change-logs", {
    template: `
    <div class="change-logs">
        <h2>Changelog</h2>
        <div class="content-body">
            <div class="date-logs">
                <ul>
                    <li v-for="log in logs">
                        <a
                         v-bind:class="{ 'active': currentVisible == log.date.replace('-','').replace('-','')}"
                         @click="scrollTo(log.date.replace('-','').replace('-',''))">
                        {{returnDate(log.date)}}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="log-details" >
                <ul>
                    <li v-for="log in logs" :id="log.date.replace('-','').replace('-','')">
                    <em>{{returnDate(log.date)}}</em>
                        <h3>{{log.title}} <span>{{log.version}}</span></h3>
                        <p v-html="log.description"></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            currentVisible: null,
            logs: [{
                    date: "2022-09-29",
                    title: "Je to venku!",
                    description: `
                            Dnes vyšla na Google Extension Store první verze rozšíření pro prohlížeče založených na jádře "Chromium", odkaz najdeš v menu nahoře. Verze je funkční k dnešnímu datu.
                            `,
                    version: "1.0.0"
                },
            ],
        }
    },
    mounted() {
        document.addEventListener('scroll', () => this.handleScroll());
    },
    methods: {
        returnDate(data) {
            return dayjs(data).format('DD. MM. YYYY')
        },
        scrollTo(id) {
            const target = document.getElementById(id);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'end',
            });
        },
        handleScroll() {
            this.logs.forEach((log) => {
                const el = document.getElementById(log.date.replace('-','').replace('-',''));
                const top_of_object = el.offsetTop - 32;
                const bottom_of_window = window.pageYOffset;
                if (bottom_of_window >= top_of_object) {
                    this.currentVisible = el.id;
                }
            });
            const container = document.querySelector(".date-logs");
            const top_of_cont = container.offsetTop + 120;
            
            window.scrollY > top_of_cont? container.classList.add('fixed') : container.classList.remove('fixed');
        },
    }
});

const Homepage = {
    template: `
        <div>
            <p>{{ $t('homeBody') }}</p>
            <a href="https://www.paypal.com/paypalme/kaldaf" target="_blank">
                <img style="width: 160px;" src="./assets/paypal.png">
            </a>
            <change-logs></change-logs>
        </div>
    `,
};

const Gdpr = {
    template: `
    <div class="content-body">
        <h1> {{ $t('links[1]') }} </h1>
        <div class="html-content" v-html="$t('privacyPolicy')">
        </div>
    </div>
    `
}

const Terms = {
    template: `
    <div class="content-body">
        <h1> {{ $t('links[2]') }} </h1>
        <div class="html-content" v-html="$t('terms')">
        </div>
    </div>
    `
}

const Error = {
    template: `
    <h1>{{ $t('notFound') }}</h1>
    `,
};

const routes = [{
        path: '/',
        component: Homepage
    },
    {
        path: '/gdpr',
        component: Gdpr
    },
    {
        path: '/gdpr.html',
        component: Gdpr
    },
    {
        path: '/terms',
        component: Terms
    },
    {
        path: '/terms.html',
        component: Terms
    },
    {
        path: '*',
        component: Error
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    router,
    i18n: i18n,
    data() {
        return {
            langs: ["en", "cs"],
            openMenu: false
        }
    },
    methods: {
        checkMenuClose() {
            this.openMenu == true ? this.openMenu = false : null;
        }
    },
    created() {
        window.title = i18n.title;
    },
}).$mount('#app')