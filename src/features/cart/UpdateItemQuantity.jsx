import {useDispatch} from "react-redux";
import { decreaseItemQuantity, getCurrentQuantityById, increaseItemQuantity } from "../cart/cartSlice";
import Button from "../../ui/Button";

function UpdateItemQuantity({id, currentQuantity}){
    const dispatch = useDispatch();
    return (
        <div className="flex items-center gap-2 md:gap-3">
            <Button type='round' onClick={() => dispatch(decreaseItemQuantity(id))}>-</Button>
            {currentQuantity}
            <Button type='round' onClick={() => dispatch(increaseItemQuantity(id))}>+</Button>
        </div>  
    )
}

export default UpdateItemQuantity;
