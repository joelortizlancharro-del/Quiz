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

    } catch (error) {
        console.error("Error cargando JSON:", error);
    }
}



const iniciarJoc = () => {

}
