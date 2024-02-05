import {useDispatch, useSelector} from "react-redux";
import { deleteItem, getCurrentQuantityById } from "./cartSlice";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import UpdateItemQuantity from "./UpdateItemQuantity";
import DeleteItem from "./DeleteItem";

function CartItem({item}){
    const {foodId,itemQuantity,name,totalPrice} = item;
    const username = useSelector((state) => state.user.username)
    const currentQuantity = useSelector(getCurrentQuantityById(foodId))
    const dispatch = useDispatch();
    return (
        <li className="py-3 sm:flex sm:items-center sm:justify-between">
            <p>{itemQuantity}&times;{name} </p>
            <div className="flex items-center justify-between sm:gap-6">
                <p>{formatCurrency(totalPrice)}</p>
                    <UpdateItemQuantity id={foodId} currentQuantity={currentQuantity}/>
                    <DeleteItem id={foodId}/>
            </div>
        </li>
    )
}

export default CartItem;
