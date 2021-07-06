<template>
  <router-link
    v-if="news"
    class="nr-news-small"
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
export default class NRNewsSmall extends Vue {
  @Prop() news!: TDNews;
}
</script>

<style lang="scss" scoped>
.nr-news-small {
  text-decoration: none;
  color: inherit;

  display: flex;
  align-items: center;
  padding: 15px 0;

  transition: 0.1s ease-in-out;
  &:hover {
    transform: scale(1.0124);
  }
  &:active {
    transform: scale(0.9876);
  }

  .image-wrapper {
    width: 100px;
    height: 100px;
    background: rgba(var(--vm-paragraph), 1);
    img {
      border-radius: $border-radius;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .news-container {
    padding-left: 20px;
    display: flex;
    flex: 1 1 0px;
    flex-direction: column;
  }
}
</style>
