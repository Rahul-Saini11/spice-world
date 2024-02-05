import { getMenu } from "../../services/getRestaurant";
import Button from "../../ui/Button";
import MenuItem from "./MenuItem";

import {useLoaderData} from "react-router-dom"

function Menu(){
    const menu =  useLoaderData();
    return (
        <ul className="divide-y divide-stone-200 px-2">
            {menu.map((food) => <MenuItem food={food} key={food.id} /> )}
        </ul>

    )
}

export async function loader(){
   const menu = await getMenu();
   return menu;
} 

export default Menu;
