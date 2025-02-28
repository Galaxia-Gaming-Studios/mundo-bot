async function buscarImagenGoogle() {
    const prompt = document.getElementById("prompt").value;

    if (!prompt) {
        alert("⚠️ Debes ingresar un texto para buscar una imagen.");
        return;
    }

    try {
        mostrarMensaje("🔥 Buscando imagen...");

        // URL de búsqueda en DuckDuckGo (no bloquea CORS)
        const url = `https://duckduckgo.com/?q=${encodeURIComponent(prompt)}&t=h_&iax=images&ia=images`;

        // Hacemos la petición a DuckDuckGo
        const respuesta = await fetch(url);
        const html = await respuesta.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Buscamos la primera imagen
        const imagen = doc.querySelector("img");
        if (!imagen) throw new Error("No se encontró ninguna imagen.");

        const urlImagen = imagen.src;
        mostrarImagenEncontrada(urlImagen);
    } catch (error) {
        mostrarMensaje("🚨 No se encontraron resultados 😔");
        console.error("Error en la búsqueda de imagen:", error);
    }
}

// Función para mostrar la imagen encontrada
function mostrarImagenEncontrada(url) {
    document.getElementById("resultado").innerHTML = `
        <p>✅ Imagen encontrada:</p>
        <img src="${url}" alt="Imagen encontrada" style="max-width:100%;border-radius:10px;"><br><br>
        <button onclick="descargarImagen('${url}')">📥 Descargar Imagen</button>
    `;
}

// Función para descargar la imagen encontrada
function descargarImagen(url) {
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "imagen_encontrada.png";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}

// Función para mostrar mensajes en la página
function mostrarMensaje(mensaje) {
    document.getElementById("resultado").innerHTML = mensaje;
}