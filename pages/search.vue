<template>
  <div class="container mx-auto p-4">
    <input
      v-model="query"
      @input="fetchSearchResults"
      placeholder="Search movies..."
      class="p-2 border rounded w-full dark:text-black"
    />
    <div v-if="loading" class="text-center mt-4">Loading...</div>
    <div
      v-if="movies.length"
      class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
    >
      <div v-for="movie in movies" :key="movie.id">
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
import { ref, watch } from "vue";
import axios from "axios";

const query = ref("");
const movies = ref([]);
const loading = ref(false);
const config = useRuntimeConfig();
const API_KEY = config.public.TMDB_API_KEY;

const fetchSearchResults = async () => {
  if (!query.value.trim()) {
    movies.value = [];
    return;
  }
  loading.value = true;
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query.value}&api_key=${API_KEY}`
    );
    movies.value = res.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
  } finally {
    loading.value = false;
  }
};

watch(query, fetchSearchResults);

const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
</script>
