const baseUrl = 'https://rickandmortyapi.com/api/character';

const container = document.querySelector('.cardsBox');


function getCharacters(page) {
   fetch(`${baseUrl}/?page=${page}`)
      .then(response => response.json())
      .then(data => {
         renderCards(data.results);
         renderPagination(data.info);
      });

}

getCharacters();

function renderCards(data) {
   container.innerHTML = '';
   data.forEach(cardData => {
      container.innerHTML += `
         <div class="card" style="width: 18rem;">
         <img src="${cardData.image}" class="card-img-top" alt="...">
         <div class="card-body">
            <h5 class="card-title">${cardData.name}</h5>
            <p class="card-text">${cardData.species}</p>
            <a href="#" class="btn btn-primary">Detailes</a>
         </div>
         </div>
      `;
   });
}
let currentPage = 1;
function renderPagination(info){
   
   const paginationBox = document.querySelector('.pagination');
   paginationBox.innerHTML = '';
   paginationBox.innerHTML += `
      <li class="page-item prevPage">
         <a class="page-link" href="#" aria-label="Previous">
         <span aria-hidden="true">&laquo;</span>
         </a>
      </li>
   `;
   paginationBox.innerHTML += `
      <li class="page-item"><a class="page-link" href="#">${currentPage}</a></li>
   `;

   paginationBox.innerHTML += `
      <li class="page-item nextPage">
         <a class="page-link" href="#" aria-label="Next">
         <span aria-hidden="true">&raquo;</span>
         </a>
      </li>
   `;
   const prevPage = document.querySelector('.prevPage');
   const nextPage = document.querySelector('.nextPage');

   nextPage.addEventListener('click', () => {
      currentPage++;

      console.log('next page');

      getCharacters(currentPage);
      
   })
   prevPage.addEventListener('click', () => {
      console.log('previous page');
      if(currentPage > 1){
         currentPage--;
         getCharacters(currentPage);
      }
      

   })
}



























// function renderCards(data) {

