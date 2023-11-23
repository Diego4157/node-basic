
const data=[
    {
        Ciudad: "Cali",
        lugar: "Jardín Plaza",
        distancia: "800 km",
        planSmart: 39000,
        planBlack: 39000,
        planBlackSinPermanencia: 199000
    },
    {
        Ciudad: "Cartagena",
        lugar: "Playa Blanca",
        distancia: "1,200 km",
        planSmart: 25000,
        planBlack: 45000,
        planBlackSinPermanencia: 29000
    },
    {
        Ciudad: "Medellín",
        lugar: "Parque Arví",
        distancia: "750 km",
        planSmart: 30000,
        planBlack: 50000,
        planBlackSinPermanencia: 33000
    },
    {
        Ciudad: "Bogotá",
        lugar: "Plaza de Bolívar",
        distancia: "850 km",
        planSmart: 36000,
        planBlack: 56000,
        planBlackSinPermanencia: 41000
    },
    {
        Ciudad: "Manizales",
        lugar: "Catedral Basílica Metropolitana",
        distancia: "900 km",
        planSmart: 35000,
        planBlack: 55000,
        planBlackSinPermanencia: 40000
    },
    {
        Ciudad: "Bucaramanga",
        lugar: "Parque Nacional del Chicamocha",
        distancia: "1,100 km",
        planSmart: 26000,
        planBlack: 46000,
        planBlackSinPermanencia: 30000
    },
    {
        Ciudad: "Armenia",
        lugar: "Jardín Botánico del Quindío",
        distancia: "700 km",
        planSmart: 32000,
        planBlack: 52000,
        planBlackSinPermanencia: 35000
    },
    {
        Ciudad: "Cali",
        lugar: "La Tertulia",
        distancia: "820 km",
        planSmart: 38000,
        planBlack: 58000,
        planBlackSinPermanencia: 43000
    },
   
    
]

function volverInicio() {
    
    window.location.href = "index.html";
}
const tableBody = document.querySelector("#elementTable tbody");

// Itera sobre los datos y agrega filas a la tabla
data.forEach(item => {
    const row = tableBody.insertRow();
    Object.values(item).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
    });
});
const itemsPerPage = 10;
        let currentPage = 1;

        function updateTable() {
            const tableBody = document.getElementById("elementTableBody");
            tableBody.innerHTML = ""; // Limpia el cuerpo de la tabla

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            for (let i = startIndex; i < endIndex && i < data.length; i++) {
                const item = data[i];
                const row = tableBody.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.textContent = value;
                });
            }
        }

        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                updateTable();
                updatePagination();
            }
        }

        function nextPage() {
            const maxPages = Math.ceil(data.length / itemsPerPage);
            if (currentPage < maxPages) {
                currentPage++;
                updateTable();
                updatePagination();
            }
        }

        function updatePagination() {
            const prevPageBtn = document.getElementById("prevPageBtn");
            const nextPageBtn = document.getElementById("nextPageBtn");
            const currentPageSpan = document.getElementById("currentPage");

            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === Math.ceil(data.length / itemsPerPage);

            currentPageSpan.textContent = currentPage;
        }

        // Llama a la función para mostrar la primera página al cargar la página
        updateTable();
        updatePagination();
        function applyFilters(type) {
            const ciudadInput = document.getElementById("ciudad");
            const distanciaInput = document.getElementById("distancia");
        
            const ciudadValue = ciudadInput.value.toLowerCase();
            const distanciaValue = distanciaInput.value.toLowerCase();
        
            // Si se hizo clic en un checkbox, ajusta los valores
            if (type === 'ciudad') {
                if (!document.getElementById("filtroCiudad").checked) {
                    ciudadInput.value = ''; // Limpiar el valor si el checkbox se desactiva
                }
            } else if (type === 'distancia') {
                if (!document.getElementById("filtroDistancia").checked) {
                    distanciaInput.value = ''; // Limpiar el valor si el checkbox se desactiva
                }
            }
        
            // Filtrar por ciudad y/o distancia
            const filteredData = data.filter(item =>
                (item.Ciudad.toLowerCase().includes(ciudadValue) || ciudadValue === '') &&
                (item.distancia.toLowerCase().includes(distanciaValue) || distanciaValue === '')
            );
        
            // Actualizar la tabla con los datos filtrados
            updateTable(filteredData);
        }
        function updateTable(filteredData) {
            const tableBody = document.querySelector("#elementTable tbody");
            tableBody.innerHTML = ""; // Limpia el cuerpo de la tabla
        
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
        
            for (let i = startIndex; i < endIndex && i < filteredData.length; i++) {
                const item = filteredData[i];
                const row = tableBody.insertRow();
                Object.values(item).forEach(value => {
                    const cell = row.insertCell();
                    cell.textContent = value;
                });
            }
        
            // Actualizar la paginación
            const maxPages = Math.ceil(filteredData.length / itemsPerPage);
            const prevPageBtn = document.getElementById("prevPageBtn");
            const nextPageBtn = document.getElementById("nextPageBtn");
            const currentPageSpan = document.getElementById("currentPage");
        
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === maxPages;
        
            currentPageSpan.textContent = currentPage;
        }