
/*let nom;
const nameInput = document.getElementById("nameInput");
const confirmBtn = document.getElementById("confirmBtn")

confirmBtn.addEventListener('click', () => {
    if (nom === "") {
        alert("Introdueix un nom");
        return;
    }
    nom = nameInput.value
})
*/
let preguntes;
let indice = 0;
let puntuacion = 0;
let temporizador;
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
            indice++;
            seguentPregunta();
        }, 15000);
    });
}

const comprobarRespuesta = (respuestaUsuario, respuestaCorrecta) => {
    if (respuestaUsuario === respuestaCorrecta) {
        puntuacion += 10;
    } else {
        puntuacion -= 3;
    }

    indice++;
    seguentPregunta();
};

const seguentPregunta = () => {
    if (indice < preguntes.length) {
        mostrarPregunta(preguntes[indice]);
    } else {
        terminarJuego();
    }
};

const terminarJuego = () => {
    const contenedor = document.getElementById("tarjeta");
    contenedor.innerHTML = `<h2>Juego terminado</h2>
                            <p>Puntuación: ${puntuacion}</p>`;
};

const iniciarJoc = () => {
    indice = 0;
    puntuacion = 0;
    seguentPregunta();
}



cargarPreguntes();

