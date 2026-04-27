
let nom;
const nameInput = document.getElementById("nameInput");
const confirmBtn = document.getElementById("confirmBtn")

confirmBtn.addEventListener('click', () => {
    if (nom === "") {
        alert("Introdueix un nom");
        return;
    }
    nom = nameInput.value
})

const nomSpan = document.getElementById("nomUsuari");
nomSpan.innerHTML= nom;
let preguntes;
let index = 0;
let puntuacio = 0;
let temporizador;
let modeEscollit;
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
        preguntes = data[mode.pokemon];
        console.log(preguntes);
    } catch (error) {
        console.error("Error cargando JSON:", error);
    }
    iniciarJoc();
}

const mostrarPregunta = (question) => {
    const questionCard = document.getElementById("tarjeta");
    questionCard.innerHTML = "";

    const h3 = document.createElement("h3");
    h3.textContent = question.pregunta;
    questionCard.appendChild(h3);

    question.opcions.forEach((opcio, index) => {
        const btn = document.createElement("button");
        btn.textContent = opcio;

        btn.onclick = () => {
            clearTimeout(temporizador);
            comprobarRespuesta(index, question.respostaCorrecta);
        };

        questionCard.appendChild(btn);
        temporizador = setTimeout(() => {
            index++;
            seguentPregunta();
        }, 15000);
    });
}

const comprobarRespuesta = (respuestaUsuario, respuestaCorrecta) => {
    clearTimeout(temporizador);

    if (respuestaUsuario === respuestaCorrecta) {
        puntuacio += 10;
    } else {
        puntuacio -= 3;
    }

    index++;
    seguentPregunta();
};

const seguentPregunta = () => {
    if (index < preguntes.length) {
        mostrarPregunta(preguntes[indice]);
    } else {
        terminarJuego();
    }
};

const terminarJuego = () => {
    const contenedor = document.getElementById("tarjeta");
    contenedor.innerHTML = `
        <h2>Juego terminado</h2>
        <p>Puntuación: ${puntuacio}</p>
    `;
};
const iniciarJoc = () => {
    index = 0;
    puntuacio = 0;
    seguentPregunta();
}



cargarPreguntes();

