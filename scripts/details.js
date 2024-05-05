const detailContainer = document.querySelector('#detailContainer')
async function getAnimes(){
    await fetch('../anime.json')
        .then(response => response.json())
        .then(data =>{
            animeList = data.anime
            
            let params = location.search
            let querystring = new URLSearchParams(params)
            let id = querystring.get('id')
            const anime = animeList.find(a => a.id === id)
            
            pintarDetalles(anime, detailContainer)
    }).catch(err => console.error(err))
}getAnimes()


function pintarDetalles(dato, container){
    container.innerHTML = `
    <div class="card mb-3" style="width: 75%;">
    <div class="row g-0">
    <div class="col-md-4">
        <img src="${dato.cover_image_url}" class="img-fluid rounded-start" alt="${dato.title}">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${dato.title}</h5>
            <p class="card-text">Estudio: ${dato.studio}</p>
            <p class="card-text">Año de estreno: ${dato.year}</p>
            <p class="card-text">Cantidad de Episodios: ${dato.episodes}</p>
            <p class="card-text">${dato.description}</p>
            <h4>Géneros</h4>
            <ul>
                <li>${dato.genre[0]}</li>
                <li>${dato.genre[1]}</li>
                <li>${dato.genre[2]}</li>
            </ul>
            </div>
        </div>
        </div>
    </div>`
}