export const elements = {
	searchForm: document.querySelector('.search'),
	searchInput: document.querySelector('.search__field'),
<<<<<<< HEAD
<<<<<<< HEAD
	searchRes: document.querySelector('.results'),
	searchResList: document.querySelector('.results__list'),
	searchResPages: document.querySelector('.results__pages') 
};

export const elementStrings = {
	loader: 'loader'
};

export const renderLoader = (parent) => {
	const loader = `
	<div class = "${elementStrings.loader}">
	  <svg>
	    <use href = "img/icons.svg#icon-cw"></use>
	  </svg>
	</div>  
	`;
	parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if(loader) loader.parentElement.removeChild(loader);
}
=======
	searchResList: document.querySelector('.results__list')
};
>>>>>>> parent of 30c7c93... Rendering an AJAX Loading Spinner
=======
	searchResList: document.querySelector('.results__list')
};
>>>>>>> parent of 30c7c93... Rendering an AJAX Loading Spinner
