const loadData = () => {
  document.getElementById('player-container').innerHTML = '';
  document.getElementById('spinner').style.display = 'block'
  const searchField = document.getElementById('search-field').value;
  if (searchField == '') {
    const errorMsg = document.getElementById('error-msg');
    const div = document.createElement('div')
    div.innerHTML = `
      <div class="alert alert-danger w-75 mx-auto" role="alert">
      ! Please Search something you want
    </div>
    
    `;
    errorMsg.appendChild(div)
  } else {
    const url = `
    https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchField}
    `;
    fetch(url)
      .then(response => response.json())
      .then(data => displayPlayer(data.player))

      document.getElementById('spinner').style.display = 'none'
  }
};


const displayPlayer = players => {
  for (const player of players) {
    const parent = document.getElementById('player-container');
    const div = document.createElement('div')

    div.innerHTML = `
        <div class="card mx-auto my-3" style="width: 75%;">
            <img src="${player.strThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h4 class="card-title fw-bold">Name: ${player.strPlayer}</h4>
              <h5 class="card-title">Nationality: ${player.strNationality}</h5>
              <h6 class="card-title">Gender: ${player.strGender}</h6>
              <p class="card-text">${player.strDescriptionEN.slice(0, 150)}</p>
              <button id="delete-btn" class="btn btn-danger">Delete</button>
              <button onclick="details(${player.idPlayer})" id="derails-btn" class="btn btn-primary">Details</button>
            </div>
          </div>
    `
    parent.appendChild(div)
  }
};

const details = (id) => {
  const url = `
  https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => setDetails(data.players[0]))
};
const setDetails = (infos) => {
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = `
          <div class="card mx-auto my-3" style="width: 75%;">
            <img src="${infos.strThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h4 class="card-title fw-bold">Name: ${infos.strPlayer}</h4>
              <h5 class="card-title">Nationality: ${infos.strNationality}</h5>
              <h6 class="card-title">Gender: ${infos.strGender}</h6>
              <p class="card-text">${infos.strDescriptionEN}</p>
              <button id="return-btn" class="btn btn-info">
              <a href="index.html">Return Home Page</a></button>
            </div>
          </div>
  `;
}