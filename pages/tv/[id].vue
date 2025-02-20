<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center">Loading TV show details...</div>
    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>
    <div v-else class="tv-details flex">
      <img
        v-if="tvShow.poster_path"
        :src="getImageUrl(tvShow.poster_path)"
        class="rounded-lg shadow-md mt-4"
      />
      <div class="flex-col p-4 m-2">
        <h1 class="text-3xl font-bold">
          {{ tvShow.name }}
          <span v-if="imdbRating" class="text-lg text-yellow-500 ml-2">
            ⭐ IMDb: {{ imdbRating }}/10
          </span>
        </h1>
        <p class="mt-4 text-lg">{{ tvShow.overview }}</p>
        <p class="mt-2 text-sm text-gray-600">
          First Air Date: {{ tvShow.first_air_date }}
        </p>
        <p class="mt-2 text-sm text-gray-600">
          TMDb Rating: {{ tvShow.vote_average }}/10 ({{ tvShow.vote_count }}
          votes)
        </p>

        <button
          @click="toggleWatchlist"
          class="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {{ isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist" }}
        </button>
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
const tvShow = ref(null);
const imdbRating = ref(null);
const loading = ref(true);
const error = ref(null);
const config = useRuntimeConfig();
const API_KEY = config.public.TMDB_API_KEY;
const watchlistStore = useWatchlistStore();

console.log("TV Show ID:", route.params.id);

const fetchTVShowDetails = async () => {
  try {
    if (!route.params.id) {
      throw new Error("TV Show ID is missing.");
    }

    const tvRes = await axios.get(
      `https://api.themoviedb.org/3/tv/${route.params.id}?api_key=${API_KEY}`
    );

    if (tvRes.status !== 200) {
      throw new Error("Failed to fetch TV show details.");
    }

    tvShow.value = tvRes.data;

    // Fetch IMDb rating using external IDs
    const externalRes = await axios.get(
      `https://api.themoviedb.org/3/tv/${route.params.id}/external_ids?api_key=${API_KEY}`
    );

    if (externalRes.data.imdb_id) {
      await fetchImdbRating(externalRes.data.imdb_id);
    }
  } catch (err) {
    console.error("Error fetching TV show details:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const fetchImdbRating = async (imdbId) => {
  try {
    const omdbApiKey = "YOUR_OMDB_API_KEY"; // Replace with your OMDb API key
    const omdbRes = await axios.get(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${omdbApiKey}`
    );

    if (omdbRes.data.imdbRating) {
      imdbRating.value = omdbRes.data.imdbRating;
    }
  } catch (err) {
    console.error("Error fetching IMDb rating:", err);
  }
};

const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;

const isInWatchlist = computed(() =>
  watchlistStore.isInWatchlist(tvShow.value)
);
const toggleWatchlist = () => watchlistStore.toggleWatchlist(tvShow.value);

onMounted(fetchTVShowDetails);
</script>
