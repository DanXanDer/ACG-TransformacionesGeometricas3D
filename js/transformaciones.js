let botonesDirecciones = Array.from(document.querySelectorAll(".botones-direcciones button"));
let inputCoordenadas = Array.from(document.querySelectorAll('.input-coordenadas input'));
let botonesCoordenadas = Array.from(document.querySelectorAll('.botones-escala button'));
let botonesCoorContainer = document.querySelector('.botones-escala');
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


if (transformacion.value === 'seleccionar') {
    botonesDirContainer.style.display = 'none';
    botonesCoorContainer.style.display = 'none';
    inputCoorContainer.style.display = 'none';
}

document.addEventListener('keyup', removerAnimacionBoton);
transformacion.addEventListener('change', obtenerOpcion);

function obtenerOpcion(e) {
    opcionTransformacion = this.value;
    if (opcionTransformacion === 'seleccionar') {
        botonesDirContainer.style.display = 'none';
        botonesCoorContainer.style.display = 'none';
        inputCoorContainer.style.display = 'none';

    } else if (opcionTransformacion === 'rotacion') {
        botonesDirecciones.forEach(boton => boton.removeEventListener('click', trasladarPorBoton));
        document.removeEventListener('keydown', trasladarPorTecla);
        botonesDirecciones.forEach(boton => boton.addEventListener("click", rotarPorBoton));
        document.addEventListener('keydown', rotarPorTecla);
        inputCoordenadas.forEach(input => input.removeEventListener('keyup', escalarPorCoordenada));
        document.removeEventListener('keydown', escalarPorTecla);
        botonesCoorContainer.style.display = 'none';
        inputCoorContainer.style.display = 'none';
        botonesDirContainer.style.display = 'grid';

    } else if (opcionTransformacion === 'traslacion') {
        botonesDirecciones.forEach(boton => boton.removeEventListener('click', rotarPorBoton));
        document.removeEventListener('keydown', rotarPorTecla);
        botonesDirecciones.forEach(boton => boton.addEventListener('click', trasladarPorBoton));
        document.addEventListener('keydown', trasladarPorTecla);
        inputCoordenadas.forEach(input => input.removeEventListener('keyup', escalarPorCoordenada));
        document.removeEventListener('keydown', escalarPorTecla);
        botonesCoorContainer.style.display = 'none';
        inputCoorContainer.style.display = 'none';
        botonesDirContainer.style.display = 'grid';

    }
    else if (opcionTransformacion === 'escala') {
        botonesDirecciones.forEach(boton => boton.removeEventListener('click', rotarPorBoton));
        document.removeEventListener('keydown', rotarPorTecla);
        botonesDirecciones.forEach(boton => boton.removeEventListener('click', trasladarPorBoton));
        document.removeEventListener('keydown', trasladarPorTecla);
        inputCoordenadas.forEach(input => input.addEventListener('keyup', escalarPorCoordenada));
        botonesCoordenadas.forEach(boton => boton.addEventListener('click', escalarUniformemente));
        document.addEventListener('keydown', escalarPorTecla);
        botonesDirContainer.style.display = 'none';
        inputCoorContainer.style.display = 'grid';
        botonesCoorContainer.style.display = 'flex';

    }
}

function escalarUniformemente(e) {
    if (this.innerText === '+') {
        escalaUnica += 0.01;
        inputCoordenadas.forEach(incrementarValorInput);
    } else {
        escalaUnica -= 0.01;
        inputCoordenadas.forEach(disminuirValorInput);
    }
    position(distanciaX, distanciaY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ);
}

function incrementarValorInput(valorInput) {
    valorInput.value = (parseFloat(valorInput.value) + 0.01).toFixed(2);
}

function disminuirValorInput(valorInput) {
    valorInput.value = (parseFloat(valorInput.value) - 0.01).toFixed(2);
}


function escalarPorCoordenada(e) {
    let inputClass = this.getAttribute('id');
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
    console.log(e.key);
    if (e.key === '+') {
        escalaUnica += 0.01;
        inputCoordenadas.forEach(incrementarValorInput);
        botonesCoordenadas.forEach(boton => {
            if (boton.innerText === '+') {
                boton.classList.add('boton-presionado');
            }
            else {
                boton.classList.remove('boton-presionado');
            }
        })
    }
    else if (e.key === '-') {
        escalaUnica -= 0.01;
        inputCoordenadas.forEach(disminuirValorInput);
        botonesCoordenadas.forEach(boton => {
            if (boton.innerText === '-') {
                boton.classList.add('boton-presionado');
            }
            else {
                boton.classList.remove('boton-presionado');
            }
        })
    }
    position(distanciaX, distanciaY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ);
}



