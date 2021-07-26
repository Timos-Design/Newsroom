<template>
  <div class="view-project">
    <vm-title :title="projectName || param" subtitle="Latest news" />
    <br />
    <NRGridLarge :news="latestNews" />

    <template v-if="olderNews.length > 0">
      <br /><br />
      <vm-title title="Older News" />
      <br />
      <vm-divider />
      <NRGridSmall :news="olderNews" />
      <vm-divider />

      <template v-if="olderNews.length === 8">
        <br />
        <div center>
          <vm-link routeName="archive">
            View more <i class="ti-chevron-right" />
          </vm-link>
        </div>
      </template>
    </template>
    <br v-else />
  </div>
</template>

<script lang="ts">
import NRGridLarge from '@/components/grids/NRGridLarge.vue';
import NRGridSmall from '@/components/grids/NRGridSmall.vue';
import { backendUrl } from '@/utils/constants';
import { getProject } from '@/utils/functions';
import { TDNews, TDProject } from '@/utils/interfaces';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  components: {
    NRGridLarge,
    NRGridSmall,
  },
})
export default class Project extends Vue {
  public news: TDNews[] = [];
  public loading = false;

  mounted(): void {
    this.loadNews();
  }

  @Watch('$store.state.projects', { immediate: true, deep: true })
  @Watch('$route.params.project', { immediate: true })
  public loadNews(): void {
    if (this.loading) return;
    if (!this.project) return;
    this.loading = true;
    this.news = [];

    fetch(`${backendUrl}/newsroom/project/${this.project.id}?limit=17`)
      .then((res) => res.json())
      .then((res) => {
        this.news = res;
        this.loading = false;
      });
  }

  get param(): string {
    return this.$route.params.project;
  }

  get project(): TDProject | null {
    return getProject(this.param);
  }

  get projectName(): string | null {
    return this.project ? this.project.title : null;
  }

  get latestNews(): TDNews[] {
    return [...this.news].slice(0, Math.min(this.news.length, 9));
  }

  get olderNews(): TDNews[] {
    return [...this.news].slice(
      Math.min(this.news.length, 9),
      Math.min(this.news.length, 17)
    );
  }
}
</script>

<style lang="scss" scoped>
.view-project {
  //
}
</style>
