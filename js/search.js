(function () {
  var input = document.getElementById("search-input");
  var results = document.getElementById("search-results");
  if (!input || !results) return;

  var indexUrl = input.getAttribute("data-index") || "/index.json";
  var items = [];
  var loaded = false;

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render(list, query) {
    if (!query) {
      results.innerHTML = '<p class="search-hint">Start typing to search titles, summaries and tags across every post.</p>';
      return;
    }
    if (list.length === 0) {
      results.innerHTML = '<p class="search-empty">No posts found for &ldquo;' + escapeHtml(query) + '&rdquo;.</p>';
      return;
    }
    var html = '<ul class="post-list">';
    list.forEach(function (item) {
      html += '<li class="post-item">' +
        '<span class="post-item__date">' + escapeHtml(item.date || "") + "</span>" +
        '<h2 class="post-item__title"><a href="' + item.permalink + '">' + escapeHtml(item.title) + "</a></h2>";
      if (item.summary) {
        html += '<p class="post-item__summary">' + escapeHtml(item.summary) + "</p>";
      }
      html += "</li>";
    });
    html += "</ul>";
    results.innerHTML = html;
  }

  function search(query) {
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];
    return items.filter(function (item) {
      var haystack = (item.title + " " + item.summary + " " + (item.tags || []).join(" ") + " " + (item.categories || []).join(" ")).toLowerCase();
      return terms.every(function (t) { return haystack.indexOf(t) !== -1; });
    }).slice(0, 40);
  }

  function handleInput() {
    var query = input.value.trim();
    if (!loaded) return;
    render(search(query), query);
  }

  render([], "");

  fetch(indexUrl)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      items = data;
      loaded = true;
      handleInput();
    })
    .catch(function () {
      results.innerHTML = '<p class="search-empty">Search index failed to load.</p>';
    });

  input.addEventListener("input", handleInput);

  var params = new URLSearchParams(window.location.search);
  var q = params.get("q");
  if (q) input.value = q;
})();
