<template>
  <div class="view-news">
    <vm-flow flow="column" v-if="loading">
      <br />
      <vm-spinner />
      <p>Loading news...</p>
    </vm-flow>

    <vm-flow flow="column" v-else-if="!news || !news.id">
      <lottie-animation width="80%" path="animations/404.json" />
      <h2>News not found</h2>

      <form @submit.prevent.stop="search">
        <vm-input
          icon="ti-lens"
          placeholder="Search Newsroom"
          v-model="query"
        />
      </form>
      <br />
      <vm-link routeName="home"><i class="ti-chevron-left" /> Home</vm-link>
    </vm-flow>

    <template v-else>
      <br />
      <div class="news-header">
        <div class="news-type" :type="news.type">{{ news.type }}</div>
        <div class="news-title">{{ news.title }}</div>
        <vm-flow>
          <div class="news-date">
            {{ $fmt(news.timestamp) }}
          </div>
          <div>
            <vm-button
              :round="true"
              variant="transparent"
              icon="ti-twitter"
              @click="tweet"
            />
            <vm-button
              :round="true"
              variant="transparent"
              icon="ti-mail"
              :href="mail"
            />
            <vm-button
              :round="true"
              variant="transparent"
              icon="ti-link"
              @click="copy"
            />
            <vm-button
              :round="true"
              variant="transparent"
              icon="ti-share"
              @click="share"
            />
          </div>
        </vm-flow>
      </div>

      <vm-divider />
      <br />

      <vm-image width="100%" :src="news.thumbnail" />

      <div class="news-content" v-html="news.content" />

      <template v-if="other && other.length > 0">
        <vm-flow>
          <vm-title title="Other news" :subtitle="project" />
          <vm-link :to="{ name: 'project', params: { project } }">
            view all <i class="ti-chevron-right" />
          </vm-link>
        </vm-flow>
        <NRGridSmall :news="other" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import NRGridSmall from '@/components/grids/NRGridSmall.vue';
import { backendUrl, NOOP } from '@/utils/constants';
import {
  copyToClipboard,
  getNews,
  getProjectName,
  shuffleArray,
} from '@/utils/functions';
import { TDNews } from '@/utils/interfaces';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  components: {
    NRGridSmall,
  },
})
export default class News extends Vue {
  public news: TDNews | null = null;
  public loading = false;
  public other: TDNews[] = [];
  public query = '';

  mounted(): void {
    this.loadNews();
  }

  get project(): string | null {
    if (!this.news) return null;
    return getProjectName(this.news.project);
  }

  @Watch('$route.params.id', { immediate: true })
  public async loadNews(): Promise<void> {
    if (this.loading) return;
    this.other = [];
    this.loading = true;
    this.query = '';

    const split = this.$route.params.id.split('.');
    const id = split[split.length - 1];

    getNews(id).then((news) => {
      this.news = news;
      this.loading = false;

      if (news.id) {
        fetch(`${backendUrl}/newsroom/project/${this.news.project}?limit=9`)
          .then((res) => res.json())
          .then((o: TDNews[]) => {
            o = shuffleArray(o.filter((x) => x.id !== news.id)).slice(0, 2);
            this.other = o;
          });
      }
    });
  }

  public search(): void {
    if (this.query.length > 0) {
      this.$router
        .push({ name: 'search', params: { query: this.query } })
        .catch(NOOP);
    }
  }

  public share(): void {
    if (!this.news) return;
    navigator.share({
      title: this.news.title,
      text: 'I want to share this news with you!',
      url: window.location.href,
    });
  }

  public copy(): void {
    if (!this.news) return;
    copyToClipboard(window.location.href);
    this.$vm.sendNotification({
      title: 'Copied url to clipboard',
      text: this.news.title,
      image: this.news.thumbnail,
    });
  }

  public get mail(): string | null {
    if (!this.news) return null;
    return `mailto:?subject=${encodeURI(this.news.title)}&body=${encodeURI(
      window.location.href
    )}`;
  }

  public tweet(): void {
    if (!this.news) return;
    const url = `https://twitter.com/intent/tweet?url=${encodeURI(
      window.location.href
    )}&text=${this.news.title}`;
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=500,left=100,top=100`;
    window.open(url, 'share-twitter-' + this.$route.params.news, params);
  }
}
</script>

<style lang="scss">
.view-news form {
  *:after {
    background: none !important;
  }
  .vm-input--input {
    padding: 5px 15px;
  }
}
</style>

<style lang="scss" scoped>
.view-news {
  form {
    display: flex;
    width: 100%;
    max-width: 300px;
  }

  .news-header {
    font-size: 24px;
    .vm-flow {
      margin-top: 5px;
      font-size: 20px;
      .news-date {
        margin-top: 0;
      }
    }
  }
  img {
    border-radius: $border-radius;
  }
  .news-content {
    max-width: 90%;
    font-size: 18px;
    margin: 20px auto;
    margin-bottom: 80px;
    white-space: pre-line;
  }
}
</style>
