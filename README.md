# 🎬 Cine-Nook

### 🔗 **[👉 Click Here to View the Live Demo!](https://your-vercel-link.vercel.app)** 🚀

Cine-Nook is a responsive movie search and discovery web application. This project demonstrates how to connect a modern **React 19** frontend with **Appwrite's backend-as-a-service** database, while optimizing API requests for real-world performance.

---

## 💡 Key Engineering Highlights 

*   **API & Database Integration:** Fetches real-time movie listings from the TMDB API and dynamically logs user search traffic into an **Appwrite** database table.
*   **Performance Optimization (Debouncing):** Uses a custom debounced search state. Instead of fetching data on every keystroke (which causes API throttling), it waits for the user to finish typing (`500ms`), saving network requests.
*   **Modern CSS Architecture:** Built using the utility-first **Tailwind CSS v4** engine for clean, maintainable, and responsive layouts.
*   **Clean Architecture:** Built on **React 19 + Vite** for fast performance, using clean component breakdown (`Search`, `MovieCard`, `Spinner`) and reusable modular services (`appwrite.js`).