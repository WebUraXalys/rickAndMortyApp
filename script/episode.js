

const baseUrl = 'https://rickandmortyapi.com/api/episode';

const tbody = document.querySelector('.tbody');

let currentPage = 1;
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
      tbody.innerHTML += `
         <tr>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.air_date}</td>
            <td>${item.episode}</td>
            <td class="d-flex justify-content-center"><button type="button" class="btn btn-primary" id="btnAdd" data-name="${item.name}" data-episode="${item.episode}">Add</button></td>
         </tr>
      `;
   })
   addToWatchlist();
   
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
         getData(currentPage, currentEpisode);

      })
   }
   if (info.prev == null) {
      prevPage.classList.add('disabled');
   } else {
      prevPage.addEventListener('click', () => {
         currentPage--;
         getData(currentPage, currentEpisode);
      })
   }
}

const btnFilter = document.querySelector('.btnFilter');

btnFilter.addEventListener('click', () => {
   const nameInput = document.querySelector('#floatingInput').value;
   currentEpisode = nameInput;
   console.log(currentEpisode);
   getData(currentPage, currentEpisode);

})

function addToWatchlist() {
   const btnAdds = document.querySelectorAll('#btnAdd');
   console.log(btnAdds);
   btnAdds.forEach(btnAdd => {
      btnAdd.addEventListener('click', () => {
         const name = btnAdd.getAttribute('data-name');
         const episode = btnAdd.getAttribute('data-episode');
         console.log(name);
         const obj = {
            name: name,
            episode: episode,
            watched: false
         }
         localStorage.setItem('name', JSON.stringify(obj));
      })
   })
}





