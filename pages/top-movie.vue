<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Top Movies</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
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
import { ref, onMounted } from "vue";
import axios from "axios";

const movies = ref([]);
const loading = ref(true);
const config = useRuntimeConfig();
const API_KEY = config.public.TMDB_API_KEY;

const fetchTopMovies = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );
    movies.value = res.data.results;
  } catch (error) {
    console.error("Error fetching top movies:", error);
  } finally {
    loading.value = false;
  }
};

const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;

onMounted(fetchTopMovies);
</script>
