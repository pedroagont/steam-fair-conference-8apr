// REQUIREMENTS
const queryString = document.getElementById('query-string');
const searchForm = document.getElementById('search-form');
const nasaImages = document.getElementById('nasa-images');

// LOGIC
const createImageItem = function (imageData) {
  const imageItem = `
    <article class="nasa-image">
      <img src="${imageData.links[0].href}" alt="">
    </article>
  `
  return imageItem;
}

const renderImageItems = function (imagesList) {
  nasaImages.innerHTML = '';
  for (const image of imagesList) {
    const nasaImageArticle = createImageItem(image);
    nasaImages.innerHTML = nasaImages.innerHTML + nasaImageArticle;
  }
}

const handleSubmit = function (e) {
  e.preventDefault();
  fetch(`https://images-api.nasa.gov/search?media_type=image&q=${queryString.value}`)
  .then(response => response.json())
  .then(data => data.collection.items)
  .then(items => renderImageItems(items))
  .catch(err => console.error(err));
}

// EVENT HANDLER
searchForm.addEventListener('submit', handleSubmit)
