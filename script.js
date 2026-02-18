const API_KEY = "e0b203e42e12587b6ce507b8aa452e8c";
const BASE = "https://api.themoviedb.org/3";
let page = 1;
let loading = false;

async function loadMovies() {
  if (loading) return;
  loading = true;

  const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await res.json();

  data.results.forEach(movie => {
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '';

    const card = document.createElement("a");
    card.href = "/" + movie.id;
    card.className = "card";
    card.innerHTML = `
      <img loading="lazy" src="${poster}">
      <h3>${movie.title}</h3>
    `;
    document.getElementById("movieGrid").appendChild(card);
  });

  page++;
  loading = false;
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    loadMovies();
  }
});
