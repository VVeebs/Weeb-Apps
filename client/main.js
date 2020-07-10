const baseUrl = 'http://localhost:3000'
const animeDisplayCount = 14;

function animeCard(image,url,title,score,members,episodes){
const template = `              <!-- TOP ANIME CARD -->
<div class="xl:w-1/4 md:w-1/2 p-4">
    <div class="bg-gray-800 p-6 rounded-lg">
        <img class="anime-size rounded w-full object-cover object-center mb-6"
            src="${image}"
            alt="content">
        <a target = "_blank" href="${url}">
            <h3 class="tracking-widest text-indigo-500 text-xs font-medium hover:underline hover:font-bold">
                ${title}</h3>
        </a>
        <h2 class="text-lg text-white font-medium"><i class="fa fa-star-o mr-2 mt-2"
                aria-hidden="true"></i>${score}</h2>
        <h2 class="text-lg text-white font-medium mb-4"><i class="fa fa-users" aria-hidden="true"></i>
            </i>${members}</h2>


        <p class="leading-relaxed text-base">Episodes: ${episodes}</p>
    </div>
</div>
<!-- TOP ANIME CARD -->`

return template;
}

function resultTitle(result){
    const template = `
    <!-- TITLE -->
    <div class="flex w-full mb-20">

        <div class="lg:w-1/2 w-full mb-6 lg:mb-0">

            <h1 class="sm:text-3xl text-2xl font-medium mb-2 text-white">${result}</h1>

            <div class="h-1 w-20 bg-indigo-500 rounded"></div>
        </div>
    </div>
    <!-- TITLE -->`

    return template
}

function hideAll(){
    $('#search-anime').hide()
    $('#search-genre').hide()
    $('#search-season').hide()

}
$( document ).ready(function() {
    console.log( "ready!" );
    hideAll()
});

////======================to Genre====

function toGenre(){
    console.log($('#genre').val())
    findGenre(event)
    // $('#home-page').show()
    // $('#edit-page').hide()
}

function findGenre(event){
    event.preventDefault()
    $('.anime-page').empty()
    let genre = $('#genre').val() 

    $.ajax({
        method: 'get',
        url: `${baseUrl}/anime/genre/${genre}`
        // headers: {
        //     accestoken: localStorage.accesToken
        
    })
        .done(data => {
            console.log(data.data.anime)
            const genre = data.data.mal_url.name

            $('.anime-page').append(resultTitle(genre))
            for (let i = 0; i<animeDisplayCount ; i++) {
                const image = data.data.anime[i].image_url
                const url = data.data.anime[i].url
                const title = data.data.anime[i].title
                const score = data.data.anime[i].score
                const members = data.data.anime[i].members
                const episodes = data.data.anime[i].episodes
                $('.anime-page').append(animeCard(image,url,title,score,members,episodes))

            };
        })
        .fail(err => {
            console.log(err)
        })
}

/////======================== Find Title ===================/////

function toTitle(){
    console.log($('#title').val())
    $('.anime-page').empty()
    findTitle(event)
    // $('#home-page').show()
    // $('#edit-page').hide()
}

function findTitle(event){
    let title = $('#title').val() 
    event.preventDefault()
    $.ajax({
        method: 'get',
        url: `${baseUrl}/anime/${title}`
        // headers: {
        //     accestoken: localStorage.accesToken
        
    })
        .done(data => {
            console.log(data.data.results[0])
            
            $('.anime-page').append(`
            <div class="container px-5 py-24 mx-auto">

                <!-- TITLE -->
                <div class="flex w-full mb-20">

                    <div class="lg:w-1/2 w-full mb-6 lg:mb-0">

                        <h1 class="sm:text-3xl text-2xl font-medium mb-2 text-white">Hasil Penelusuran: ${title}</h1>

                        <div class="h-1 w-20 bg-indigo-500 rounded"></div>
                    </div>
                </div>
                <!-- TITLE -->
            </div>
            `)
            for (let i = 0; i<animeDisplayCount ; i++) {
                const image = data.data.anime[i].image_url
                const url = data.data.anime[i].url
                const title = data.data.anime[i].title
                const score = data.data.anime[i].score
                const members = data.data.anime[i].members
                const episodes = data.data.anime[i].episodes
                $('.anime-page').append(animeCard(image,url,title,score,members,episodes))
            };
        })
        .fail(err => {
            console.log(err)
        })
}

/////======================== Find Year ===================/////

function toYear(){
    console.log($('#year').val())
    findYear(event)
    $('.anime-page').empty();
    // $('#home-page').show()
    // $('#edit-page').hide()
}

function findYear(event){
    let year = $('#year').val() 
    let season = $('#season').val() 
    event.preventDefault()
    $.ajax({
        method: 'get',
        url: `${baseUrl}/anime/${year}/${season}`
        // headers: {
        //     accestoken: localStorage.accesToken
        
    })
        .done(data => {
            console.log(data.data.anime[0])
            $('.anime-page').append(`
            <div class="container px-5 py-24 mx-auto">

                <!-- TITLE -->
                <div class="flex w-full mb-20">

                    <div class="lg:w-1/2 w-full mb-6 lg:mb-0">

                        <h1 class="sm:text-3xl text-2xl font-medium mb-2 text-white">Hasil Penelusuran: ${year} in ${season}</h1>

                        <div class="h-1 w-20 bg-indigo-500 rounded"></div>
                    </div>
                </div>
                <!-- TITLE -->
            </div>
            `)
            for (let i = 0; i<animeDisplayCount ; i++) {
                const image = data.data.anime[i].image_url
                const url = data.data.anime[i].url
                const title = data.data.anime[i].title
                const score = data.data.anime[i].score
                const members = data.data.anime[i].members
                const episodes = data.data.anime[i].episodes
                $('.anime-page').append(animeCard(image,url,title,score,members,episodes))
            }
            })
        .fail(err => {
            console.log(err)
        })
}