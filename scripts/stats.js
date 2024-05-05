const tbody1 = document.getElementById('tbody1')
const tbody2 = document.getElementById('tbody2')


async function getAnimes() {
    await fetch('../anime.json')
        .then(response => response.json())
        .then(data => {
            animeList = data.anime
            dibujarTR(tablaUno(animeList), tbody1)
            let generos = sacarGeneros(animeList)
            pintarTablaDos(tablaDos(animeList, generos), tbody2)
        }).catch(err => console.error(err))
} getAnimes()

function tablaUno(array) {
    let animeViejo = array.sort((a, b) => a.year - b.year)[0].title
    let animeNuevo = array.sort((a, b) => b.year - a.year)[0].title
    let aMenosEpisodios = array.reduce((prev, current) => (prev.episodes < current.episodes) ? prev : current).title
    let aMasEpisodios = array.reduce((prev, current) => (prev.episodes > current.episodes) ? prev : current).title

    let resultado = {
        animeMasViejo: animeViejo,
        animeMasNuevo: animeNuevo,
        animeConMenosEpisodios: aMenosEpisodios,
        animeConMasEpisodios: aMasEpisodios,
    }
    return resultado
}
function sacarGeneros(array) {
    return [...new Set((array.map(item => item.genre).flat()).map(item => item.toLowerCase()))]
}

function tablaDos(arrayAnimes, arrayGeneros) {
    let animesXgenero = arrayGeneros.map(genero => {
        let animes = arrayAnimes.filter(anime => anime.genre.some(g => g.toLowerCase() === genero.toLowerCase()))
        let totalEpisodios = animes.reduce((total, anime) => total + anime.episodes, 0)
        return {
            genero: genero,
            cantidadAnimes: animes.length,
            totalEpisodios: totalEpisodios
        }
    })
    console.log(animesXgenero)
    return animesXgenero
}

function pintarTablaDos(array, container) {
    array.forEach(dato => {
        const TR = document.createElement('tr');
        const genero = document.createElement('td');
        genero.textContent = dato.genero;
        TR.appendChild(genero);
    
        
        const cantidad = document.createElement('td');
        cantidad.textContent = dato.cantidadAnimes;
        TR.appendChild(cantidad);
        const episodios = document.createElement('td');
        episodios.textContent = dato.totalEpisodios;
        TR.appendChild(episodios);
    
        container.appendChild(TR);
      });
}


function dibujarTR(datos, container) {
    let tr = document.createElement("tr")
    for (let clave in datos) {
        console.log(datos[clave])
        let td = document.createElement("td")
        td.innerText = datos[clave]
        tr.appendChild(td)
    }
    container.appendChild(tr)
}

