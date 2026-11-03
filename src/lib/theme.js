// Runs synchronously in <head>, before the first paint or React hydration.
function initializeTheme() {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let choice;
  try { choice = localStorage.getItem('portfolio-theme'); } catch {}
  const valid = value => value === 'dark' || value === 'light';
  const apply = () => {
    root.dataset.theme = valid(choice) ? choice : system.matches ? 'dark' : 'light';
    window.dispatchEvent(new Event('portfolio-theme-change'));
  };
  window.portfolioTheme = {
    set(value) {
      choice = value;
      try { localStorage.setItem('portfolio-theme', value); } catch {}
      apply();
    },
  };
  system.addEventListener('change', apply);
  window.addEventListener('storage', event => {
    if (event.key === 'portfolio-theme' || event.key === null) {
      choice = event.newValue;
      apply();
    }
  });
  apply();
}

export const themeScript = `(${initializeTheme.toString()})();`;
