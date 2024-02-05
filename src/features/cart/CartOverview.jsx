import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import { getTotalCartQuantity,getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
function cartOverview(){
    const totalCartQuantity = useSelector(getTotalCartQuantity);
    const totalCartPrice = useSelector(getTotalCartPrice);
    if (!totalCartQuantity) return null;
    return (
        <div className="flex items-center justify-between py-4 px-4 text-sm uppercase bg-stone-800 text-stone-200 sm:px-6 md:text-base">
            <p>{totalCartQuantity} Food Items {formatCurrency(totalCartPrice)}</p>
            <Link to="/cart">Open cart &rarr;</Link>
        </div>
    )
}

export default cartOverview;
