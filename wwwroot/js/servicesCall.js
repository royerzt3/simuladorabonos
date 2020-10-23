
let controller = new AbortController();
let signal = controller.signal;





function servicesCallMethod(url, data, metodo, isJson) {
    let valorContentType = "application/json";
    //const valorMediaType = "multipart/form-data"
    return new Promise((resolve, reject) => {
        let header = new Headers();
        header.append("Content-Type", valorContentType);
        //header.append('Access-Control-Allow-Origin', '*');
        let request;
        switch (metodo) {
            case 'GET':
                request = new Request(url, {
                    method: metodo,
                    header: header,
                    signal: signal
                });
                break;
            case 'POST':
                request = new Request(url, {
                    method: metodo,
                    headers:header,
                    body: data,
                    signal: signal
                    //mode:"cors"
                })
                break;
            default:
                break;
        }
        $("#cargando").show();
        fetch(request)
            .then(function (data) {
                $("#cargando").hide();
                if (data.status == 400) {
                    reject(data);
                }
                else if (data.status >= 401 && data.status <= 499) {
                    reject(data);
                } else if (data.status >= 500) {
                    reject(data);
                } else {
                    resolve(data);
                }

            })
            .catch(error => {
                $("#cargando").hide();
                console.log("Error: " + error);
                reject(error);                
            });
    });
}


function servicesCargaArchivo(url, data, metodo, isJson) {

    var _formData = new FormData();

    if (isJson == 1) {
        _formData.append("files", data[0]);
        _formData.append("fiCanalId", data[1]);
        _formData.append("fiTipoTiendaId", data[2])
             _formData.append("fiPaisId", data[3]);
    } else {

        _formData.append("anexo",data);
    }
 
    return new Promise((resolve, reject) => {
        let request;
        switch (metodo) {
            case 'GET':
                request = new Request(url, {
                    method: metodo,
                    header: header,
                    signal: signal
                });
                break;
            case 'POST':
                request = new Request(url, {
                    method: metodo,
                    body: _formData,
                    processData: false,  // tell jQuery not to process the data
                    contentType: false
                })
                break;
            default:
                break;
        }
        $("#cargando").show();
        fetch(request)
            .then(function (data) {
                $("#cargando").hide();
                if (data.status == 404 || (data.status >= 400 && data.status <= 499)) {
                    console.log(data);
                } else if (data.status >= 500) {
                    console.log(data);
                } else {
                    resolve(data);
                }
            })
            .catch(error => {
                $("#cargando").hide();
                console.log("Error: " + error);
                reject(error);
            });
    });
}

function servicesCargaArchivoImg(url, data, metodo, isJson) {

    var _formDataImg = new FormData();
    _formDataImg.append("anexo", data);

    return new Promise((resolve, reject) => {
        let request;

                request = new Request(url, {
                    method: metodo,
                    body: _formDataImg,
                })
        
        $("#cargando").show();
        fetch(request)
            .then(function (data) {
                $("#cargando").hide();
                if (data.status == 404 || (data.status >= 400 && data.status <= 499)) {
                    console.log(data);
                    reject(error);
                } else if (data.status >= 500) {
                    console.log(data);
                } else {
                    resolve(data);
                }
            })
            .catch(error => {
                $("#cargando").hide();
                console.log("Error: " + error);
                reject(error);
            });
    });
}


