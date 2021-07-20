<template>
  <div class="view-nr-archive-list" v-if="news">
    <div v-for="k in Object.keys(groups)" :key="k">
      <div class="news-title" v-text="k" />
      <NRGridSmall :news="groups[k]" />
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import { TDNews } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';
import NRGridSmall from '../grids/NRGridSmall.vue';

@Component({
  components: {
    NRGridSmall,
  },
})
export default class NRArchiveList extends Vue {
  @Prop() news!: TDNews[];

  public get groups(): Record<string, TDNews[]> {
    const obj: Record<string, TDNews[]> = {};
    (this.news || []).forEach((x) => {
      const key = Intl.DateTimeFormat('en', {
        month: 'long',
        year: 'numeric',
      }).format(x.timestamp);

      if (Object.keys(obj).includes(key)) obj[key].push(x);
      else obj[key] = [x];
    });
    return obj;
  }
}
</script>

<style lang="scss" scoped>
.view-nr-archive-list {
  .news-title {
    color: rgba(var(--vm-color-secondary), 1);
  }
  @media only screen and (min-width: 400px) {
    /deep/ .image-wrapper {
      width: 174px;
    }
  }

  @media only screen and(min-width: 700px) {
    .nr-grid-small {
      grid-template-columns: repeat(1, 1fr);
      /deep/ .nr-news-small:nth-last-child(2) {
        border-bottom: 1px solid rgba(var(--vm-border), 1);
      }
    }
  }
}
</style>
