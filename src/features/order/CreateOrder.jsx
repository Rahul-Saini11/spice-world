import { useState } from "react";
import {Form,useActionData, redirect } from "react-router-dom";
import {useSelector } from "react-redux";

import {getCart, getTotalCartPrice, clearCart} from "../cart/cartSlice"
import EmptyCart from "../cart/EmptyCart"
import Button from "../../ui/Button";
import { createOrder } from "../../services/getRestaurant";
import store from '../../store';

const isValidPhone = (str) => /^[0-9]{10}$/.test(str);

function CreateOrder(){
    const username = useSelector(state => state.user.username)
    
    const formErrors = useActionData();

    const cart = useSelector(getCart);
    const totalCartPrice = useSelector(getTotalCartPrice);

    if(!cart.length) return <EmptyCart />

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        className="input grow"
                        type="text"
                        name="customer"
                        defaultValue={username}
                        required
                    />
                </div>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input className="input w-full" type="tel" name="phone" required />
                        {formErrors?.phone && (
                        <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                            {formErrors.phone}
                        </p>
                        )}
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Full Address</label>
                        <input className="input grow" type="text" name="address" required />
                </div>
                <div>
                    <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
                    <input type="hidden" name="totalPrice" defaultValue={totalCartPrice}/>
                    <Button type="primary">Order</Button>
                </div>
            </Form>
        </div>
    )
}

export async function action({request}){
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errors = {};

    const newOrder = {
        ...data,
        cart: JSON.parse(data.cart),
        phone: Number(data.phone),
        totalPrice: Number(data.totalPrice)
    }

    if(!isValidPhone(newOrder.phone)){
        errors.phone = "Please give us your correct phone number. We might need it to contact you."
    }

    if(Object.keys(errors).length > 0) return errors;
    
    const order = await createOrder(newOrder);

     // Do NOT overuse
    store.dispatch(clearCart());
    return redirect(`/order/${order.order_id}`);
}


export default CreateOrder;
