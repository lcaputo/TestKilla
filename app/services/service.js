import { articles_url, _api_key, country_code } from '../config/rest_consfig';

export async function getArticles(category='general') {

    try {
        let mmovies = await fetch(`http://localhost:8000/movies`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
/*             body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            }), */
        });

        let result = await movies.json();
        movies = null;

        return result.movies;
    }
    catch (error) {
        throw error;
    }

}