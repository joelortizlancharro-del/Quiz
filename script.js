let nom;
let preguntes;
let index = 0;
let puntuacio = 0;
let temporizador;
let modeEscollit;

const display = document.getElementById("temporitzador");
const mode = {
    pokemon: "preguntesPokemon",
    classics: "preguntesClassics",
    shooters: "preguntesShooters",
    cultura: "preguntesCulturaGeneral",
    caos: "caos"
}
const cargarPreguntes = async () => {
    try {
        const res = await fetch("data.json");
        const data = await res.json();
        const tematica = localStorage.getItem("modeJoc");
        if(tematica === "caos"){
            
        }else{
            preguntes = data[mode[tematica]];
        }

    } catch (error) {
        console.error("Error cargando JSON:", error);
    }
    iniciarJoc();
}

const mostrarPregunta = (question) => {

    // pregunta
    document.getElementById("textPregunta").textContent = question.pregunta;

    // opciones
    const botones = [
        document.getElementById("opcioA"),
        document.getElementById("opcioB"),
        document.getElementById("opcioC"),
        document.getElementById("opcioD")
    ];

    botones.forEach((btn, i) => {
        btn.textContent = question.opcions[i];

        btn.onclick = () => {
            clearTimeout(temporizador);
            comprobarRespuesta(i, question.respostaCorrecta);
        };
    });

    // contador pregunta
    document.getElementById("numPregunta").textContent = `Pregunta ${index + 1}`;
    document.getElementById("comptador").textContent = `Pregunta ${index + 1} / ${preguntes.length}`;
    document.getElementById("progressBar").style.width = `${((index) / preguntes.length) * 100}%`;

// ⏱️ temporizador
let tiempo = 15;
display.textContent = tiempo; 

// limpiamos cualquier temporizador previo
clearInterval(temporitzador);

temporitzador = setInterval(() => {
    tiempo--;
    console.log(tiempo);
    display.textContent = tiempo;

    if (tiempo <= 0) {
        clearInterval(temporitzador);
        index++;
        seguentPregunta();
    }
}, 1000);
};

const comprobarRespuesta = (respuestaUsuario, respuestaCorrecta) => {
    clearInterval(temporizador);

    if (respuestaUsuario === respuestaCorrecta) {
        puntuacio += 10;
    } else {
        puntuacio -= 3;
    }

    index++;
    seguentPregunta();
};

const randomitzadorRespostes = (respostes) => {
    let respostesRandom = [];
    while(respostes.length > 0){
        let num = Math.floor(Math.random()*respostes.length)
        let resposta = respostes[num];
        respostesRandom.push(resposta);
        respostes.splice(num, 1);
    }
    return respostesRandom;
}

const randomitzadorPreguntes = async () => {
    let preguntesRandom = [];
    while(preguntesRandom.length < 30){
        let num = Math.floor(Math.random()*preguntes.length)
        let pregunta = preguntes[num];
        console.log(pregunta);
        pregunta.opcions = randomitzadorRespostes(pregunta.opcions)
        preguntesRandom.push(pregunta);
        preguntes.splice(num, 1);
    }
    preguntes = preguntesRandom;

}


const seguentPregunta = () => {
    if (index < preguntes.length) {
        mostrarPregunta(preguntes[index]);
    } else {
        terminarJoc();
    }
};

const terminarJoc = () => {
    localStorage.setItem("puntuacioFinal", puntuacio)
    window.location.href = "index4.html";
};
const iniciarJoc = () => {
    index = 0;
    puntuacio = 0;
    localStorage.setItem("puntuacioFinal", puntuacio)
    randomitzadorPreguntes();
    seguentPregunta();
}



const pagina = document.body.id;

if (pagina === "pagina1") {
    const nameInput = document.getElementById("nameInput");
    const confirmBtn = document.getElementById("confirmBtn");

    confirmBtn.addEventListener('click', () => {
        const nombre = nameInput.value.trim();

        if (nombre === "") {
            alert("Introdueix un nom");
            return;
        }
        console.log(nombre)
        localStorage.setItem("nomJugador", nombre);

        window.location.href = "index2.html";
    });
} else if (pagina === "pagina2") {
    const nomSpan = document.getElementById("nomUsuari");
    const nom = localStorage.getItem("nomJugador");
    const modeBtn = document.getElementById("modeBtn");

    nomSpan.textContent = nom;

    modeBtn.addEventListener('click', () => {
        const seleccionada = document.querySelector('input[name="categories"]:checked');

        if (!seleccionada) {
            alert("Selecciona un mode de joc");
            return;
        }

        const modeEscollit = seleccionada.value;

        localStorage.setItem("modeJoc", modeEscollit);
        window.location.href = "index3.html";
    });


} else if (pagina === "pagina3") {

    cargarPreguntes();

} else if (pagina === "pagina4") {
    const nombre = localStorage.getItem("nomJugador");
    const puntuacioFinal = localStorage.getItem("puntuacioFinal");
    document.getElementById("nomUsuari").textContent = nombre;
    document.getElementById("puntuacio").textContent = puntuacioFinal;
}
