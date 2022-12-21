let botonesDirecciones = Array.from(document.querySelectorAll(".botones-direcciones button"));
let inputCoordenadas = Array.from(document.querySelectorAll('.input-coordenadas input'));
let botonesDirContainer = document.querySelector('.botones-direcciones');
let inputCoorContainer = document.querySelector('.input-coordenadas');
let transformacion = document.querySelector("#transformacion");
let box = document.querySelector('.box');
let opcionTransformacion;
let anguloEjeX = 0;
let anguloEjeY = 0;
let distanciaX = 0;
let distanciaY = 0;
let escalaUnica = 1;
let escalaX = 1;
let escalaY = 1;
let escalaZ = 1;

transformacion.addEventListener('change', obtenerOpcion);

function obtenerOpcion(e) {
    opcionTransformacion = this.value;

    if (opcionTransformacion === 'rotacion') {
        botonesDirecciones.forEach(boton => boton.removeEventListener('click', trasladarPorBoton));
        document.removeEventListener('keydown', trasladarPorTecla);
        botonesDirecciones.forEach(boton => boton.addEventListener("click", rotarPorBoton));
        document.addEventListener('keydown', rotarPorTecla);
        inputCoorContainer.style.display = 'none';
        botonesDirContainer.style.display = 'flex';

    } else if (opcionTransformacion === 'traslacion') {
        botonesDirecciones.forEach(boton => boton.removeEventListener('click', rotarPorBoton));
        document.removeEventListener('keydown', rotarPorTecla);
        botonesDirecciones.forEach(boton => boton.addEventListener('click', trasladarPorBoton));
        document.addEventListener('keydown', trasladarPorTecla);
        inputCoorContainer.style.display = 'none';
        botonesDirContainer.style.display = 'flex';
    }
    else if (opcionTransformacion === 'escala') {
        botonesDirecciones.forEach(boton => boton.removeEventListener('click', rotarPorBoton));
        document.removeEventListener('keydown', rotarPorTecla);
        botonesDirecciones.forEach(boton => boton.removeEventListener('click', trasladarPorBoton));
        document.removeEventListener('keydown', trasladarPorTecla);
        inputCoordenadas.forEach(input => input.addEventListener('keyup', escalarPorCoordenada));
        document.addEventListener('keydown', escalarPorTecla);
        botonesDirContainer.style.display = 'none';
        inputCoorContainer.style.display = 'flex';
    }
}

function escalarPorCoordenada(e) {
    let inputClass = this.getAttribute('class');
    if (inputClass === 'coordenadaX') {
        escalaX = this.value;
    }
    else if (inputClass === 'coordenadaY') {
        escalaY = this.value;
    }
    else if (inputClass === 'coordenadaZ') {
        escalaZ = this.value;
    }
    position(distanciaX, distanciaY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ);
}

function escalarPorTecla(e) {
    if (e.key === '+') {
        escalaUnica += 0.01;
    }
    else if (e.key === '-') {
        escalaUnica -= 0.01;
    }
    position(distanciaX, distanciaY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ);
}



function rotarPorBoton(e) {
    console.log(box);
    let opcion = this.getAttribute("class");
    if (opcion === 'abajo') {
        anguloEjeX -= 10;
    }
    else if (opcion === 'arriba') {
        anguloEjeX += 10;
    }
    else if (opcion === 'izquierda') {
        anguloEjeY -= 10;
    }
    else {
        anguloEjeY += 10;
    }
    position(distanciaX, distanciaY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ);
}

function rotarPorTecla(e) {
    console.log(box);
    let opcion = e.key;
    if (opcion === 'ArrowDown') {
        anguloEjeX -= 10;
    }
    else if (opcion === 'ArrowUp') {
        anguloEjeX += 10;
    }
    else if (opcion === 'ArrowLeft') {
        anguloEjeY -= 10;
    }
    else if (opcion === 'ArrowRight') {
        anguloEjeY += 10;
    }
    position(distanciaX, distanciaY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ);
}


function trasladarPorBoton(e) {
    console.log(box);
    let opcion = this.getAttribute("class");
    if (opcion === 'abajo') {
        distanciaY += 1;
    }
    else if (opcion === 'arriba') {
        distanciaY -= 1;
    }
    else if (opcion === 'izquierda') {
        distanciaX -= 1;
    }
    else {
        distanciaX += 1;
    }
    position(distanciaX, distanciaY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ);
}

function trasladarPorTecla(e) {
    console.log(box);
    let opcion = e.key;
    if (opcion === 'ArrowDown') {
        distanciaY += 1;
    }
    else if (opcion === 'ArrowUp') {
        distanciaY -= 1;
    }
    else if (opcion === 'ArrowLeft') {
        distanciaX -= 1;
    }
    else if (opcion === 'ArrowRight') {
        distanciaX += 1;
    }
    position(distanciaX, distanciaY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ);
}

function position(posX, posY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ) {
    let posicionX = posX + 'rem';
    let posicionY = posY + 'rem';
    let anguloDegX = anguloEjeX + "deg";
    let anguloDegY = anguloEjeY + "deg";
    let escalaUnicaNum = parseFloat(escalaUnica);
    let posEscalaX = escalaUnicaNum + parseFloat(escalaX) - 1;
    let posEscalaY = escalaUnicaNum + parseFloat(escalaY) - 1;
    let posEscalaZ = escalaUnicaNum + parseFloat(escalaZ) - 1;

    box.style.transform = `rotateX(${anguloDegX}) rotateY(${anguloDegY}) 
    translateX(${posicionX}) translateY(${posicionY}) 
    scale3D(${posEscalaX}, ${posEscalaY}, ${posEscalaZ})`;

}








