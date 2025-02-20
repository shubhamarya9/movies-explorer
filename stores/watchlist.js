import { defineStore } from "pinia";

export const useWatchlistStore = defineStore("watchlist", {
  state: () => ({
    movies: [],
  }),
  actions: {
    toggleWatchlist(movie) {
      const exists = this.movies.find((m) => m.id === movie.id);
      if (exists) {
        this.movies = this.movies.filter((m) => m.id !== movie.id);
      } else {
        this.movies.push(movie);
      }
      localStorage.setItem("watchlist", JSON.stringify(this.movies));
    },
    isInWatchlist(movie) {
      return this.movies.some((m) => m.id === movie.id);
    },
  },
  hydrate(state) {
    state.movies = JSON.parse(localStorage.getItem("watchlist") || "[]");
  },
});
