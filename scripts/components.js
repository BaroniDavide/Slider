import { hide, show } from './functions.js';

export const createMiddleware = () =>{
    return {
        load: async () => {
            const response = await fetch("/images");
            const json = await response.json();
            return json;
        },
        delete: async(id) => {
            const response = await fetch("/delete/"+ id, {
                method: 'DELETE',
            });
            const json = await response.json();
            return json

        },
        upload: async(inputFile) => {
            formData = new FormData();
            formData.append("file", inputFile.files[0]);
            const body = formData;
            const fetchOptions={
                method: 'post',
                body: body
            };
            try{
                const res = await fetch("/upload", fetchOptions);
                const data = await res.json();
                console.log(data);
            }catch (e){
                console.log(e);
            }
        
        }
    }
}

export const controller = async(middleware)=>{
    const template = `<li> `

    const inputFile = document.querySelectorAll('#file');
    const button = document.querySelector('#button');
    const listUL = document.getElementById('listUL');

    handleSubmit = async(event) => {
        await middleware.upload(inputFile);
        const list = await middleware.load();
        render(list);
    }
    button.onclick = handleSubmit;
    mi
}

export const createNavigator = (parentElement) => {
    const pages = Array.from(parentElement.querySelectorAll(".page"));
    
    const render = () => {
       const url = new URL(document.location.href);
       const pageName = url.hash.replace("#", "");
       const selected = pages.filter((page) => page.id === pageName)[0] || pages[0];
 
       hide(pages);
       show(selected);
    }
    window.addEventListener('popstate', render); 
    render();   
}

export function createTable(parentElement, pubsub) {
    let dati;

    return {

        setData: (newData) => {
            dati = newData;
        },

        renderTableAdmin: () => {
          let html = '';

          // Struttura della tabella
          html += '<table class="table table-bordered table-striped table-container">';
          html += `
          <thead>
              <tr>
                  <th>Nome</th>
                  <th>Foto</th>
                  <th>Azioni</th>
              </tr>
          </thead>
          <tbody>
          `;            

          // Aggiunta delle righe con i dati filtrati
          dati.forEach((e) => {
              html += `
              <tr>
                  <td>${e.nome}</td>
                  <td>
                      <img src="${e.foto}" alt="${e.nome}" style="width: 150px; height: auto;">
                  </td>
                  <td>
                    <button type="button" id="rimuovi" class="btn btn-secondary">Rimuovi</button>
                  </td>
              </tr>
              `;
          });
          
          html += '</tbody></table>';
          parentElement.innerHTML = html;
          const rimuovi=document.getElementById("rimuovi");
          rimuovi.onclick = () => {
                console.log("RIMUOVII");
          };     
        },


    };
}

export function createAdd(parentElement, pubsub) {
    let foto = [];
  
    return {
        createModal: (add_btn) => {
            const modalContainer = parentElement;
  
            // HTML della modale
            const modalHTML = `
                <div id="fotoModal" class="modal" tabindex="-1" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5">Aggiungi Foto</h1>
                            </div>
                            <div class="modal-body">
                                <form id="fotoForm">

                                    <div class="form-group">
                                        <label for="Nome">Nome</label>
                                        <input type="text" class="form-control" id="nome" required>
                                    </div>
                            
                                    <div class="form-group">
                                        <label for="foto">Foto (url)</label>
                                        <input type="text" class="form-control" id="foto" required>
                                    </div>

                                    <button type="button" id="submit" class="btn btn-primary">Invia</button>
                                    <button type="button" id="cancelButton" class="btn btn-secondary">Annulla</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            `;
  
            modalContainer.innerHTML += modalHTML;
  
            // Elementi della modale
            const modal = document.getElementById('fotoModal');
            const cancelButton = document.getElementById('cancelButton');
            const submitButton = document.getElementById('submit');
  
            // Mostra la modale
            add_btn.onclick = () => {
                modal.style.display = 'block';
                console.log("Modale mostrata:", modal.style.display);
            };
  
            // Nascondi la modale
            cancelButton.onclick = () => {
                modal.style.display = 'none';
                //document.getElementById('user').value = '';
                //document.getElementById('password').value = '';
            };
  
            // Invia i dati
            submitButton.onclick = () => {
                const nome = document.getElementById('nome').value;
                const foto = document.getElementById('foto').value;
  
                //id: foto.length + 1,
                const nuovaFoto = {
                    nome: nome,
                    foto: foto
                };
  
                // Aggiungi alla lista locale
                foto.push(nuovaFoto);
  
                // pubblico l'evento
                pubsub.publish("newFotoAdded", foto);
  
                // Chiudi la modale
                modal.style.display = 'none';
                console.log("Nuova Foto aggiunta:", nuovaFoto);
            };
        }
    };
  }

export function createLogin(parentElement, myToken, pubsub) {
    let isLogged = false;

    return {
        createModal: (login_btn) => {
            console.log("isLogged     ",isLogged)

            const loginContainer = parentElement;

            const loginHTML = `
        
            <div id="loginModal" class="modal" tabindex="-1" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
        
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Login</h1>
                </div>
        
                <div class="modal-body">
                    <form id="loginForm">
        
                    <div class="form-group">
                        <label for="user">User</label>
                        <input type="text" class="form-control" id="user" required>
                    </div>
        
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" required>
                    </div>
        
                    <button type="button" id="submitBtn" class="btn btn-primary">Invia</button>
                    <button type="button" id="cancelBtn" class="btn btn-secondary">Annulla</button>
                    </form>
                </div>
                </div>
            </div>
            </div>
            `;
        
            loginContainer.innerHTML += loginHTML;
        
            const modal = document.getElementById('loginModal');
            const cancelBtn = document.getElementById('cancelBtn');
            const submitBtn = document.getElementById('submitBtn');
        
  
  
        const login = (username, password) => {
        return new Promise((resolve, reject) => {
            fetch("http://ws.cipiaceinfo.it/credential/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "key": myToken
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(r => r.json())
            .then(r => {
                resolve(r.result);
            })
            .catch(reject);
        });
        };
  
        login_btn.onclick = () => {
        modal.style.display = 'block';
        };
    
        cancelBtn.onclick = () => {
        modal.style.display = 'none';
        };
  
        submitBtn.onclick = () => {
        const inputName = document.getElementById('user').value;
        const inputPassword = document.getElementById('password').value;
        login(inputName, inputPassword).then((result) => {
            console.log("RESULT: ",result);
            if (result != "Unauthorized") {
                isLogged = true;
                pubsub.publish("Logged", isLogged);
                console.log("login riuscito");
                console.log(inputName);
                console.log(inputPassword);
                modal.style.display = 'none';
                document.getElementById('user').value = '';
                document.getElementById('password').value = '';
            } else {
                console.log("login non riuscita!");
                console.log(inputName);
                console.log(inputPassword);
            }
        });
        };
        }
    }
  
}

export const createPubSub = () => {
const dict = {};
return {
    subscribe: (eventName, callback) => {
        // controllo se esiste l'evento, senno lo creo
        if (!dict[eventName]) {
            dict[eventName] = [];
        }
        // aggiungo la callback
        dict[eventName].push(callback);
    },
    publish: (eventName, data) => {
        // controllo se ce gia una callback per l'evento
        if (dict[eventName]) {
            // per ogni callback, invio anche i dati
            dict[eventName].forEach((callback) => callback(data));
        }
    }
}
}