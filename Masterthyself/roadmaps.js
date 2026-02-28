  function switchPanel(type) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('panel-' + type).classList.add('active');
    document.querySelector('.' + type + '-tab').classList.add('active');
  }

  // Inject action buttons into every book card
  const searchIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`;
  const amazonIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 2C9.36 2 6 5.36 6 9.5c0 3.56 2.33 6.57 5.57 7.63-.08.52-.13 1.05-.13 1.59C11.44 21.17 14.27 24 17.76 24c1.2 0 2.32-.35 3.26-.95.28.62.65 1.19 1.1 1.68.14.15.35.2.54.13.19-.07.31-.25.31-.46v-3.28c1.26-1.3 2.03-3.06 2.03-5.02 0-3.94-3.2-7.1-7.5-7.1zM7.5 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`;
  const goodreadsIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.525 15.977V.49h-2.059v2.906h-.064c-.211-.455-.481-.891-.842-1.307-.36-.412-.767-.777-1.218-1.094-.451-.317-.956-.571-1.514-.762S12.638 0 12.03 0c-1.143 0-2.193.235-3.15.706-.957.47-1.781 1.103-2.473 1.898-.692.795-1.23 1.712-1.612 2.751-.381 1.04-.572 2.12-.572 3.245 0 1.125.191 2.205.572 3.245.383 1.04.92 1.957 1.612 2.751.692.796 1.516 1.429 2.473 1.898.957.471 2.007.706 3.15.706.684 0 1.33-.117 1.938-.351a5.78 5.78 0 0 0 1.573-.927c.452-.39.826-.841 1.122-1.352.298-.512.487-1.053.57-1.625h.064v3.178c0 .689-.073 1.348-.219 1.979a4.446 4.446 0 0 1-.736 1.664c-.34.481-.789.866-1.348 1.154-.559.289-1.24.433-2.042.433-.928 0-1.71-.194-2.349-.58-.637-.389-1.035-.973-1.19-1.756H5.494c.06.748.27 1.404.628 1.967s.826 1.035 1.4 1.416c.574.38 1.228.669 1.962.864.735.195 1.5.293 2.292.293 1.252 0 2.319-.178 3.199-.533.88-.355 1.6-.843 2.16-1.461.559-.618.967-1.348 1.22-2.19.253-.843.379-1.762.379-2.759h-.21zm-7.582-2.72c-.773 0-1.481-.158-2.122-.475a4.985 4.985 0 0 1-1.635-1.284 5.79 5.79 0 0 1-1.047-1.872 7.012 7.012 0 0 1-.364-2.283c0-.817.121-1.586.364-2.311.242-.724.589-1.36 1.047-1.905a4.985 4.985 0 0 1 1.635-1.284c.641-.317 1.349-.475 2.122-.475s1.481.158 2.122.475a4.985 4.985 0 0 1 1.635 1.284c.458.545.805 1.181 1.047 1.905.242.725.364 1.494.364 2.311 0 .817-.122 1.581-.364 2.283a5.79 5.79 0 0 1-1.047 1.872 4.985 4.985 0 0 1-1.635 1.284c-.641.317-1.349.475-2.122.475z"/></svg>`;
  const libraryIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;

  document.querySelectorAll('.book-card').forEach(card => {
    const titleEl = card.querySelector('.book-title');
    const authorEl = card.querySelector('.book-author');
    if (!titleEl) return;

    const title = titleEl.textContent.trim();
    const authorRaw = authorEl ? authorEl.textContent.split('·')[0].trim() : '';
    const query = encodeURIComponent(title + ' ' + authorRaw);

    const actions = document.createElement('div');
    actions.className = 'book-actions';

    actions.innerHTML = `
      <a class="book-btn" href="https://www.amazon.com/s?k=${query}" target="_blank" rel="noopener">${amazonIcon} Amazon</a>
      <a class="book-btn" href="https://www.goodreads.com/search?q=${query}" target="_blank" rel="noopener">${goodreadsIcon} Goodreads</a>
      <a class="book-btn" href="https://openlibrary.org/search?q=${query}" target="_blank" rel="noopener">${libraryIcon} Open Library</a>
      <a class="book-btn" href="https://www.google.com/search?q=${encodeURIComponent(title + ' ' + authorRaw + ' book')}" target="_blank" rel="noopener">${searchIcon} Search</a>
    `;

    card.appendChild(actions);
  });