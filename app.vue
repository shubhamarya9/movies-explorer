<template>
  <div
    :class="{ dark: isDarkMode }"
    class="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300"
  >
    <nav class="tabs-container">
      <NuxtLink
        to="/"
        class="tab"
        :class="{ active: route.path === '/' }"
        @click="setActiveTab(0)"
      >
        Trending
      </NuxtLink>
      <NuxtLink
        to="/top-movie"
        class="tab"
        :class="{ active: route.path === '/top-movie' }"
        @click="setActiveTab(1)"
      >
        Top Movies
      </NuxtLink>
      <NuxtLink
        to="/top-tv"
        class="tab"
        :class="{ active: route.path === '/top-tv' }"
        @click="setActiveTab(2)"
      >
        Top TV
      </NuxtLink>
      <NuxtLink
        to="/wishlist"
        class="tab"
        :class="{ active: route.path === '/wishlist' }"
        @click="setActiveTab(3)"
      >
        Wishlist
        <span v-if="wishlistCount > 0" class="wishlist-badge">
          {{ wishlistCount }}
        </span>
      </NuxtLink>
      <NuxtLink
        to="/search"
        class="tab"
        :class="{ active: route.path === '/search' }"
        @click="setActiveTab(4)"
      >
        Search 🔎
      </NuxtLink>
      <div class="underline" :style="{ left: `${activeTab * 120}px` }"></div>

      <!-- Dark Mode Toggle Button -->
      <button
        @click="toggleDarkMode"
        class="ml-auto p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
      >
        {{ isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode" }}
      </button>
    </nav>
    <NuxtPage />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useWatchlistStore } from "~/stores/watchlist";

const route = useRoute();
const activeTab = ref(0);
const watchlistStore = useWatchlistStore();
const isDarkMode = ref(false);
const wishlistCount = computed(() => watchlistStore.movies.length);

const setActiveTab = (index) => {
  activeTab.value = index;
};

// Watch route changes and update activeTab accordingly
watch(
  route,
  () => {
    switch (route.path) {
      case "/":
        activeTab.value = 0;
        break;
      case "/top-movies":
        activeTab.value = 1;
        break;
      case "/top-tv":
        activeTab.value = 2;
        break;
      case "/wishlist":
        activeTab.value = 3;
        break;
      case "/search":
        activeTab.value = 4;
        break;
    }
  },
  { immediate: true }
);

// Toggle Dark Mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
  updateDocumentTheme();
};

// Apply the theme to the document
const updateDocumentTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Load theme from localStorage
onMounted(() => {
  isDarkMode.value = localStorage.getItem("theme") === "dark";
  updateDocumentTheme();
});
</script>

<style scoped>
.tabs-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 2px solid #ddd;
  padding: 10px;
}

/* Light mode tab color */
.tab {
  padding: 10px 20px;
  text-decoration: none;
  font-weight: bold;
  color: #333; /* Default text color */
  position: relative;
}

/* Dark mode tab color */
.dark .tab {
  color: #ffffff !important; /* Force white text in dark mode */
}

/* Active tab in light mode */
.tab.active {
  color: #007bff;
}

/* Active tab in dark mode */
.dark .tab.active {
  color: #38bdf8; /* Tailwind Sky Blue */
}

/* Underline transition */
.underline {
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 120px; /* Adjust width based on tab size */
  background: #007bff; /* Blue for light mode */
  transition: left 0.3s ease, background-color 0.3s ease;
}

/* Dark mode underline */
.dark .underline {
  background: #38bdf8; /* Tailwind sky blue */
}
.wishlist-badge {
  background: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 6px;
}
</style>
