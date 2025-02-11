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
