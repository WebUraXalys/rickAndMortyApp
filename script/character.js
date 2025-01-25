const baseUrl = 'https://rickandmortyapi.com/api/character';

const container = document.querySelector('.cardsBox');

let currentPage = 1;
let currentGender = '';
let currentStatus = '';


function getCharacters(page, gender, status) {
   fetch(`${baseUrl}/?page=${page}&status=${status}&gender=${gender}`)
      .then(response => response.json())
      .then(data => {
         renderCards(data.results);
         renderPagination(data.info);
      });

}

getCharacters(currentPage, currentGender, currentStatus);

function renderCards(data) {
   container.innerHTML = '';
   data.forEach(cardData => {
      container.innerHTML += `
         <div class="card" style="width: 18rem;">
         <img src="${cardData.image}" class="card-img-top" alt="...">
         <div class="card-body">
            <h5 class="card-title">${cardData.name}</h5>
            <p class="card-text">${cardData.species}</p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${cardData.id}">Details</button>
         </div>
         </div>
      `;
   });
}
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
   if(info.next == null){
      nextPage.classList.add('disabled');
   } else{
      nextPage.addEventListener('click', () => {
         currentPage++;
         getCharacters(currentPage, currentGender, currentStatus);
      })
   }
   if(info.prev == null){
     prevPage.classList.add('disabled');
   } else{
     prevPage.addEventListener('click', () => {
         currentPage--;
         getCharacters(currentPage, currentGender, currentStatus);
     })
   }
   
}

const btnFilter = document.querySelector('.btnFilter');

btnFilter.addEventListener('click', () => {
   const gender = document.querySelector('#selectGender').value;
   const status = document.querySelector('#selectStatus').value;
   currentGender = gender;
   currentStatus = status;
   currentPage = 1; 
   getCharacters(currentPage, currentGender, currentStatus);
   
})

const exampleModal = document.getElementById('exampleModal');
if (exampleModal) {
   exampleModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget;
      const modalTitle = exampleModal.querySelector('.modal-title');
      const id = button.getAttribute('data-bs-whatever');
      const modalBody = document.querySelector('.modal-body');

      
      fetch(`${baseUrl}/${id}`)
         .then(response => response.json())
         .then(data => {
            console.log(data);
            modalBody.innerHTML = '';
            modalBody.innerHTML = `
               <div class="boxImg">
                  <img src="${data.image}" alt="">
               </div>
               <div class="boxInfo ">
                  <p>Name: ${data.name}</p>
                  <p>Species: ${data.species}</p>
                  <p>Gender: ${data.gender}</p>
                  <p>Status: ${data.status}</p>
                  <p>Origin: ${data.origin.name}</p>
                  <p>Location: ${data.location.name}</p>
               </div>
            `;
            modalTitle.textContent = `Info about ${data.name}`
         })
   })
}