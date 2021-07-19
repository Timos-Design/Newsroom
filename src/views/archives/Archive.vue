<template>
  <div class="view-archive">
    <vm-revealer>
      <div v-if="!news">
        <vm-flow flow="column">
          <br />
          <vm-spinner />
          <p>Loading news...</p>
        </vm-flow>
      </div>
    </vm-revealer>
    <vm-revealer>
      <NRArchiveList v-if="news && news.length > 0" :news="news" />
    </vm-revealer>

    <vm-flow horizontal="center" v-if="news">
      <span>
        <vm-button
          icon="ti-chevron-left"
          :round="true"
          :disabled="page === 1"
          @click="prev"
        />
      </span>
      <div class="current-page">Page {{ page }}</div>
      <span>
        <vm-button
          icon="ti-chevron-right"
          :round="true"
          :disabled="news && news.length < limit"
          @click="next"
        />
      </span>
    </vm-flow>
  </div>
</template>

<script lang="ts">
import NRArchiveList from '@/components/archive/NRArchiveList.vue';
import { backendUrl } from '@/utils/constants';
import { TDNews } from '@/utils/interfaces';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  components: {
    NRArchiveList,
  },
})
export default class Archive extends Vue {
  public news: TDNews[] | null = null;
  public limit = 10;

  mounted(): void {
    this.loadArchive();
  }

  @Watch('page')
  public loadArchive(): void {
    this.news = null;
    const skip = (this.page - 1) * this.limit;

    fetch(`${backendUrl}/newsroom?skip=${skip}&limit=${this.limit}`)
      .then((res) => res.json())
      .then((res) => {
        this.news = res;
      });
  }

  get page(): number {
    const page = this.$route.params.page;
    if (page && !isNaN(+page)) return +page;
    return 1;
  }

  public prev(): void {
    if (this.page > 1) {
      this.openArchive(this.page - 1);
    }
  }

  public next(): void {
    this.openArchive(this.page + 1);
  }

  private openArchive(page?: number) {
    this.$router.push({
      name: 'archive',
      params: { page: `${page}` },
    });
  }
}
</script>

<style lang="scss" scoped>
.view-archive {
  min-height: 80vh;
  .current-page {
    padding: 0 30px;
    font-weight: 600;
    color: rgba(var(--vm-color-secondary), 1);
  }
}
</style>
