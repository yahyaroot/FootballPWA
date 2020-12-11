document.addEventListener("DOMContentLoaded", function () {
    let item = getTeamById();
    let save = document.getElementById("save");
    save.onclick = function () {
      console.log("Clicked!");
      item.then(function (team) {
        saveForLaterFavs(team);
      })
    }
  });