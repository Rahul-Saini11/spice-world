import { RouterProvider, createBrowserRouter } from "react-router-dom"

import AppLayout from "../src/ui/AppLayout"
import Home from "./ui/Home"
import Menu, { loader as menuLoader } from "./features/menu/menu"
import Cart from "./features/cart/cart"
import Order, {loader as orderLoader} from "./features/order/Order"
import CreateOrder,{action as createOrderAction} from "./features/order/CreateOrder"
import Error from "./ui/Error"

const router = createBrowserRouter([
  {
    element:<AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction
      },{
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
