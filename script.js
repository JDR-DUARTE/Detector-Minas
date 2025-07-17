document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const fileContent = document.getElementById("fileContent");
    const botonP = document.getElementById("procesar");
    const botonD = document.getElementById("descarga");
    const bInst = document.getElementById("bInst");
    const modal= document.getElementById("mInstruccion")
    const cerrar=document.getElementById("cerrarModal")
    const mina = new buscarM();
    let archCargado = false;
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file.name.endsWith(".in") || file.name.endsWith(".txt")) {
            const reader = new FileReader();
            reader.onload = function (e) {
                let contenido = e.target.result;
                fileContent.textContent = contenido;
                mina.cargar(contenido);
                document.getElementById("contenidoI").style.display = 'block';
                archCargado = true;
                botonP.disabled = false;
                botonD.style.display = 'none';

            };
            reader.readAsText(file);
        } else {
            alert("por favor selecciona un archivo .txt o .in ")
        }
    });

    bInst.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    cerrar.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    botonP.addEventListener("click", function () {
        if (!archCargado) {
            alert("Primero cargar un archivo valido");
            return;
        }
        mina.recorrido();
        fileContent.textContent = mina.texto;
        botonP.disabled = true;
        botonD.style.display = 'block'
    });

    botonD.addEventListener("click", function () {
        const contenido = mina.texto;

        const blob = new Blob([contenido], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "minas.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });

})