<template>
  <div class="nr-featured" v-if="news">
    <div class="featured-news" @scroll="scrolled" ref="slider">
      <router-link
        v-for="n in news"
        :key="n.id"
        :to="{ name: 'news', params: { id: n.title + '.' + n.id } }"
      >
        <vm-card type="fullscreen" :image="n.featured">
          <div class="news-container">
            <div class="news-type" :type="n.type">{{ n.type }}</div>
            <div class="news-title">{{ n.title }}</div>
            <div class="news-date">{{ $fmt(n.timestamp) }}</div>
          </div>
        </vm-card>
      </router-link>
    </div>

    <vm-flow v-if="news.length > 1">
      <div>
        <i
          class="ti-circle"
          v-for="(_, i) in news"
          :active="i === slide"
          :key="i"
          @click="slideTo(i)"
        />
      </div>
      <div :key="$vm.theme">
        <vm-button
          icon="ti-chevron-left"
          variant="border"
          background="color"
          color="background"
          :round="true"
          @click="slideTo(slide - 1)"
        />
        <vm-button
          icon="ti-chevron-right"
          variant="border"
          background="color"
          color="background"
          :round="true"
          @click="slideTo(slide + 1)"
        />
      </div>
    </vm-flow>
  </div>
</template>

<script lang="ts">
import { TDNews } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class NRFeatured extends Vue {
  @Prop() news!: TDNews[];

  public slide = 0;
  public timer = 0;

  mounted(): void {
    this.autoSlide();
  }

  public autoSlide(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.slideTo(++this.slide % this.news.length);
    }, 5000);
  }

  public scrolled(event: Event): void {
    if (!event.target) return;
    if (!this.news || this.news.length < 2) return;
    const { scrollWidth, scrollLeft } = event.target as HTMLElement;
    const slideWidth = scrollWidth / this.news.length;
    this.slide = Math.floor(scrollLeft / slideWidth + 0.5);
  }

  public slideTo(slide: number): void {
    if (slide < 0) slide = this.news.length - 1;
    else if (slide >= this.news.length) slide = 0;

    const slider = this.$refs.slider as HTMLElement;
    this.autoSlide();
    if (!slider) return;
    const { scrollWidth } = slider;
    const slideWidth = scrollWidth / this.news.length;
    slider.scrollLeft = slideWidth * slide;
  }
}
</script>

<style lang="scss" scoped>
.nr-featured {
  margin: 0 -5vw;

  .news-container {
    background: linear-gradient(to bottom, transparent, black);
    color: #fff;
    margin: -20px {
      top: 174px;
    }
    padding: 20px;
    border-radius: 0 0 $border-radius $border-radius;
  }

  .vm-flow {
    width: calc(100% - 10vw);
    margin: 0 auto;
    margin-top: 15px;

    i.ti-circle {
      margin-right: 7.5px;
      cursor: pointer;
      font-size: 14px;
      opacity: 0.5;
      color: rgba(var(--vm-color-secondary), 1);
      transition: 0.1s ease-in-out;
      &:not([active]):not(:hover) {
        transition-delay: 0.1s;
      }
      &[active] {
        color: rgba(var(--vm-color), 1);
      }

      &:hover,
      &[active] {
        opacity: 1;
      }
    }
  }

  .featured-news {
    display: flex;
    width: 100%;

    overflow: scroll visible;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    flex-grow: 1;

    &::-webkit-scrollbar {
      display: none;
    }

    a {
      width: 90vw;
      max-width: 800px;
      flex-shrink: 0;
      margin: 0 15px;
      text-decoration: none;
      scroll-snap-align: center;
      transition: 0.1s ease-in-out;
      &:first-child {
        margin-left: 5vw;
      }
      &:last-child {
        margin-right: 5vw;
      }
      .vm-card:hover {
        transform: none;
      }
    }
  }
}
</style>
