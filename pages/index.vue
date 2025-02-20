<template>
  <div class="p-8 mx-8">
    <h1 class="text-3xl font-bold mb-4">Trending Movies</h1>
    <div v-if="loading" class="text-center text-3xl">Loading...</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-7 gap-4">
      <div v-for="movie in trendingMovies" :key="movie.id" class="movie-card">
        <NuxtLink :to="`/movie/${movie.id}`">
          <img
            :src="getImageUrl(movie.poster_path)"
            class="rounded-lg shadow-sm"
          />
          <p class="text-center mt-2">{{ movie.title }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const trendingMovies = ref([]);
const loading = ref(true);
const config = useRuntimeConfig();
const API_KEY = config.public.TMDB_API_KEY;

const fetchTrendingMovies = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    trendingMovies.value = res.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
  } finally {
    loading.value = false;
  }
};

const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;

onMounted(fetchTrendingMovies);
</script>

<style scoped>
.movie-card img {
  width: 100%;
  height: auto;
}
</style>
