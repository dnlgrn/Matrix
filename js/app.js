window.onload = function(){
    btnRegistrar = document.getElementById("btnRegistrar");
    btnRegistro = document.getElementById("btnRegistro");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    ingreso = document.getElementById("ingreso");
    txtCorreoI = document.getElementById("correoI");
    txtContrasenaI = document.getElementById("contrasenaI");
    registro = document.getElementById("registro");
    btnIngresar = document.getElementById("btnIngresar");
    btnMensaje = document.getElementById("enviarM");
    txtCorreom = document.getElementById("correoM");
    txtMensajeM = document.getElementById("mensajeM");
    nombreP = document.getElementById("nombreP");
    btnenviarM = document.getElementById("enviarM");
    camera = document.getElementById("camera");
    //open = document.getElementById("open");
    photo = document.getElementById("photo");
    redactar = document.getElementById("redactar");
    mapa = document.getElementById("mapa");
    //fechora = document.getElementById("fechoraM");
    if(localStorage.getItem("login") !=="1"){    //se van a leer(getItem)el valor de login si no entro oculto pantallas
        ingreso.style.display = "block";
        principal.style.display ="none";
        redactar.style.display = "none";
        document.getElementById("camara").style.display ="none";
    }
    else{      //entonces si ingreso y estan los datos guardados en el dispotivo y debera mostrar las pantallas
        ingreso.style.display ="none";
        principal.style.display ="block";
        redactar.style.display = "block";
        nombre = localStorage.getItem("nombre");
        correo = localStorage.getItem("correo");
        document.getElementById("nombreP").innerHTML = nombre;
        leerM();
    }

}

btnRegistrar.addEventListener("click", function(){
    ingreso.style.display = "none";
    registro.style.display = "block";

});

btnRegistro.addEventListener("click", function() {
        if(txtCorreo.value == "") {
            alert("Debe escribir el correo");
            txtCorreo.classList.add("errorCampo");
            return false;
        }

        else {
            txtCorreo.classList.remove("errorCampo");
        }
        
        if (txtNombre.value == ""){
            alert("Debe escribir el nombre");
            return false;
        }
        if(txtContrasena.value ==""){
            alert("Debe escribir la contraseña");
            return false;
        }
        if(txtConfirmacion.value ==""){
            alert("Debe escribir la confirmacion");
            return false;
        }
        if (txtContrasena.value != txtConfirmacion.value) {
            alert("La contraseña y la confirmacion no coinciden");
            return false;            
        }
        if (txtFecha.value == ""){
            alert("Ingresa Fecha");
            return false;
        }

let datos = new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);  
    
    fetch("http://tpadge.orgfree.com/registro.php", {
        method: 'POST',
        body: datos

    })
    .then(function (response) {
        if(response.ok) {
            alert("Usuario Registrado");
            ingreso.style.display ="block";
            registro.style.display ="none";
        }
        else{
            alert("Oucrrio unproblema");
            console.log(response);
        }
        
    })
    .catch(function(err){
        alert("ocurrio un error->"+ err);
        console.log(err);
    });


});

btnIngresar.addEventListener("click", function() {
    if(txtCorreoI.value == "") {
        alert("Debe escribir el correo");
        txtCorreo.classList.add("errorCampo");
        return false;    
    }
    else{
        txtCorreoI.classList.remove("erorCampo");
    }

    if(txtContrasenaI.value == ""){
        alert("Debe escribir la contraseña");
        return false;
    }
    else {
        txtContrasenaI.classList.remove("errorCampo");
    }
    let datosI = new FormData();
    datosI.append("correoI", txtCorreoI.value);
    datosI.append("contrasenaI", txtContrasenaI.value);

    fetch("http://tpadge.orgfree.com/ingreso.php", {
        method: 'POST',
        body: datosI
    })
.then (function (response){
    return response.json();
})

.then(function (data){
    if(data.fallo == "contrasena"){
        alert("Debe escribir la contraseña correcta");
    }
    if(data.fallo == "usuario"){
        alert("El correo no esta registrado");
    }
    else{
        nombre = data.nombre;
        correo = data.correo;
        ingreso.style.display ="none";
        principal.style.display = "block";
        nombreP.innerHTML =nombre;
        localStorage.setItem("login", 1);  //guardar(setItem) datos individuales en el mismo dispositivo cuando ingresamos
        localStorage.setItem("nombre", nombre);  //guardo en el dispositivo el nombre
        localStorage.setItem("correo", correo);  //guardo en el dispositivo el correo
        leerM();
    }
})
.catch(function(err){
    alert("Ocurrrio un error inesperado");
    console.log(err);
    
})

});

