<template>
  <div class="container mx-auto p-4">
    <div v-if="loading">Loading movie details...</div>
    <div v-else>
      <div class="flex flex-row">
        <img
          :src="getImageUrl(movie.poster_path)"
          class="rounded-lg shadow-md"
        />
        <div class="flex flex-col p-4">
          <h1 class="text-3xl font-bold">{{ movie.title }}</h1>
          <p class="mt-2">{{ movie.overview }}</p>
          <div class="flex-wrap">
            <button
              @click="toggleWatchlist"
              class="mt-4 p-2 bg-blue-500 dark:bg-blue-400 text-white rounded"
            >
              {{ isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useWatchlistStore } from "~/stores/watchlist";

const route = useRoute();
const movie = ref({});
const loading = ref(true);
const config = useRuntimeConfig();
const API_KEY = config.public.TMDB_API_KEY;
const watchlistStore = useWatchlistStore();

const fetchMovieDetails = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${API_KEY}`
    );
    movie.value = res.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  } finally {
    loading.value = false;
  }
};

const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
const isInWatchlist = computed(() => watchlistStore.isInWatchlist(movie.value));
const toggleWatchlist = () => watchlistStore.toggleWatchlist(movie.value);

onMounted(fetchMovieDetails);
</script>
