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
//********************************************************

import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';



//*******Global State of the app
//Search Object
//Current recipe object
//Liked recipes

const state = {};

const controlSearch = async () => {
	//1) Get query from view
	const query = searchView.getInput();
	

	if (query) {
		//2) New search objetc and add to state
		state.search = new Search(query);

		//3) Prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		//4) Search for recipes
		await state.search.getResults();

		//5)Render results on UI
		clearLoader();
		searchView.renderResults(state.search.result);
	}
}

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
	console.log(e.target);
});