document.getElementById("enviarM").addEventListener("click", function(){
    if(txtCorreom.value == ""){
        alert("Debe escribir correo");
        txtCorreom.classList.add("errorCampo");
        return false;
    }
    else{
        txtCorreom.classList.remove("errorCampo");
    }
    if(txtMensajeM.value == ""){
        alert("Debe escribir Mensaje");
        txtMensajeM.classList.add("errorCampo");
        return false;
    }
    else{
        txtMensajeM.classList.remove("errorCampo");
    }

    let datosM = new FormData();
    datosM.append("correoM", txtCorreom.value);
    datosM.append("mensajeM", txtMensajeM.value);

    fetch("http://tpadge.orgfree.com/guardarMensaje.php", {
        method: 'POST',
        body: datosM
    })
    .then(function(response){
        if(response.ok){
            alert("Mensaje Enviado");
        }
        else{
            alert("Ocurrio un Problema");
            console.log(response);
        }
    })

    .catch(function(err) {
        alert("Ocurrio un errro ->" + err);
        console.log(err);
    });

});


    function abrirBarra(){
         document.getElementById("barraMenu").style.width ="250px";  
               
    }

    function cerrarBarra(){
        document.getElementById("barraMenu").style.width ="0";              
    }

    function leerM(){
        let datosLM = new FormData();
        datosLM.append("correoUsuario", correo);
        fetch("http://tpadge.orgfree.com/leerMensajes.php", {
            method: 'POST',
            body: datosLM
        })
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            for(let x = 0; x < data.length; x++) {
                document.getElementById("mensajes").innerHTML =
                document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>" +
                data[x].fechahora + "<br>";
            }
        }); 
        
    } //leerM

    function tomarFoto(){
        redactar.style.display ="none";
        document.getElementById("mensajes").style.display = "none";
        document.getElementById("camara").style.display = "block";
        cerrarBarra();
    } //tomarFoto

    function mensajes(){
        redactar.style.display ="block";
        document.getElementById("mensajes").style.display ="block";
        document.getElementById("camara").style.display = "none";
        cerrarBarra();
    } //mensajes

    

    function cerrarSesion(){
        cerrarBarra();
        localStorage.removeItem("nombre");  //borra el dato de nombre guardado en el dispositivo
        localStorage.removeItem("correo");  //borra el dato de correo guardado en el dispositivo
        localStorage.setItem("login", 0);
        redactar.style.display ="none";
        document.getElementById("principal").style.display ="none";
        document.getElementById("mensajes").style.display ="none";
        document.getElementById("camara").style.display ="none";
        document.getElementById("ingreso").style.display ="block";
    }

document.getElementById("btnOpen").addEventListener("click", function(){
        camera.click();
    });

camera.addEventListener("change", function(e){
    ruta = URL.createObjectURL(e.target.files[0]);
    photo.src = ruta;
    obtenerLugar();
    if(obtenerSO() == "iOS"){
    let link = document.createElement('a');     //insertando un componente adicional 
    link.download ="test.png";
    link.href = ruta;
    link("Foto Capturada");
    link.click();
}});  //onload

function obtenerSO(){
    let SO= null;
    let platform = window.navigator.platform,
    iosPlataforms = ['iPhone', 'iPad', 'iPod'];
    if(iosPlataforms.includes(platform)){
        SO= 'iOS'
    }
    return SO;
}

function obtenerLugar(){
    coordenadas ={lat: 0, lon: 0};
    navigator.geolocation.getCurrentPosition(function(position){
        coordenadas ={ lat: position.coords.latitude, lon: position.coords.longitude}

        fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon=" + coordenadas.lon)
        .then(response => response.json())
        .then(data => {
            document.getElementById("lugar").value = data.address.country + " " + data.address.state;
        })

        .catch(error =>{
            console.log(error);
            coordenadas = {lat: 0, lon: 0};
        })
    }); //obtener lugar

    mapa.addEventListener('click', function(){
        window.open("http://www.openstreetmap.org/?mlat=" + coordenadas.lat + "&lon=" + coordenadas.lon + "&zomm=20");
    });
}

if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js').then( () => {
            console.log('Service Worker Registered')
        });
    });
}  // con este se relaciona la app con el service worker



