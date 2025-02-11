const createMiddleware= () =>{
    return {
        load: async ()=> {
            const response= await fetch("/images");
            const json= await response.json();
            return json;
        },
        delete: async(id) =>{
            const response= await fetch("")
        },
        upload: async(inputFile) =>{
            FormData.append("file", inputFile.files[0]);
            const body= FormData;
            const fetchOptions={
                method: 'post',
                body: body
            };
        
        }
    }
}