import {useLoaderData} from 'react-router-dom';

import { getOrder } from "../../services/getRestaurant";
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers';

function Order(){
    const data = useLoaderData();
    
    if(!data){
        return <h1 className='text-center py-4'>Order not found. Please check your order ID.</h1>
    }

    const {order_id, status, estimated_delivery, cart, total_price} = data;
    const delveryIn = calcMinutesLeft(estimated_delivery);
    return (
        <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{order_id} status</h2>

        <div className="space-x-2">
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {delveryIn > 0
            ? `Only ${delveryIn} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimated_delivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map(item =>
            <li className="space-y-1 py-3" key={item.foodId}>
                <div className="flex items-center justify-between gap-4 text-sm">
                    <p>
                    <span className="font-bold">{item.itemQuantity}&times;</span> {item.name}
                    </p>
                    <p className="font-bold">{formatCurrency(item.totalPrice)}</p>
                </div>
            </li>)}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Food price: {formatCurrency(total_price)}
        </p>
        {status === 'Preparing' && 
        <p className="font-bold">
          To pay on delivery: {formatCurrency(total_price)}
        </p>
        }
      </div>
    </div>
    )
}

export default Order;

export async function loader({params}){
    const order = await getOrder(params.orderId);
    if(!order) return null;
    return order;
}
