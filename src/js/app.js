import Alpine from "alpinejs";
import Recipes from "./components/Recipes";
import Header from "./components/header/Header";
import HeaderNavigation from "./components/header/HeaderNavigation";
import Swiper from "./components/swiper/Swiper";
import { register } from 'swiper/element/bundle';
import { persist } from "@alpinejs/persist";
import { intersect } from "@alpinejs/intersect";
register();

window.alpine = Alpine;

Alpine.plugin(persist);
Alpine.plugin(intersect);

window.Recipes = Recipes;
window.Header = Header;
window.HeaderNavigation = HeaderNavigation;
window.Swiper = Swiper;

// declare your Alpine components here...

Alpine.start();
