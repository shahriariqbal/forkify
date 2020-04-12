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
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

//*******Global State of the app
//Search Object
//Current recipe object
//Liked recipes

const state = {};
window.state = state;

//*********************Search Controller************************** */

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

		try {
			//4) Search for recipes
			await state.search.getResults();

			//5)Render results on UI
			clearLoader();
			searchView.renderResults(state.search.result);
		} catch (err) {
			alert('Something went wrong with search......');
			clearLoader();
		}
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', (e) => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

//***********************************Recipe Controller*************************************************************/
const controlRecipe = async () => {
	//Get Id from url
	const id = window.location.hash.replace('#', '');
	console.log(id);

	if (id) {
		//Prepare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		//Highlight selected search item
		if (state.search) searchView.highlightSelected(id);

		//Create new Recipe object
		state.recipe = new Recipe(id);

		try {
			//Get recipe data and parse ingredients
			await state.recipe.getRecipe();

			state.recipe.parseIngredients();

			//Calculate servings and time
			state.recipe.calcTime();
			state.recipe.calcServings();

			//Render recipe
			clearLoader();
			recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
		} catch (err) {
			alert('Error processing recipe');
		}
	}
};

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

[ 'hashchange', 'load' ].forEach((event) => window.addEventListener(event, controlRecipe));

//***********************List Controller*********************************** */

const controlList = () => {
	//Create new list if there is no list
	if (!state.list) state.list = new List();

	//Add each ingredient to the list and UI
	state.recipe.ingredients.forEach((el) => {
		const item = state.list.addItem(el.count, el.unit, el.ingredient);
		listView.renderItem(item);
	});
};

//Handle delete and update list item events
elements.shopping.addEventListener('click', (e) => {
	const id = e.target.closest('.shopping__item').dataset.itemid;

	//Handle the delete button
	if (e.target.matches('.shopping__delete, .shopping__delete *')) {
		//Delete from state
		state.list.deleteItem(id);

		//Delete from UI
		listView.deleteItem(id);

		//handle the count update
	} else if (e.target.matches('.shopping__count-value')) {
		const val = parseFloat(e.target.value, 10);
		state.list.updateCount(id, val);
	}
});

//*************************Like Controller********************************************* */

const controlLike = () => {
	if (!state.likes) state.likes = new Likes();
	const currentID = state.recipe.id;

	//User has not yet liked current recipe
	if (!state.likes.isLiked(currentID)) {
		//Add like to the state
		const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img);

		//Toggle the like button
		likesView.toggleLikeBtn(true);

		//Add like to UI list
		likesView.renderLike(newLike);

		//User has  liked current recipe
	} else {
		//Remove like from the state
		state.likes.deleteLike(currentID);

		//Toggle the like button
		likesView.toggleLikeBtn(false);

		//Remove like from UI list
		likesView.deleteLike(currentID);
	}
	likesView.toggleLikeMenu(state.likes.getNumLikes());
};

//Restore liked recipes on page load
window.addEventListener('load', () => {
	state.likes = new Likes();

	//Restore likes

	state.likes.readStorage();

	//Toggle like menu button
	likesView.toggleLikeMenu(state.likes.getNumLikes());

	//Render the existing likes
	state.likes.likes.forEach(like => likesView.renderLike(like));
});

//Handling recipe button clicks

elements.recipe.addEventListener('click', (e) => {
	if (e.target.matches('.btn-decrease, .btn-decrease *')) {
		//Decrease button is clicked

		if (state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngredients(state.recipe);
		}
	} else if (e.target.matches('.btn-increase, .btn-increase *')) {
		//Decrease button is clicked
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredients(state.recipe);
	} else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
		controlList();
	} else if (e.target.matches('.recipe__love, .recipe__love *')) {
		controlLike();
	}
});

window.l = new List();
