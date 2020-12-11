let league_id = 2015;
let tokenAuth = '16d85bf702974259b17e4dff4faeade4';
let endPointbase_url = "https://api.football-data.org/v2/";
let endPointstanding_url = `${endPointbase_url}competitions/${league_id}/standings`;

let fetchApi = url => {
  return fetch(url, 
    {
     headers: {'X-Auth-Token':tokenAuth }
    });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function  getStandingsClub() {
    if ("caches" in window) {
      caches.match(endPointstanding_url).then(function(response) {
        if (response) {
          response.json().
          then(function(data) {
          let klasmenHTML = `
            <div class="card " style="padding:0px; margin-top: 30px;margin-right: -20px; margin-left: -20px;">
                    <table style="font-size:14px;" class="responsive-table">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Logo</th>
                          <th>CLUB</th>
                          <th>PG</th>
                          <th>W</th>
                          <th>D</th>
                          <th>L</th>
                          <th>PTS</th>
                          <th>DT</th>
                        </tr>
                      </thead>
                      <tbody>
                `;
              data.standings["0"].table.forEach(function (atribut) {
                klasmenHTML += `
                        <tr>
                          <td>${atribut.position}</td>
                          <td><img style="width:20px;" src="${atribut.team.crestUrl}"></td>
                          <td>${atribut.team.name}</td>
                          <td>${atribut.playedGames}</td>
                          <td>${atribut.won}</td>
                          <td>${atribut.draw}</td>
                          <td>${atribut.lost}</td>
                          <td>${atribut.points}</td>
                          <td><a href="./team.html?id=${atribut.team.id}">Detail</a></td>
                        </tr> `;
              });
              klasmenHTML += `</tbody>
                        </table> </div>`;
            document.getElementById("standings").innerHTML = klasmenHTML;

          });
        }
      });
    }

    fetchApi(endPointstanding_url)
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);
        let klasmenHTML = `
        <div class="card " style="padding:0px; margin-top: 30px;margin-right: -20px; margin-left: -20px;">
                <table style="font-size:14px;" class="responsive-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Logo</th>
                      <th>CLUB</th>
                      <th>PG</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>PTS</th>
                      <th>DT</th>
                    </tr>
                  </thead>
                  <tbody>
            `;
          data.standings["0"].table.forEach(function (atribut) {
            klasmenHTML += `
                    <tr>
                      <td>${atribut.position}</td>
                      <td><img style="width:20px;" src="${atribut.team.crestUrl}"></td>
                      <td>${atribut.team.name}</td>
                      <td>${atribut.playedGames}</td>
                      <td>${atribut.won}</td>
                      <td>${atribut.draw}</td>
                      <td>${atribut.lost}</td>
                      <td>${atribut.points}</td>
                      <td><a href="./team.html?id=${atribut.team.id}">Detail</a></td>
                    </tr> `;
          });
          klasmenHTML += `</tbody>
                    </table> </div>`;
        document.getElementById("standings").innerHTML = klasmenHTML

      })
      .catch(error);
}
function getTeamById() {
  return new Promise(function(resolve) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    let endPointteam_id_url = `${endPointbase_url}teams/${idParam}`;
    if ("caches" in window) {
      caches.match(endPointteam_id_url).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            let teamHTML = `
            <div class="col s12 m8 offset-m2 l6 offset-l3">
            <div class="card-panel grey lighten-5 z-depth-1">
              <div class="row valign-wrapper">
                <div class="col s2">
                  <img src="${data.crestUrl.replace(/^http:\/\//i,  "https://" )}" alt="" class="circle responsive-img"> 
                </div>
                <div class="col s10">
                  <span class="black-text">
                  <h5 ${data.name}></h5>
                  <h5> ${data.shortName}  is short name from ${data.name}</h5>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
          <div class="col s12 "><h1 class="center-align">Detail Information</h1>
          </div>
          <div class="col s6">
      <div class="card">
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${data.name}<i class="material-icons right">more_vert</i></span>
        <p><a href="${data.website}">Website</a></p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${data.name }<i class="material-icons right">close</i></span>
        <p>Club Colors: ${data.clubColors}</p>
        <p>Last Updated: ${data.lastUpdated}</p>
        <p>Venue: ${data.venue}</p>
        </div>
        </div>
          </div>
          <div class="col s6"> 
          <div class="card">
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${data.area.name}<i class="material-icons right">more_vert</i></span>
        <p><a href="${data.website}">Website</a></p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">
        Founded: ${data.founded }<i class="material-icons right">close</i></span>
        <p>Address: ${data.address}</p>
        <p>Phone: ${data.phone}</p>
        </div>
        </div>
          </div>
        </div> `;
            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data);
          });
        }
      });
    }

    fetchApi(endPointteam_id_url)
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);
        let teamHTML = `
        <div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s2">
              <img src="${data.crestUrl.replace(/^http:\/\//i, "https://")}" alt="" class="circle responsive-img"> 
            </div>
            <div class="col s10">
              <span class="black-text">
              <h5 ${data.name}></h5>
              <h5> ${data.shortName}  is short name from ${data.name}</h5>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
      <div class="col s12 "><h1 class="center-align">Detail Information</h1>
      </div>
      <div class="col s6">
          <div class="card">
                <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">${data.name}<i class="material-icons right">more_vert</i></span>
    <p><a href="${data.website}">Website</a></p>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">${data.name }<i class="material-icons right">close</i></span>
    <p>Club Colors: ${data.clubColors}</p>
    <p>Last Updated: ${data.lastUpdated}</p>
    <p>Venue: ${data.venue}</p>
    </div>
    </div>
      </div>
      <div class="col s6"> 
      <div class="card">
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4">${data.area.name}<i class="material-icons right">more_vert</i></span>
    <p><a href="${data.website}">Website</a></p>
  </div>
  <div class="card-reveal">
    <span class="card-title grey-text text-darken-4">
    Founded: ${data.founded }<i class="material-icons right">close</i></span>
    <p>Address: ${data.address}</p>
    <p>Phone: ${data.phone}</p>
    </div>
    </div>
      </div>
    </div> `;
        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(data);
      });
    }
)}

function getSavedClub() {
  getAllData().then(function(data) {
    console.log(data);
    let teamsHTML = "";
    data.forEach(function(data) {
      teamsHTML += `
      <div class="col s12 m8 offset-m2 l6 offset-l3">
      <div class="card-panel grey lighten-5 z-depth-1">
        <div class="row valign-wrapper">
          <div class="col s2">
            <img src="${data.crestUrl.replace( /^http:\/\//i,"https://" )}" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
          </div>
          <div class="col s10">
            <span class="black-text">
            <h5 ${data.name}></h5>
            <h5> ${data.shortName}  is short name from ${data.name}</h5>
            <p class="center-align"> 
            <button class="waves-effect waves-light btn btn-large red" id="delete" value="${data.id}">Delete
            </button>
            </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
    });

    document.getElementById("body-content").innerHTML = teamsHTML;
    let btnDelete = document.querySelectorAll("#delete");
    for(let button of btnDelete) {
        button.addEventListener("click", function () {
            let id = Number(button.value);
            console.log(id);
            dbDeleteDataTeam(id).then(() => {
            getSavedClub()
            })
        })
    }
  });
}

