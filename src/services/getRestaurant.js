import supabase from "./supabase";

export async function getMenu() {
  const res = await supabase.from("items").select("*");
  if (res.status === 200) {
    return res.data;
  }
  return new Error("Something went wrong.");
}

export async function createOrder(newOrder) {
  const { customer, phone, address, cart, totalPrice } = newOrder;

  const newData = {
    customer_name: customer,
    contact_number: phone,
    cart,
    address: address,
    total_price: totalPrice,
  };

  const { data, error } = await supabase
    .from("orders")
    .insert([newData])
    .select();

  if (error) {
    throw error;
  }
  return data[0];
}

export async function getOrder(orderId) {
  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("order_id", orderId);

  if (error) {
    return new Error(error.message);
  }

  return data[0];
}
