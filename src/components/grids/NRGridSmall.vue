<template>
  <div class="nr-grid-small">
    <NRNewsSmall v-for="n in news" :key="n.id" :news="n" />
  </div>
</template>

<script lang="ts">
import { TDNews } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';
import NRNewsSmall from '../news/NRNewsSmall.vue';

@Component({
  components: {
    NRNewsSmall,
  },
})
export default class NRGridSmall extends Vue {
  @Prop() news!: TDNews[];
}
</script>

<style lang="scss" scoped>
.nr-grid-small {
  display: grid;
  grid-gap: 0 30px;

  .nr-news-small:not(:last-child) {
    border-bottom: 1px solid rgba(var(--vm-border), 1);
  }

  @media only screen and(min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    .nr-news-small:nth-last-child(2) {
      border-bottom: none;
    }
  }
}
</style>
