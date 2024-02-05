import { Link } from "react-router-dom";
import Button from "./Button";
import {useSelector} from 'react-redux';
import CreateUser from "../features/users/CreateUser";

function Home() {
  const username =  useSelector(state => state.user.username)
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8  text-xl font-semibold md:text-3xl">
        The best Indian food.
        <br />
        <span className="text-orange-500">
          High quality food, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
