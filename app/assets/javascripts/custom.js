$(function() { $('#publication_content').froalaEditor() });

function changePublicationsVisibility() {
  var activeButton = document.querySelector('#activeButton');
  var soldButton = document.querySelector('#soldButton');

  var activeDiv = document.querySelector('#active');
  var soldDiv = document.querySelector('#sold');

  function showActivePublications() {
    activeDiv.style.display = 'block';
    soldDiv.style.display = 'none';
  }

  function showSoldPublications() {
    soldDiv.style.display = 'block';
    activeDiv.style.display = 'none';
  }

  if (activeButton) activeButton.addEventListener('click', showActivePublications);
  if (soldButton) soldButton.addEventListener('click', showSoldPublications);
}

function dateToLocaleRu() {
  var publicationDateString = document.querySelector('#publication-date').innerHTML;
  var publicationDate = new Date(publicationDateString);

  var options = { day: 'numeric', month: 'long', year: 'numeric' };

  document.querySelector('#publication-date').innerHTML = publicationDate.toLocaleString('ru-RU', options);
}

changePublicationsVisibility();
dateToLocaleRu();
