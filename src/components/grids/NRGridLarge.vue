<template>
  <div class="nr-grid-large">
    <NRNewsLarge v-for="n in news" :key="n.id" :news="n" />
  </div>
</template>

<script lang="ts">
import { TDNews } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';
import NRNewsLarge from '../news/NRNewsLarge.vue';

@Component({
  components: {
    NRNewsLarge,
  },
})
export default class NRGridLarge extends Vue {
  @Prop() news!: TDNews[];
}
</script>

<style lang="scss" scoped>
.nr-grid-large {
  display: grid;
  grid-gap: 30px;

  @media only screen and(min-width: 520px) {
    grid-template-columns: repeat(6, 1fr);

    > a {
      grid-column: span 3;
      @media only screen and(min-width: 800px) {
        grid-column: span 2;
      }
    }

    :first-child {
      grid-column: span 6;
    }
    :nth-child(2),
    :nth-child(3) {
      grid-column: span 3;
      @media only screen and(min-width: 580px) {
        grid-column: span 3;
      }
    }
  }
}
</style>
