let dbPromised = idb.open("football-pwa", 1, function(upgradeDb) {
let teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLaterFavs(team) {
    dbPromised
      .then(function(dbData) {
        let tx = dbData.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        console.log(team);
        store.put(team);
        return tx.complete;
      })
      .then(function() {
        const title = "Team data saved successfully!";
        console.log(title);
        const options = {
            body: `Club ${team.name} already saved, check Team Favorite !`,
            badge: "/favicon-32x32.png",
            icon: "/favicon-32x32.png",
            actions: [{
                    action: "yes-action",
                    title: "Ya"
                },
                {
                    action: "no-action",
                    title: "Tidak"
                },
            ],
        };

        if (Notification.permission === "granted") {
          navigator.serviceWorker.ready.then(function (registration) {
              registration.showNotification(title, options);
          });
      } else {
          M.toast({
              html: `Club ${team.name} already saved, check Team Favorite !`,
          });
      }
      });
}

function getAllData() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(dbData) {
          let tx = dbData.transaction("teams", "readonly");
          let store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(team => {
          if (team !== undefined) {
              resolve(team)
          } else {
              reject(new Error("Favorite not Found"))
          }
        });
    });
}

const  dbDeleteDataTeam = id => {
  return new Promise((resolve, reject) => {
      dbPromised.then(function(dbData) {
          const transaction = dbData.transaction("teams", `readwrite`);
          transaction.objectStore("teams").delete(id);
          return transaction;
      }).then(transaction => {
          if (transaction.complete) {
              resolve(true)
              const title = 'Team Data Deleted Successfully!';
              const options = {
                  'body': `${id} successfully removed from the Favorite list.`,
                  badge: "/favicon-32x32.png",
                  icon: "/favicon-32x32.png"
              };
              if (Notification.permission === 'granted') {
                  navigator.serviceWorker.ready.then(function (registration) {
                      registration.showNotification(title, options);
                  });
              } else {
                  M.toast({
                      html: `${id} successfully removed from the Favorite list`,
                  });
              }
          } else {
              reject(new Error(transaction.onerror))
          }
      })
  })
};

