<template>
  <vm-navbar class="nr-navbar" breakpoint="100vw">
    <router-link slot="title" :to="{ name: 'home' }">
      <NRLogo height="30" width="30" />
      <b>Newsroom</b>
    </router-link>
    <form
      v-if="showSearch"
      slot="static"
      id="static"
      @submit.prevent.stop="search"
    >
      <vm-input
        :frosted="true"
        icon="ti-lens"
        placeholder="Search Newsroom"
        v-model="query"
      />
    </form>
    <div class="project-wrapper">
      <form v-if="showSearch" id="overflow" @submit.prevent.stop="search">
        <vm-input
          icon="ti-lens"
          placeholder="Search Newsroom"
          v-model="query"
        />
      </form>
      <vm-title subtitle="Projects" />
      <br />
      <vm-grid gap="10px" v-if="projects">
        <div v-for="p in projects" :key="p.id">
          <vm-link
            :to="{ name: 'project', params: { project: p.title } }"
            color="color"
          >
            {{ p.title }}
          </vm-link>
        </div>
      </vm-grid>
      <vm-spacer />
    </div>
  </vm-navbar>
</template>

<script lang="ts">
import { NOOP } from '@/utils/constants';
import { TDProject } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';
import NRLogo from './NRLogo.vue';

@Component({ components: { NRLogo } })
export default class NRNavbar extends Vue {
  public query = '';

  public search(): void {
    if (this.query.length > 0) {
      this.$router
        .push({ name: 'search', params: { query: this.query } })
        .catch(NOOP);
    }
  }

  get showSearch(): boolean {
    return this.$route.name !== 'search';
  }

  get projects(): TDProject[] {
    const ids: string[] = this.$store.getters.projectIds;
    const pro: TDProject[] = this.$store.getters.projects;
    if (!ids || !pro) {
      return [];
    }

    return ids.map((id) => pro.filter((x) => x.id === id)[0]);
  }
}
</script>

<style lang="scss" scoped>
.nr-navbar {
  a {
    color: inherit;
    text-decoration: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    b {
      margin-left: 5px;
    }
  }

  /deep/ .vm-navbar--container,
  .project-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

  form {
    display: flex;
    margin: 0;

    &#static {
      min-width: 300px;
      @media only screen and(max-width: 550px) {
        display: none;
      }
    }

    &#overflow {
      @media only screen and(min-width: 551px) {
        display: none;
      }
      margin-top: -10px;
      margin-bottom: 20px;
    }

    /deep/ *:after {
      background: none !important;
    }
    /deep/ .vm-input--input {
      padding: 2.5px 15px;
    }
  }
}
</style>
