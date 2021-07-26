<template>
  <div id="app">
    <vm-notification />
    <NRNavbar />
    <NRRouter />
    <NRUpdateAvailable v-model="updateAvailable" @refresh="refresh" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import NRNavbar from '@/components/NRNavbar.vue';
import NRRouter from '@/components/NRRouter.vue';
import { backendUrl } from '@/utils/constants';
import { TDNews, TDProject } from './utils/interfaces';
import {
  registerMediaQueries,
  unregisterMediaQueries,
} from '@/utils/mediaQueries';
import NRLogo from './components/NRLogo.vue';
import NRUpdateAvailable from './components/NRUpdateAvailable.vue';

@Component({
  components: {
    NRRouter,
    NRNavbar,
    NRLogo,
    NRUpdateAvailable,
  },
})
export default class App extends Vue {
  public registration: ServiceWorkerRegistration | null = null;
  public updateAvailable = false;
  public refreshing = false;

  created(): void {
    document.addEventListener(
      'serviceWorkerUpdateEvent',
      (e) => {
        const reg = e as CustomEvent<ServiceWorkerRegistration>;
        this.registration = reg.detail;
        this.updateAvailable = true;
      },
      { once: true }
    );

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  }

  mounted(): void {
    registerMediaQueries();
    fetch(`${backendUrl}/newsroom?limit=17`)
      .then((res) => res.json())
      .then((news: TDNews[]) => {
        this.$store.commit('news', news);
      });

    fetch(`${backendUrl}/newsroom/featured`)
      .then((res) => res.json())
      .then((news: TDNews[]) => {
        this.$store.commit('featured', news);
      });

    fetch(`${backendUrl}/newsroom/projects`)
      .then((res) => res.json())
      .then((projectIds: string[]) => {
        this.$store.commit('projectIds', projectIds);
      });

    fetch(`${backendUrl}/projects`)
      .then((res) => res.json())
      .then((projects: TDProject[]) => {
        this.$store.commit('projects', projects);
      });
  }

  beforeDestroy(): void {
    unregisterMediaQueries();
  }

  public refresh(): void {
    this.updateAvailable = false;
    if (this.registration) {
      this.registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
    }
  }
}
</script>

<style lang="scss">
html {
  font-family: -apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI,
    Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;
  scroll-behavior: smooth;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

body {
  min-height: 100vh;
  margin: 0;
}

.vm-notification__image img {
  object-fit: cover !important;
  border-radius: $border-radius;
  height: 50px !important;
  width: 50px !important;
}

[content] {
  padding: 0 5vw;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  padding-top: calc(70px + env(safe-area-inset-top));

  max-width: 900px;
  margin: 0 auto;
}

[center] {
  text-align: center;
}

i.ti-chevron-right,
i.ti-chevron-left {
  font-size: 0.6em;
}

.news-type {
  text-transform: uppercase;
  font-size: 0.75em;
  font-weight: bold;
  margin-bottom: 0.15em;

  &[type='update'] {
    color: rgba(var(--vm-primary), 1);
  }
  &[type='release'] {
    color: rgba(var(--vm-error), 1);
  }
  &[type='feature'] {
    color: rgba(var(--vm-success), 1);
  }
}
.news-title {
  flex: 1 1 0px;
  font-weight: bold;
  font-size: 1.2em;
  flex-grow: 1;
}
.news-date {
  margin-top: 10px;
  font-size: 0.9em;
  color: rgba(var(--vm-color-secondary), 1);
}
</style>
