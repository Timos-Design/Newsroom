<template>
  <router-link
    v-if="news"
    class="nr-news-large"
    :to="{ name: 'news', params: { id: news.title + '.' + news.id } }"
  >
    <div class="image-wrapper">
      <img :src="news.thumbnail" alt="" />
    </div>
    <div class="news-container">
      <div class="news-type" :type="news.type">{{ news.type }}</div>
      <div class="news-title">{{ news.title }}</div>
      <div class="news-date">{{ $fmt(news.timestamp) }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { TDNews } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class NRNewsLarge extends Vue {
  @Prop() news!: TDNews;
}
</script>

<style lang="scss" scoped>
.nr-news-large {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;

  border-radius: $border-radius;
  background: rgba(var(--vm-background), 1);
  box-shadow: 4px 8px 20px rgba(#000, 0.05);

  transition: 0.1s ease-in-out;
  &:hover {
    box-shadow: 4px 8px 20px rgba(#000, 0.08);
    transform: scale(1.0124);
  }
  &:active {
    transform: scale(0.9876);
  }

  @media only screen and(min-width: 400px) {
    &:first-child {
      flex-direction: row;
      .image-wrapper {
        height: 240px;
        width: 60%;
        img {
          border-radius: $border-radius 0 0 $border-radius;
        }
      }
    }
  }

  .image-wrapper {
    height: 200px;
    background: rgba(var(--vm-paragraph), 1);
    img {
      border-radius: $border-radius $border-radius 0 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .news-container {
    padding: 20px;
    display: flex;
    flex: 1 1 0px;
    flex-direction: column;
  }
}
</style>
