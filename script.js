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
            preguntes = [
                ...data.preguntesPokemon,
                ...data.preguntesClassics,
                ...data.preguntesShooters,
                ...data.preguntesCulturaGeneral
            ];
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
    clearTimeout(temporizador);

    if (respuestaUsuario === respuestaCorrecta) {
        puntuacio += 10;
        localStorage.setItem("correctes", (parseInt(localStorage.getItem("correctes") || 0) + 1));
    } else {
        puntuacio -= 3;
        localStorage.setItem("incorrectes", (parseInt(localStorage.getItem("incorrectes") || 0) + 1));
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

    let puntuacioMaxima = localStorage.getItem("puntuacioMaxima");

    if(puntuacioMaxima){
        puntuacioMaxima = Number(puntuacioMaxima);
    }else {
        puntuacioMaxima = 0;
    }


    if(puntuacio > puntuacioMaxima){
        localStorage.setItem("puntuacioMaxima", puntuacio)
    }
    localStorage.setItem("puntuacioFinal", puntuacio)
    window.location.href = "index4.html";
};

const iniciarJoc = () => {
    index = 0;
    puntuacio = 0;
    localStorage.setItem("correctes", 0);
    localStorage.setItem("incorrectes", 0);
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
    
    document.getElementById("btnTornar").addEventListener('click', () => {
        window.location.href = "Index2.html";
    });

} else if (pagina === "pagina4") {
    const nombre = localStorage.getItem("nomJugador");
    const puntuacionFinal = parseInt(localStorage.getItem("puntuacionFinal")) || 0;
    const correctes = parseInt(localStorage.getItem("correctes")) || 0;
    const incorrectes = parseInt(localStorage.getItem("incorrectes")) || 0;

    const puntuacioMaxima = localStorage.getItem("puntuacioMaxima");
    document.getElementById("puntuacio").textContent = puntuacionFinal;
    document.getElementById("missatge").textContent = `Molt bé, ${nombre}!`;
    document.getElementById("submissatge").textContent = `Has encertat ${correctes} de 30 preguntes`;
    document.getElementById("correctes").textContent = correctes;
    document.getElementById("incorrectes").textContent = incorrectes;
    document.getElementById("btnTornar").addEventListener('click', () => {
    window.location.href = "index3.html";
});

document.getElementById("btnCategoria").addEventListener('click', () => {
    window.location.href = "Index2.html";
});
    document.getElementById("millorPuntuacio").text = puntuacioMaxima;
}

