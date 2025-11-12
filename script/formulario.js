// Creando lista vacia de usuarios
let usuarios = [];

function enviarMensajes(id, mensaje, color) {
    let help = document.querySelector(`#help-${id}`);
    help.textContent = mensaje;

    // Agregando o quitando class a input
    if (color === 'text-danger') {
        help.classList.add('text-danger')
    } else {
        help.classList.add('text-success')
    }

    setTimeout(() => {
        help.textContent = "";
    }, 3000);
}

function marcar_error(id) {
    let input = document.querySelector(`#${id}`);
    input.classList.add('border-danger');

    setTimeout(() => {
        input.classList.remove('border-danger');
    }, 3000);
}

function cargar_tabla() {
    const tbody = document.querySelector('#tabla tbody');
    tbody.innerHTML = '';

    usuarios.forEach(function (u) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${u.username}</td>
                        <td>${u.password}</td>`;
        console.log(tr);
        
        tbody.appendChild(tr);
    });

}

window.addEventListener('load', function () {
    console.log('Conectado con formulario');

    let inptUsername = document.querySelector('#username');
    let formulario = document.querySelector('#formulario');
    let terminosCondiciones = document.querySelector('#terminosCondiciones');
    let submit = document.querySelector('#submit');

    // console.log(inptUsername);

    inptUsername.addEventListener('change', function () {
        console.log('Contenido modificado');
        let username = inptUsername.value;
        let existe = usuarios.some(function (u) {
            return u.username === username
        })
        if (existe) {
            enviarMensajes('username', 'Nombre usuario ya existe', 'text-danger');
            marcar_error('username');
        } else {
            enviarMensajes('username', 'Nombre usuario correcto', 'text-success')
        }
    });

    formulario.addEventListener('submit', function (e) {
        e.preventDefault(); // Se evita la recarga de la pagina por defecto en evento submit
        console.log('Hice click');

        // Captura de datos de formulario
        let username = formulario.username.value;
        let password1 = formulario.password1.value;
        let password2 = formulario.password2.value;

        console.log(username, password1, password2);

        // Validemos que password1 y password2 coinciden
        if (password1 !== password2) {
            enviarMensajes('password', 'Password no coinciden', 'text-danger');
            return
        }

        // Si no se cumple que password1 y password2 son iguales, se detiene la funcion

        // "no mbre comp leto "".trim() => nombrecompleto
        // "      ".trim() => ""
        // || operador or && operdor and
        if (username.trim() === '') {
            enviarMensajes('username', 'No puede estar vacio', 'text-danger');
            return
        }

        if (!password1.trim()) {
            enviarMensajes('password', 'No puede estar vacio', 'text-danger');
            marcar_error('password1');
            marcar_error('password2');
            return
        }

        // Creamos un objeto user
        let user = {
            username: username,
            password: password1
        }

        usuarios.push(user); // Guardando datos en array
        alert('Usuario agregado exitosamente'); // Mensaje de confirmacion
        formulario.reset(); // Resetea formulario y lo deja limpio
        submit.disabled = true;

        cargar_tabla();
    });

    terminosCondiciones.addEventListener('change', function () {
        let estado = terminosCondiciones.checked;
        if (!estado) {
            submit.disabled = true;
            return
        }

        submit.disabled = false;
    });
});

/**
 * 1. Evitar agregar datos vacios a la lista usarios, validando datos x
 * 2. Agregar marco rojo a input donde corresponda con class border-danger x
 */