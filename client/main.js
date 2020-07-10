// const author = require("../server/middleware/authorization");

const baseUrl = 'http://localhost:3000'
const animeDisplayCount = 10;
let currentId = null;

function animeCard(image, url, title, score, members, episodes) {
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

function resultTitle(result) {
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

function hideAll() {
    $('#search-anime').hide()
    $('#search-manga').hide()
    $('#search-genre').hide()
    $('#search-season').hide()
    $('#navbar').hide()
    $('#login-form').hide()
    $('#logout').hide()
    $('#register-form').hide()
    $('#detail-manga').hide()
    $('#detail-anime').hide()

}

function animeSeason() {
    hideAll()
    $('#navbar').show()
    $('#search-season').show()
}

function animeGenre() {
    hideAll()
    $('#navbar').show()
    $('#search-genre').show()
}

function findManga() {
    hideAll()
    $('#navbar').show()
    $('#search-manga').show()
}

function findAnime() {
    hideAll()
    $('#navbar').show()
    $('#search-anime').show()
}

function auth() {
    if (localStorage.token) {
        hideAll()
        $('#navbar').show()
        $('#logout').show()
    }
    else {
        hideAll()
        $('#login-form').show()
    }
}
$(document).ready(function () {
    console.log("ready!");
    hideAll()
    auth()
    quote()

});

function pageRegister() {
    hideAll()
    $('#register-form').show()
}

function register(event) {
    event.preventDefault()
    let name = $('#register-username').val()
    let email = $('#register-email').val()
    let password = $('#register-password').val()
    $.ajax({
        url: `${baseUrl}/users/register`,
        method: 'post',
        data: {
            name,
            password,
            email
        }
    })
        .done(data => {
            auth()
        })
        .always(() => {
            $('#register-name').val('')
            $('#register-email').val('')
            $('#register-password').val('')
        })
}

function logout() {
    localStorage.clear()
    auth()
}


function login(event) {
    event.preventDefault()
    let email = $('#login-email').val()
    let password = $('#login-password').val()
    $.ajax({
        url: `${baseUrl}/users/login`,
        method: 'post',
        data: {
            email,
            password
        }
    })
        .done(data => {
            localStorage.setItem('token', data.token)
            currentId = data.id
            auth()
        })
        .fail(err => {
            console.log(err)
        })
        .always(_ => {
            $('#login-email').val('')
            $('#login-password').val('')
        })
}


////======================to Genre====

function quote(){
    $.ajax({
        method: 'get',
        url: `${baseUrl}/quote`
    })
    .done(data=>{
        const {quote,character,anime} = data
        $('#quote-quote').text(quote)
        $('#quote-character').text(character)
        $('#quote-anime').text(anime)
        console.log(data)
    })
}

function manga(){
    const title = $('#input-manga').val()
    $.ajax({
        method: 'get',
        url: `${baseUrl}/users/manga/:${title}`
    })
    .done(data=>{
        const {image,title,rating,status,volume} = data
        console.log(data)
        $('#manga-image').attr('src',image);
        $('#manga-title').text(title)
        $('#manga-rating').text(rating)
        $('#manga-status').text(status)
        $('#manga-volume').text(volume)

        $('#detail-manga').show()

    })
    .always(()=>{
        $('#input-manga').val('')
    })
}

function favoriteManga() {
    $.ajax({
        method: 'post',
        url: `${baseUrl}/users/${currentId}/favManga`,
        headers: {
            token: localStorage.token
        }
    })
}

function toGenre() {
    console.log($('#genre').val())
    findGenre(event)
    // $('#home-page').show()
    // $('#edit-page').hide()
}

function findGenre(event) {
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
            for (let i = 0; i < animeDisplayCount; i++) {
                const image = data.data.anime[i].image_url
                const url = data.data.anime[i].url
                const title = data.data.anime[i].title
                const score = data.data.anime[i].score
                const members = data.data.anime[i].members
                const episodes = data.data.anime[i].episodes
                $('.anime-page').append(animeCard(image, url, title, score, members, episodes))

            };
        })
        .fail(err => {
            console.log(err)
        })
}

/////======================== Find Title ===================/////

function toTitle() {
    console.log($('#title').val())
    $('.anime-page').empty()
    findTitle(event)
    // $('#home-page').show()
    // $('#edit-page').hide()
}

function findTitle(event) {
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
            for (let i = 0; i < animeDisplayCount; i++) {
                const image = data.data.anime[i].image_url
                const url = data.data.anime[i].url
                const title = data.data.anime[i].title
                const score = data.data.anime[i].score
                const members = data.data.anime[i].members
                const episodes = data.data.anime[i].episodes
                $('.anime-page').append(animeCard(image, url, title, score, members, episodes))
            };
        })
        .fail(err => {
            console.log(err)
        })
}

/////======================== Find Year ===================/////

function toYear() {
    console.log($('#year').val())
    findYear(event)
    $('.anime-page').empty();
    // $('#home-page').show()
    // $('#edit-page').hide()
}

function findYear(event) {
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
            for (let i = 0; i < animeDisplayCount; i++) {
                const image = data.data.anime[i].image_url
                const url = data.data.anime[i].url
                const title = data.data.anime[i].title
                const score = data.data.anime[i].score
                const members = data.data.anime[i].members
                const episodes = data.data.anime[i].episodes
                $('.anime-page').append(animeCard(image, url, title, score, members, episodes))
            }
        })
        .fail(err => {
            console.log(err)
        })
}