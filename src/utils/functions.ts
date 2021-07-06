import store from '@/store';
import { aWeek, backendUrl } from './constants';
import { TDNews, TDProject } from './interfaces';

export function formatTimestamp(timestamp: number): string {
  return Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
    day: '2-digit',
    weekday: Date.now() - timestamp < aWeek ? 'long' : undefined,
  }).format(timestamp);
}

export async function getNews(id: string): Promise<TDNews> {
  return new Promise((resolve) => {
    const allNews: TDNews[] = store.getters.news;
    const news = allNews.filter((x) => x.id.toLowerCase().includes(id))[0];
    if (news) {
      resolve(news);
      return;
    }
    fetch(`${backendUrl}/newsroom/` + id)
      .then((res) => res.json())
      .then(resolve)
      .catch(resolve);
  });
}

export function getProjectName(id: string): string | null {
  return (
    (store.getters.projects as TDProject[])
      .filter((x) => x.id === id)
      .map((x) => x.title)[0] || null
  );
}

export function getProject(snippet: string): TDProject | null {
  return (
    (store.getters.projects as TDProject[]).filter((x) =>
      JSON.stringify(x).toLowerCase().includes(snippet.toLowerCase())
    )[0] || null
  );
}

export function shuffleArray(arr: TDNews[]): TDNews[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function copyToClipboard(text: string): void {
  const dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}
