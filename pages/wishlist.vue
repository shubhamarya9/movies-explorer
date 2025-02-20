<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">My Wishlist</h1>
    <div v-if="!watchlist.length" class="text-center">No movies added yet.</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="movie in watchlist" :key="movie.id" class="movie-card">
        <NuxtLink :to="`/movie/${movie.id}`">
          <img
            :src="getImageUrl(movie.poster_path)"
            class="rounded-lg shadow-md"
          />
          <p class="text-center mt-2">{{ movie.title }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useWatchlistStore } from "~/stores/watchlist";

const watchlistStore = useWatchlistStore();
const watchlist = computed(() => watchlistStore.movies);

const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
</script>
