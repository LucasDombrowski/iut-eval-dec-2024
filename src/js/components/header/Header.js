/*The component dedicated to the site header and navigation */
export default function Header(){
    return {
        active: false,
        burgerClick(){
            this.active = !this.active;
        }
    }
}