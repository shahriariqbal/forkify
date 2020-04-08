//*****Import Export Module basic concept*******//

//import str from './models/Search';

//import {add as a, multiply as m, ID} from './views/searchView';
//console.log(`Using imported functions! ${a(ID,2)} and ${m(3, 5)}. ${str}`);

//another way
//import * as searchView from './views/searchView';
//console.log(`Using imported functions! ${searchView.add(searchView.ID,2)} and ${searchView.multiply(3, 5)}. ${str}`);

//*********************************************Project Start**************************************************************************//

//https://forkify-api.herokuapp.com/api/search
//https://forkify-api.herokuapp.com/api/search?q=pizza
//https://crossorigin.me/
//https://cors-anywhere.herokuapp.com/

/*import axios from 'axios';

async function getResults(query){
	const proxy = 'https://cors-anywhere.herokuapp.com/';
	try{
		const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?q=${query}`);
	    const recipes = res.data.recipes;
	    console.log(recipes);
	}catch(error){
		alert(error);
	}

	
}
getResults('carrot');*/

import Search from './models/Search';

const search = new Search('pizza');
console.log(search);
search.getResults();