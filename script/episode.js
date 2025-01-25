

const baseUrl = 'https://rickandmortyapi.com/api/episode';

const tbody = document.querySelector('.tbody');

let currentPage = 1;
// let currentGender = '';
// let currentStatus = '';
let currentEpisode = '';

function getData(page, episode) {
   fetch(`${baseUrl}/?page=${page}&episode=${episode}`)
      .then(response => response.json())
      .then(data => {
         renderTable(data.results);
         renderPagination(data.info);
      });

}

getData(currentPage, currentEpisode);

function renderTable(data) {
   tbody.innerHTML = '';
   console.log(data);
   
   data.forEach(item =>{
      console.log(item);
      
      tbody.innerHTML += `
         <tr>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.air_date}</td>
            <td>${item.episode}</td>
         </tr>
      `;
   })
   
}

function renderPagination(info) {

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

   if (info.next == null){
      nextPage.classList.add('disabled');
   } else{
      nextPage.addEventListener('click', () => {
         currentPage++;

         console.log('next page');

         getData(currentPage, currentEpisode);

      })
   }
  
   prevPage.addEventListener('click', () => {
      console.log('previous page');
      if (currentPage > 1) {
         currentPage--;
         getData(currentPage, currentEpisode);
      }


   })
}

const btnFilter = document.querySelector('.btnFilter');

btnFilter.addEventListener('click', () => {
   const nameInput = document.querySelector('#floatingInput').value;
   currentEpisode = nameInput;
   console.log(currentEpisode);
   getData(currentPage, currentEpisode);

   

})