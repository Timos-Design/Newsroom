<template>
  <div class="view-home">
    <vm-title title="Latest News" />
    <br />
    <NRGridLarge :news="latestNews" />

    <template v-if="featured && featured.length > 0">
      <br /><br />
      <vm-title title="Featured News" />
      <br />
      <NRFeatured :news="featured" />
    </template>

    <br />
    <vm-title title="Older News" />
    <br />
    <vm-divider />
    <NRGridSmall :news="olderNews" />
    <vm-divider />

    <br />
    <div center>
      <vm-link>View more <i class="ti-chevron-right" /></vm-link>
    </div>
  </div>
</template>

<script lang="ts">
import NRGridLarge from '@/components/grids/NRGridLarge.vue';
import NRGridSmall from '@/components/grids/NRGridSmall.vue';
import NRFeatured from '@/components/NRFeatured.vue';
import { TDNews } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    NRGridLarge,
    NRGridSmall,
    NRFeatured,
  },
})
export default class Home extends Vue {
  get news(): TDNews[] {
    return this.$store.getters.news;
  }

  get featured(): TDNews[] {
    return this.$store.getters.featured;
  }

  get latestNews(): TDNews[] {
    return this.news.slice(0, Math.min(this.news.length, 9));
  }

  get olderNews(): TDNews[] {
    return this.news.slice(
      Math.min(this.news.length, 9),
      Math.min(this.news.length, 17)
    );
  }
}
</script>

<style lang="scss" scoped>
.view-home {
}
</style>
