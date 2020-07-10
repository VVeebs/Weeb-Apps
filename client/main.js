const baseUrl = 'http://localhost:3000'


$( document ).ready(function() {
    console.log( "ready!" );
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
            
            $('.anime-page').append(`
            <div class="container px-5 py-24 mx-auto">

                <!-- TITLE -->
                <div class="flex w-full mb-20">

                    <div class="lg:w-1/2 w-full mb-6 lg:mb-0">

                        <h1 class="sm:text-3xl text-2xl font-medium mb-2 text-white">${data.data.mal_url.name}</h1>

                        <div class="h-1 w-20 bg-indigo-500 rounded"></div>
                    </div>
                </div>
                <!-- TITLE -->
            </div>
            `)
            for (let i = 0; i<5 ; i++) {
                $('.anime-page').append(`
                           

            <div class="flex flex-wrap -m-4">

                <!-- TOP ANIME CARD -->
                <div class="xl:w-1/4 md:w-1/2 p-4">
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <img class="h-full rounded w-full object-cover object-center mb-6"
                            src="${data.data.anime[i].image_url}"
                            alt="content">
                        <a href="https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood">
                            <h3
                                class="tracking-widest text-indigo-500 text-xs font-medium hover:underline hover:font-bold">
                                ${data.data.anime[i].title}</h3>
                        </a>
                        <h2 class="text-lg text-white font-medium"><i class="fa fa-star-o mr-2 mt-2"
                                aria-hidden="true"></i>${data.data.anime[i].score}</h2>
                        <h2 class="text-lg text-white font-medium mb-4"><i class="fa fa-users" aria-hidden="true"></i>
                            </i>${data.data.anime[i].members}</h2>


                        <p class="leading-relaxed text-base">Episodes: ${data.data.anime[i].episodes}</p>
                    </div>
                </div>
                <!-- TOP ANIME CARD -->

            </div>
            
            `)

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
            for (let i = 0; i<5 ; i++) {
                $('.anime-page').append(`
                           

            <div class="flex flex-wrap -m-4">

                <!-- TOP ANIME CARD -->
                <div class="xl:w-1/4 md:w-1/2 p-4">
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <img class="h-full rounded w-full object-cover object-center mb-6"
                            src="${data.data.results[i].image_url}"
                            alt="content">
                        <a href="https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood">
                            <h3
                                class="tracking-widest text-indigo-500 text-xs font-medium hover:underline hover:font-bold">
                                ${data.data.results[i].title}</h3>
                        </a>
                        <h2 class="text-lg text-white font-medium"><i class="fa fa-star-o mr-2 mt-2"
                                aria-hidden="true"></i>${data.data.results[i].score}</h2>
                        <h2 class="text-lg text-white font-medium mb-4"><i class="fa fa-users" aria-hidden="true"></i>
                            </i>${data.data.results[i].members}</h2>


                        <p class="leading-relaxed text-base">Episodes: ${data.data.results[i].episodes}</p>
                    </div>
                </div>
                <!-- TOP ANIME CARD -->

            </div>
            
            `)

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
            for (let i = 0; i<5 ; i++) {
                $('.anime-page').append(`
                           

            <div class="flex flex-wrap -m-4">

                <!-- TOP ANIME CARD -->
                <div class="xl:w-1/4 md:w-1/2 p-4">
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <img class="h-full rounded w-full object-cover object-center mb-6"
                            src="${data.data.anime[i].image_url}"
                            alt="content">
                        <a href="https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood">
                            <h3
                                class="tracking-widest text-indigo-500 text-xs font-medium hover:underline hover:font-bold">
                                ${data.data.anime[i].title}</h3>
                        </a>
                        <h2 class="text-lg text-white font-medium"><i class="fa fa-star-o mr-2 mt-2"
                                aria-hidden="true"></i>${data.data.anime[i].score}</h2>
                        <h2 class="text-lg text-white font-medium mb-4"><i class="fa fa-users" aria-hidden="true"></i>
                            </i>${data.data.anime[i].members}</h2>


                        <p class="leading-relaxed text-base">Episodes: ${data.data.anime[i].episodes}</p>
                    </div>
                </div>
                <!-- TOP ANIME CARD -->

            </div>
            
            `)

            };
        })
        .fail(err => {
            console.log(err)
        })
}