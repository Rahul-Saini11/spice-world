import Button from "../../ui/Button";
import {useDispatch, useSelector} from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({food}){
    const dispatch = useDispatch();

    const {id,title, image, quantity, price} = food;
    
    const currentQuantity = useSelector(getCurrentQuantityById(id))
    const itemInCart = currentQuantity > 0;
    function addItemHandler(){
        const newItem = {
            foodId: id,
            name: title,
            itemQuantity: 1,
            unitPrice: price,
            totalPrice: price
          };
         dispatch(addItem(newItem));
    }

    return (
        <li className="flex gap-4 py-2">
                <img src={image} alt="img" className="h-24 w-24 object-cover"/>
                <div className="grow flex flex-col pt-0.5"> 
                    <p className="font-medium">{title}</p>
                    <p className="text-sm capitalize italic text-stone-500">{quantity}</p>
                    <div className="mt-auto flex items-center justify-between">
                        <p className="text-sm">{formatCurrency(price)}</p>

                        {itemInCart && <div className="flex items-center gap-3 sm:gap-8">
                            <UpdateItemQuantity id={id} currentQuantity={currentQuantity}/>
                            <DeleteItem id={id}/>
                        </div>
                        }

                        {!itemInCart && <Button type="small" onClick={addItemHandler}>Add to Cart</Button>}  
                    </div>
                </div>
        </li>
    )
}

export default MenuItem;
