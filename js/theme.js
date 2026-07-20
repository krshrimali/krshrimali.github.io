(function () {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function currentTheme() {
    var attr = document.documentElement.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function label(theme) {
    return theme === "dark" ? "☀ LIGHT" : "☾ DARK";
  }

  function render() {
    var theme = currentTheme();
    btn.textContent = label(theme);
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  btn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    render();
  });

  render();
})();
