import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import Card from "../components/Card";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user).value;

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-40px*2)]">
      <Card>
        <Card.FirstPart>
          <img src={Logo} alt="Logo" className="object-cover h-full" />
        </Card.FirstPart>
        <Card.SecondPart>
          <div className="flex flex-col justify-center items-center min-h-full h-full">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to our PKS Personal Cards!
            </h1>
            <p className="text-xl mb-4">
              Here You Can Create Your Personal Card With PKS Team
            </p>
            {user.isLoggedIn ? (
              <div className="flex gap-2">
                <Link
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  to="/profile"
                >
                  Go To Your Profile
                </Link>
                <Link
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  to={`/card/${user.user.id}`}
                >
                  Go To Your Personal Card
                </Link>
              </div>
            ) : (
              <Link
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                to="/login"
              >
                Get Started
              </Link>
            )}
          </div>
        </Card.SecondPart>
      </Card>
    </div>
  );
};

export default Home;
