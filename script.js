
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
        preguntes = await res.json();
        console.log(preguntes);
    } catch (error) {
        console.error("Error cargando JSON:", error);
    }
    iniciarJoc();
}

const mostrarPregunta = (question) => {
    const questionCard = document.getElementById("tarjeta");

        // limpiar contingut anterior
        questionCard.innerHTML = "";

        // crear h3 amb la pregunta
        const h3 = document.createElement("h3");
        h3.textContent = question.pregunta;

        questionCard.appendChild(h3);

        // crear opcions
        question.opcions.forEach(opcion => {
            const p = document.createElement("p");
            p.textContent = opcion;

            questionCard.appendChild(p);
        });

}

const comprobarRespuesta = (respuestaUsuario, respuestaCorrecta) => {
    if (respuestaUsuario === respuestaCorrecta) {
        puntuacion += 100;
    }else {
        puntuacion -= 30;
    }

    indice++; // 🔥 avanzar a la siguiente
    siguientePregunta();
};

const siguientePregunta = () => {
    if (indice < preguntas.length) {
        mostrarPregunta(preguntas[indice]);
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


iniciarJoc();

cargarPreguntes();

