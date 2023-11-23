function login() {
    // Lectura de variables y asignación
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Validación de usuario
    let validUsers = ["usuario1@example.com", "usuario2@example.com", "usuario3@example.com"];
    let isValidUser = validUsers.includes(email);

    // Validación de contraseña
    let isPasswordValid = validatePassword(password);

    // Devuelve una promesa
    return new Promise((resolve, reject) => {
        if (isValidUser && isPasswordValid) {
            document.querySelector(".error-message").innerText = "Cargando...";

            // Simula el proceso de obtención de datos con una promesa
            fetchData()
                .then(() => {
                    // Después de 3 segundos, muestra un mensaje y redirige
                    setTimeout(() => {
                        document.querySelector(".error-message").innerText = "";
                        alert("Inicio de sesión exitoso");

                        // Redireccionar a la página principal después de 3 segundos (ajusta la URL según tu estructura)
                        window.location.href = "listaElementos.html";

                        // Resuelve la promesa después de la redirección
                        resolve();
                    }, 3000);
                })
                .catch(error => {
                    // Manejar errores en la obtención de datos
                    document.querySelector(".error-message").innerText = `Error al cargar datos: ${error}`;
                    // Rechaza la promesa en caso de error
                    reject(error);
                });
        } else {
            // Maneja errores relacionados con la validación del usuario y contraseña
            let errorMessage = "";
            if (!isValidUser && !isPasswordValid) {
                errorMessage = "Error: Usuario y contraseña incorrectos.";
            } else if (!isValidUser) {
                errorMessage = "Error: Usuario incorrecto.";
            } else {
                errorMessage = "Error: Contraseña incorrecta.";
            }

            document.querySelector(".error-message").innerText = errorMessage;

            // Rechaza la promesa con el mensaje de error
            reject(errorMessage);
        }
    });
}
function fetchData() {
    return new Promise(resolve => {
        // Simula el proceso de obtención de datos
        setTimeout(() => {
            // Resuelve la promesa después de 3 segundos (simulando la carga de datos)
            resolve();
        }, 2000);
    });
}
function resetForm() {
    document.querySelector(".login-form").reset();
    document.querySelector(".error-message").innerText = "";
}

function validatePassword(password) {
    // Validación de contraseña según los criterios especificados
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
} 

const usuario=document.getElementById("email");
const contra=document.getElementById("password");

