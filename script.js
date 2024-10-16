let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 8;

loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.box-container .box')];
    for (let i = currentItem; i < currentItem + 4; i++) {
        if (boxes[i]) {
            boxes[i].style.display = 'inline-block';
        }
    }
    currentItem += 4;
    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Ajustar el tamaño de la fuente
const body = document.body;
let fontSize = 16; // Tamaño de letra inicial

document.getElementById('increase').addEventListener('click', () => {
    fontSize += 2; // Aumentar 2px
    body.style.fontSize = fontSize + 'px';
});

document.getElementById('decrease').addEventListener('click', () => {
    fontSize -= 2; // Disminuir 2px
    body.style.fontSize = fontSize + 'px';
});

// Mostrar/Ocultar el submenú de accesibilidad
document.getElementById('accessibility-toggle').addEventListener('click', (e) => {
    e.preventDefault();
    const submenu = document.getElementById('accessibility-menu');
    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
});

document.getElementById("searchBtn").addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput").value;
    const apiKey = "cwmrfDpbEvz3jxxtLyUlA3oBQEI5hvUqJwSGq6PVoWE"; // Asegúrate de que la API key esté correcta
    const url = `https://trefle.io/api/v1/plants/search?q=${searchInput}&token=${apiKey}`;

    // Hacer la solicitud a la API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Muestra la respuesta en la consola
            displayResults(data.data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Ocurrió un error al buscar la planta.");
        });
});

function displayResults(plants) {
    const resultadosContainer = document.getElementById("resultados");
    resultadosContainer.innerHTML = ""; // Limpiar resultados anteriores

    if (plants.length === 0) {
        resultadosContainer.innerHTML = "<p>No se encontraron plantas con ese nombre.</p>";
        return;
    }

    plants.forEach(plant => {
        const plantInfo = document.createElement("div");
        plantInfo.classList.add("plant-info");
        plantInfo.innerHTML = `
            <h2>${plant.common_name || "Nombre común no disponible"}</h2>
            <p><strong>Nombre científico:</strong> ${plant.scientific_name}</p>
            <p><strong>Familia:</strong> ${plant.family}</p>
            <p><strong>Año:</strong> ${plant.year}</p>
            <img src="${plant.image_url || 'default_image_url.jpg'}" alt="${plant.common_name}">
        `;
        resultadosContainer.appendChild(plantInfo);
    });
}
const apiKey = 'bf69fa3dba144421aef695cbe6722a24';
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
    const url = `https://newsapi.org/v2/everything?q=Apple&from=2024-10-13&sortBy=popularity&apiKey=${bf69fa3dba144421aef695cbe6722a24}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      console.log(data); // Muestra la respuesta de la API en la consola
  
      if (data.articles.length > 0) {
        displayNews(data.articles);
      } else {
        newsContainer.innerHTML = '<p>No se encontraron noticias.</p>';
      }
    } catch (error) {
      console.error('Error al obtener las noticias:', error);
      newsContainer.innerHTML = '<p>Error al cargar las noticias.</p>';
    }
  }
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles.length > 0) {
      displayNews(data.articles);
    } else {
      newsContainer.innerHTML = '<p>No se encontraron noticias.</p>';
    }
  } catch (error) {
    console.error('Error al obtener las noticias:', error);
    newsContainer.innerHTML = '<p>Error al cargar las noticias.</p>';
  }


function displayNews(articles) {
  newsContainer.innerHTML = '';

  articles.forEach(article => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('testimonial-1');
    articleDiv.innerHTML = `
      <p>${article.title}</p>
      <h4>${article.description || 'Sin descripción disponible.'}</h4>
      <a href="${article.url}" target="_blank">Leer más</a>
      <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="Imagen de la noticia">
    `;

    newsContainer.appendChild(articleDiv);
  });
}

document.addEventListener('DOMContentLoaded', fetchNews);