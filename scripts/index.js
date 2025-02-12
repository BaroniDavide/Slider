import { createMiddleware, controller, createNavigator, createLogin, createPubSub, createTable } from './components.js';

const login_btn = document.getElementById('login');
const loginContainer = document.getElementById('login-container');
const tableAdmin = document.getElementById('table-container-admin');

let myToken, myKey;
let foto = [
  {
  "nome" : "jerome",
  "foto" : "https://i.postimg.cc/mktDtpgj/JEROME.jpg"
  }
  ]

fetch('./conf.json')
  .then((response) => {
    if (!response.ok) {
      console.log('Errore nel caricamento del file JSON');
    }
    return response.json();
  })
  .then((data) => {
    myToken = data.cacheToken;
    myKey = data.myKey;
    console.log("chiave:  ", myKey);
    console.log("token:  ", myToken);

    let login = createLogin(loginContainer, myToken, pubsub);
    login.createModal(login_btn);

  })
  .catch((error) => console.error('Errore:', error));


const nav = createNavigator(document.querySelector('#container'));

const pubsub = createPubSub();

let table = createTable(tableAdmin,pubsub);


/*
function render(){
  console.log("RENDERRR")
}
render();
*/

pubsub.subscribe("Logged", (isLogged) => {
  console.log("tabella aggiornata ", isLogged);
  table.setData(foto); // aggiorna i dati della tabella
  table.renderTableAdmin(); // render della tabella con i nuovi dati
});