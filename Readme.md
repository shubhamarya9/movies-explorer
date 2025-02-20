# Movie & TV Explorer

Welcome to **Movie & TV Explorer**, a Nuxt 3 project that lets you browse trending movies, top-rated films, TV shows, and manage your personal wishlist. It's built with performance and user experience in mind, featuring a **dark/light mode toggle**, smooth navigation, and real-time state management with Pinia.

## 🚀 Features

- **Trending Movies & TV Shows** – Browse the latest trending content.
- **Top Movies & TV Shows** – Access the highest-rated content from TMDb.
- **Wishlist** – Save movies & shows, with a live count indicator.
- **Dark/Light Mode** – Tailwind-powered theme toggle.
- **Fast & Optimized** – Nuxt 3 for SSR, Pinia for state management.

## Why This Tech Stack?

Choosing the right stack was important to balance performance, scalability, and developer experience. Here's why each technology was selected:

Nuxt 3: Provides server-side rendering (SSR) and static site generation (SSG) for faster performance and better SEO.

Pinia: Offers a simple yet powerful state management system, making it easy to manage the wishlist across components.

Tailwind CSS: Ensures rapid UI development with a modern, utility-first approach while keeping the design responsive and clean.

TMDb API: A reliable and comprehensive database for fetching real-time movie and TV show data.

Axios: Provides efficient API handling with built-in request cancellation and error management.

Vercel: Chosen for its seamless deployment workflow and optimized performance for Nuxt applications.

## 🛠️ Installation & Setup

Clone the repo and install dependencys:

```sh
git clone https://github.com/yourusername/movies-explorer.git
cd movies-explorer
npm install
```

Create a `.env` file and add your TMDb API Key:

```
TMDB_API_KEY=your_tmdb_api_key_here
```

Run the project:

```sh
npm run dev
```

## 📝 Code Sample & Explanation

Here’s a core part of the app: **Fetching movie details and handling wishlist state.**

```vue
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useWatchlistStore } from "~/stores/watchlist";

const route = useRoute();
const movie = ref(null);
const loading = ref(true);
const error = ref(null);
const config = useRuntimeConfig();
const API_KEY = config.public.TMDB_API_KEY;
const watchlistStore = useWatchlistStore();

const fetchMovieDetails = async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${API_KEY}`
    );
    movie.value = res.data;
  } catch (err) {
    error.value = "Failed to fetch movie details.";
  } finally {
    loading.value = false;
  }
};

const isInWatchlist = computed(() => watchlistStore.isInWatchlist(movie.value));
const toggleWatchlist = () => watchlistStore.toggleWatchlist(movie.value);

onMounted(fetchMovieDetails);
</script>
```

### **💡 Why This Approach?**

✔ **Reactive Data Handling** – Vue's `ref()` and `computed()` keep UI in sync.
✔ **State Management** – Pinia store handles wishlist operations globally.
✔ **Performance** – `onMounted()` ensures API is called at the right time.
✔ **Error Handling** – Provides feedback if API fails.

## 🌍 Deployment Guide

To deploy on **Vercel**:

1. Push your repo to GitHub.
2. Connect to **Vercel** and import the project.
3. Add your **API Key** in Vercel's environment variables.
4. Deploy!

## 🚀 Future Enhancments

- 🎭 **Genre Filters** – Allow users to filter by genre.
- 🎞️ **Trailers** – Embed YouTube trailers for movies & shows.
- 🌎 **Multi-language Support** – Display content in different languages.

## 🤝 Contributing
