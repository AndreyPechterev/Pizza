import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

function FullPizza() {
    const { id } = useParams();
    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        price: number;
    }>({
        imageUrl: "",
        price: 0,
    });
    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `https://63f9de3e897af748dcc4cb3c.mockapi.io/items/${id}`
                );
                setPizza(data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchPizza();
    }, []);
    return (
        <div className="container">
            <img src={pizza.imageUrl} />
            <h2>{pizza.price}</h2>
        </div>
    );
}

export default FullPizza;
