import static_recipes from "../../data/recipes.json";

export default function Recipes(favorites){
    return {
        recipes: static_recipes.recipes,
        filteredRecipes : static_recipes.recipes,
        /* The recipe that is currently shown in the lightbox */
        activeRecipe : static_recipes[0],
        difficulties : [],
        categories : [],
        filters: {
            difficulties: [],
            title: "",
            categories: [],
            timeIntervals: [],
            onlyFavorites: false
        },
        favorites: favorites,
        timeIntervals : [
            {
                label: "Rapide",
                slug: "quick",
                callback : (preparationTime)=>{
                    return preparationTime < 30
                }
            },
            {
                label: "Moyen",
                slug: "middle",
                callback : (preparationTime)=>{
                    return preparationTime >= 30 && preparationTime <= 60;
                }
            },
            {
                label: "Long",
                slug: "long",
                callback: (preparationTime)=>{
                    return preparationTime > 60;
                }
            }
        ],
        /*Handle the lightbox visibility*/
        showLightbox: false,
        init(){
            this.getDifficulties();
            this.getCategories();
        },
        setActiveRecipe(index){
            this.activeRecipe = this.recipes[index];
            this.showLightbox = true;
        },
        cancelActiveRecipe(){
            this.showLightbox = false;
        },
        getDifficulties(){
            this.difficulties = Array.from(new Set([...this.recipes].map(({difficulty})=>difficulty)))
        },
        handleFiltersChanges(){
            this.filterRecipes();
        },
        addFilter(key,slug){
            this.filters[key].push(slug);
        },
        removeFilter(key,slug){
            this.filters[key] = this.filters[key].filter(v=>v!==slug);
        },
        filterRecipes(){
            this.filteredRecipes = [...this.recipes].filter((recipe)=>{
                if(this.filters.difficulties.length>0 && !this.filters.difficulties.includes(recipe.difficulty)){
                    return false;
                }
                if(this.filters.title && !recipe.title.includes(this.filters.title)){
                    return false;
                }
                if(this.filters.categories.length>0 && !this.filters.categories.includes(recipe.category)){
                    return false;
                }
                if(this.filters.timeIntervals.length > 0){
                    let available = false;
                    for(let timeIntervalSlug of this.filters.timeIntervals){
                        const timeInterval = this.timeIntervals.find(({slug})=>timeIntervalSlug===slug);
                        if(timeInterval && timeInterval.callback(recipe.preparationTime)){
                            available = true;
                        }
                    }
                    if(!available){
                        return false;
                    }
                }
                if(this.filters.onlyFavorites && !this.favorites.includes(recipe.id)){
                    return false;
                }
                return true;
            })
        },
        getCategories(){
            this.categories = Array.from(new Set([...this.recipes].map(({category})=>category)));
        },
        addFavorite(id){
            this.favorites.push(id);
        },
        delFavorite(idToRemove){
            this.favorites = this.favorites.filter((id)=>id!==idToRemove);
        },
        toggleFavorite(id){
            if(this.favorites.includes(id)){
                this.delFavorite(id);
            } else {
                this.addFavorite(id);
            }
        }
    }
}
