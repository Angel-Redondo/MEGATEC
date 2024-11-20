        // Código JavaScript para cargar las noticias desde un archivo JSON
        fetch('data/jsonINDEX.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(noticias => {
                const newsContainer = document.getElementById('news-container');
    
                // Para cada noticia, se crea un nuevo elemento y se agrega al contenedor de noticias
                noticias.forEach(noticia => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');
    
                    const newsTitle = document.createElement('h4');
                    newsTitle.textContent = noticia.titulo;
    
                    const newsDescription = document.createElement('p');
                    newsDescription.textContent = noticia.descripcion;
    
                    newsItem.appendChild(newsTitle);
                    newsItem.appendChild(newsDescription);
    
                    newsContainer.appendChild(newsItem);
                });
            })
            .catch(error => {
                const newsContainer = document.getElementById('news-container');
                newsContainer.textContent = 'No se pudieron cargar las noticias en este momento. Por favor, intente más tarde.';
                console.error('Error fetching the JSON data:', error);
            });
            