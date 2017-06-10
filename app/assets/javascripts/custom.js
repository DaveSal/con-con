$(function() { $('#publication_content').froalaEditor() });

function changePublicationsVisibility() {
  var activeButton = document.querySelector('#activeButton');
  var soldButton = document.querySelector('#soldButton');

  var activeDiv = document.querySelector('#active');
  var soldDiv = document.querySelector('#sold');

  function showActivePublications() {
    this.style.display = 'block';
    soldDiv.style.display = 'none';
  }

  function showSoldPublications() {
    this.style.display = 'block';
    activeDiv.style.display = 'none';
  }

  if (activeButton) activeButton.addEventListener('click', showActivePublications);
  if (soldButton) soldButton.addEventListener('click', showSoldPublications);
}

changePublicationsVisibility();