function rotarPorBoton(e) {
    console.log(box);
    let opcion = this.getAttribute("id");
    console.log(opcion);
    if (opcion === '#abajo') {
        anguloEjeX -= 10;
    }
    else if (opcion === '#arriba') {
        anguloEjeX += 10;
    }
    else if (opcion === '#izquierda') {
        anguloEjeY -= 10;
    }
    else {
        anguloEjeY += 10;
    }
    position(distanciaX, distanciaY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ);
}

function rotarPorTecla(e) {
    let opcion = e.key;
    if (opcion === 's') {
        anguloEjeX -= 10;
        botonesDirecciones.forEach(boton => {
            if (boton.getAttribute('id') === '#abajo') {
                boton.classList.add('boton-presionado');
                boton.style.transform = 'rotate(180deg) translateY(10px)';
            }
        })
    }
    else if (opcion === 'w') {
        anguloEjeX += 10;
        botonesDirecciones.forEach(boton => {
            if (boton.getAttribute('id') === '#arriba') {
                boton.classList.add('boton-presionado');
            }
        })
    }
    else if (opcion === 'a') {
        anguloEjeY -= 10;
        botonesDirecciones.forEach(boton => {
            if (boton.getAttribute('id') === '#izquierda') {
                boton.classList.add('boton-presionado');
                boton.style.transform = 'rotate(-90deg) translateX(10px)';
            }
        })
    }
    else if (opcion === 'd') {
        anguloEjeY += 10;
        botonesDirecciones.forEach(boton => {
            if (boton.getAttribute('id') === '#derecha') {
                boton.classList.add('boton-presionado');
                boton.style.transform = 'rotate(90deg) translateX(-5px)';
            }
        })
    }
    position(distanciaX, distanciaY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ);
}


function trasladarPorBoton(e) {
    console.log(box);
    let opcion = this.getAttribute("id");
    if (opcion === '#abajo') {
        distanciaY += 1;
    }
    else if (opcion === '#arriba') {
        distanciaY -= 1;
    }
    else if (opcion === '#izquierda') {
        distanciaX -= 1;
    }
    else {
        distanciaX += 1;
    }
    position(distanciaX, distanciaY, anguloEjeX, anguloEjeY, escalaUnica, escalaX, escalaY, escalaZ);
}

function removerAnimacionBoton(e) {
    botonesCoordenadas.forEach(boton => {
        boton.classList.remove('boton-presionado');
    })
    botonesDirecciones.forEach(boton => {
        boton.classList.remove('boton-presionado');
        if (boton.getAttribute('id') === '#abajo'){
            boton.style.transform = 'rotate(180deg) translateY(0px)';
        }
        else if (boton.getAttribute('id') === '#izquierda'){
            boton.style.transform = 'rotate(-90deg) translateX(0px)';
        }
        else if (boton.getAttribute('id') == '#derecha'){
            boton.style.transform = 'rotate(90deg) translateX(0px)';
        }
    })
}

function trasladarPorTecla(e) {
    console.log(box);
    let opcion = e.key;
    if (opcion === 's') {
        distanciaY += 1;
        botonesDirecciones.forEach(boton => {
            if (boton.getAttribute('id') === '#abajo') {
                boton.classList.add('boton-presionado');
                boton.style.transform = 'rotate(180deg) translateY(10px)';
            }
        })
    }
    else if (opcion === 'w') {
        distanciaY -= 1;
        botonesDirecciones.forEach(boton => {
            if (boton.getAttribute('id') === '#arriba') {
                boton.classList.add('boton-presionado');
            }
        })
    }
    else if (opcion === 'a') {
        distanciaX -= 1;
        botonesDirecciones.forEach(boton => {
            if (boton.getAttribute('id') === '#izquierda') {
                boton.classList.add('boton-presionado');
                boton.style.transform = 'rotate(-90deg) translateX(10px)';
            }
        })
    }
    else if (opcion === 'd') {
        distanciaX += 1;
        botonesDirecciones.forEach(boton => {
            if (boton.getAttribute('id') === '#derecha') {
                boton.classList.add('boton-presionado');
                boton.style.transform = 'rotate(90deg) translateX(-5px)';
            }
        })
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








