import static_recipes from "../../data/recipes.json";

export default function Recipes(favorites){
    return {
        recipes: static_recipes.recipes,
        filteredRecipes : static_recipes.recipes,
        activeRecipe : static_recipes[0],
        difficulties : [],
        categories : [],
        filters: {
            difficulty: null,
            title: "",
            category: null,
            timeInterval: null,
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
            Object.entries({...this.filters}).forEach(([key,value])=>{
                if(value==="null"){
                    this.filters[key] = null
                }
            });
            this.filterRecipes();
        },
        filterRecipes(){
            this.filteredRecipes = [...this.recipes].filter((recipe)=>{
                if(this.filters.difficulty && recipe.difficulty!==this.filters.difficulty){
                    return false;
                }
                if(this.filters.title && !recipe.title.includes(this.filters.title)){
                    return false;
                }
                if(this.filters.category && recipe.category !== this.filters.category){
                    return false;
                }
                if(this.filters.timeInterval){
                    const timeInterval = this.timeIntervals.find(({slug})=>slug===this.filters.timeInterval);
                    if(timeInterval && !timeInterval.callback(recipe.preparationTime)){
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
