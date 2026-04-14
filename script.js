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
let preguntes = [];

const cargarPreguntes = async () => { 
    try {
        const res = await fetch("data.json");
        preguntes = await res.json();
        console.log(preguntes);
    } catch (error) {
        console.error("Error cargando JSON:", error);
    }
}
cargarPreguntes();
const mostrarPregunta = (preguntes) => {
    console.log(preguntes)
}


const iniciarJoc = () => {
    let indice = 0;
    let puntuacion = 0;
    mostrarPregunta(preguntes);
}

iniciarJoc();
