const animeContainer = document.getElementById('animeContainer');

async function getAnimes(){
    await fetch('../anime.json')
        .then(response => response.json())
        .then(data =>{
            animeList = data.anime
            console.log(animeList)
            pintarTarjetas(animeList, animeContainer)



    }).catch(err => console.error(err))
}getAnimes()





function pintarTarjetas(array, container){
    container.innerHTML = ''
    let fragmento = document.createDocumentFragment()
    array.forEach(elemento => {
        let div = document.createElement('div')
        div.classList = 'card text-bg-dark d-flex'
        div.style = 'width:25rem; height:35rem'
        div.innerHTML = `
        <img src="${elemento.cover_image_url}" class="card-img flex-grow-1 object-fit-cover" alt="${elemento.title}">
        <div class="card-img-overlay flex-grow-1 d-flex flex-column justify-content-between">
            <h5 class="card-title">${elemento.title}</h5>
            <p class="card-text">${elemento.description}</p>
            <p class="card-text"> Estudio: <small>${elemento.studio}</small></p>
            <a href='../details.html?id=${elemento.id}' class='btn btn-dark' >Details</a>
        </div>`
        fragmento.appendChild(div)
    })
    container.appendChild(fragmento)
}
