chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req === 'save') {
    saveBrands().then(res);
  } else if (req === 'load') {
    loadBrands().then(res);
  } else if (req === 'clear') {
    clearBrands().then(res);
  }
  return true;
});

async function saveBrands() {
  const filters = getCurrentFilters();
  const brands = filters.find(({ name }) => name === 'Brand');
  await chrome.storage.sync.set({ 'asos-extension': brands });
}

async function loadBrands() {
  const { 'asos-extension': brands } = await chrome.storage.sync.get('asos-extension');
  if (!brands) {
    return 'No save';
  }

  const filters = getCurrentFilters();
  const brandsIndex = filters.findIndex(({ name }) => name === 'Brand');
  if (brandsIndex) {
    filters[brandsIndex].values = brands.values;
  } else {
    filters.push(brands);
  }

  setUrl(filters);
}

async function clearBrands() {
  await chrome.storage.sync.clear();
}

function getCurrentFilters() {
  const url = new URL(window.location);
  const refinements = url.searchParams.get('refine');

  const allFilters = getAllFilters();

  return refinements.split('|').map((attr) => {
    const [id, values] = attr.split(':');
    return {
      id,
      name: allFilters[id],
      values: values.split(','),
    };
  });
}

function getAllFilters() {
  const list = document.querySelector('#mediumRefinements');
  const listItems = Array.from(list.children);

  return listItems.reduce((filters, item) => {
    const id = item.getAttribute('data-dropdown-id');
    filters[id] = item.querySelector('button').textContent;
    return filters;
  }, {});
}

function filtersToString(filters) {
  return filters.map(({ id, values }) => `${id}:${values.join(',')}`).join('|');
}

function setUrl(filters) {
  const query = filtersToString(filters);
  const url = new URL(window.location);
  url.searchParams.set('refine', query);
  window.location.replace(url.href);
}
