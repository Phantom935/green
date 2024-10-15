const apiKey = 'RVH5P6LXROBE2NT9'; // Reemplaza con tu clave API válida

// Función para obtener los datos de la API de Alpha Vantage
function obtenerDatos() {
    let symbol = document.getElementById('symbol').value; // Obtener el símbolo ingresado
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    // Realizar la solicitud a la API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Acceder a la serie temporal diaria
            let timeSeries = data['Time Series (Daily)'];
            if (timeSeries) {
                let latestDate = Object.keys(timeSeries)[0]; // Última fecha disponible
                let latestData = timeSeries[latestDate]; // Datos del último día
                let closingPrice = latestData['4. close']; // Precio de cierre
                
                // Mostrar el resultado en el HTML
                document.getElementById('resultado').innerHTML = `
                    <h2>Resultados para ${symbol.toUpperCase()}</h2>
                    <p>Última fecha: ${latestDate}</p>
                    <p>Precio de cierre: $${closingPrice}</p>
                `;
            } else {
                document.getElementById('resultado').innerHTML = `<p>No se encontraron datos para el símbolo ${symbol}.</p>`;
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            document.getElementById('resultado').innerHTML = `<p>Hubo un error al obtener los datos. Inténtalo de nuevo más tarde.</p>`;
        });
}
