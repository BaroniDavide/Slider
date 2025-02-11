import { createMiddleware, controller, createNavigator, createLogin, createPubSub, createTable } from './components.js';

const login_btn = document.getElementById('login');
const tableAdmin = document.getElementById('table-container-admin');

let myToken, myKey;

let foto = [
        {
        "nome" : "jerome",
        "foto" : "https://i.postimg.cc/mktDtpgj/JEROME.jpg"
        }
        ]

const nav = createNavigator(document.querySelector('#container'));
const pubsub = createPubSub();

let table = createTable(tableAdmin,pubsub);


function render(){
    console.log("RENDERRR")
  table.setData(foto);
  table.renderTableAdmin();
}
render();