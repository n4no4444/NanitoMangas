// js/validaciones.js

// 1. Algoritmo Módulo 11 para validar RUN chileno
function validarRUN(run) {
    run = run.toUpperCase().replace(/[^0-9K]/g, '');
    if (run.length < 7 || run.length > 9) return false;

    const cuerpo = run.slice(0, -1);
    const dvIngresado = run.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = 11 - (suma % 11);
    let dvEsperado = '';

    if (resto === 11) dvEsperado = '0';
    else if (resto === 10) dvEsperado = 'K';
    else dvEsperado = resto.toString();

    return dvIngresado === dvEsperado;
}

// 2. Validación de dominios de correo permitidos en Registro
function validarCorreoRegistro(correo) {
    const regexRFC2822 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexRFC2822.test(correo) || correo.length > 100) return false;

    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominiosPermitidos.some(dominio => correo.toLowerCase().endsWith(dominio));
}

// 3. Validación de Contraseña
function validarPassword(password) {
    // Entre 4 y 10 caracteres, al menos un número/letra y un carácter especial
    const regexPass = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{4,10}$/;
    return regexPass.test(password);
}