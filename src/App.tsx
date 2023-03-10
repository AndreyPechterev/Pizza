import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Error from "./pages/Error";
import "./scss/app.scss";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";

function App() {

    return (
        <div className="wrapper">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/pizza/:id" element={<FullPizza />} />
                    <Route path="*" element={<Error />} />
                </Routes>
        </div>
    );
}

export default App;
