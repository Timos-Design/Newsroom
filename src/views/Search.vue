<template>
  <div class="view-search">
    <vm-title title="Search" />
    <vm-spacer />
    <form @submit.prevent.stop="search">
      <vm-input placeholder="Search Newsroom" icon="ti-lens" v-model="query" />
    </form>

    <br />
    <vm-flow flow="column" v-if="searching">
      <br />
      <vm-spinner />
      <p>Loading results...</p>
    </vm-flow>

    <vm-flow flow="column" v-else-if="results.length === 0">
      <br />
      <i class="ti-exclamation-triangle" />
      <span>Nothing found</span>
    </vm-flow>

    <NRGridSmall v-else :news="results" />
  </div>
</template>

<script lang="ts">
import NRGridSmall from '@/components/grids/NRGridSmall.vue';
import { backendUrl, NOOP } from '@/utils/constants';
import { TDNews } from '@/utils/interfaces';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  components: {
    NRGridSmall,
  },
})
export default class Search extends Vue {
  public query = '';
  public searching = false;
  public results: TDNews[] = [];

  mounted(): void {
    this.setUpSearch();
  }

  @Watch('$route.params.query', { immediate: true })
  public setUpSearch(): void {
    if (this.searching) return;
    if (this.query === this.$route.params.query) return;
    this.query = this.$route.params.query;
    this.search();
  }

  public search(): void {
    if (this.searching) return;
    if (this.query.length <= 0) return;
    this.$router
      .push({ name: 'search', params: { query: this.query } })
      .catch(NOOP);

    if (this.query.length <= 0) return;
    this.searching = true;
    this.results = [];

    fetch(`${backendUrl}/newsroom?query=${encodeURI(this.query)}`)
      .then((res) => res.json())
      .then((res) => {
        this.results = res;
        this.searching = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.view-search {
  i.ti-exclamation-triangle {
    font-size: 40px;
    color: rgba(var(--vm-error), 1);
    margin-bottom: 5px;
  }
  form {
    display: flex;
    width: 100%;
    /deep/ *:after {
      background: none !important;
    }

    /deep/ .vm-input--input {
      padding: 5px 15px;
    }
  }
}
</style>
