import { Link } from "react-router-dom";

import SearchOrder from "../features/order/SearchOrder"
import Username from "../features/users/Username";

function Header(){
    return (
        <header className="flex items-center justify-between border-b border-stone-200 bg-orange-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest text-white">
        Spice World
      </Link>

      <SearchOrder />
      <Username />
    </header>
    )
}

export default Header;
