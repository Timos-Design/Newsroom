/* eslint-disable */
import { TDNews, TDProject } from '@/utils/interfaces';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [],
    projectIds: [],
    news: [],
    featured: [],
  },
  getters: {
    projects: (state: any): TDProject[] => {
      return state.projects;
    },
    projectIds: (state: any): string[] => {
      return state.projectIds;
    },
    news: (state: any): TDNews[] => {
      return state.news;
    },
    featured: (state: any): TDNews[] => {
      return state.featured;
    },
  },
  mutations: {
    projects(state: any, projects: TDProject[]) {
      state.projects = projects;
    },
    projectIds(state: any, projectIds: string[]) {
      state.projectIds = projectIds;
    },
    news(state: any, news: TDNews[]) {
      state.news = news;
    },
    featured(state: any, featured: TDNews[]) {
      state.featured = featured;
    },
  },
});
