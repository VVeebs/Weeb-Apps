const axios = require('axios')

class ControllerAnime {
    static top(req, res, next) {

        axios({
            url: `https://api.jikan.moe/v3/top/anime`,
            methode: 'GET',

        })
            .then(response => {
                let { data } = response

                res.status(200).json({ data })
            })
            .catch(err => {
                
                next()
            })
    }

    static genre(req, res, next) {

        let genre = (req.params.genre).toLowerCase()
        let genre_id = null

        switch (genre) {
            case 'action':
                genre_id = 1;
                break;
            case 'adventure':
                genre_id = 2;
                break;
            case 'cars':
                genre_id = 3;
                break;
            case 'comedy':
                genre_id = 4;
                break;
            case 'mystery':
                genre_id = 7;
                break;
            case 'drama':
                genre_id = 8;
                break;
            case 'game':
                genre_id = 11;
                break;
            case 'horor':
                genre_id = 14;
                break;
            case 'kids':
                genre_id = 15;
                break;
            case 'romance':
                genre_id = 22;
                break;
            case 'school':
                genre_id = 23;
                break;
            case 'fantasy':
                genre_id = 10;
                break;
            case 'sci fi':
                genre_id = 24;
                break;
            case 'thriller':
                genre_id = 41;
                break;
            default:
                genre_id = 100;
                

        }

        if (genre_id == 100){
            res.status(404).json({msg: 'not found'})
        }
        
        axios({
            url: `https://api.jikan.moe/v3/genre/anime/${genre_id}`,
            methode: 'GET',

        })
            .then(response => {
                let { data } = response

                res.status(200).json({ data })
            })
            .catch(err => {
                next(err)

            })
    }

    static showAll(req, res, next) {

        axios({
            url: `https://kitsu.io/api/edge/anime`,
            methode: 'GET',

        })
            .then(response => {
                let { data } = response

                res.status(200).json({ data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    static byYear(req, res, next) {

        let year = req.params.year
        let seasion = req.params.seasion

        axios({
            url: `https://api.jikan.moe/v3/season/${year}/${seasion}`,
            methode: 'GET',

        })
            .then(response => {
                let { data } = response

                res.status(200).json({ data })
            })
            .catch(err => {
                console.log(err)
                next()
            })
    }


}

module.exports = ControllerAnime
