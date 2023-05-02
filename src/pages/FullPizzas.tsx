import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FullPizzas: React.FC = () => {
  const { id } = useParams();
  const [pizzas, setPizzas] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();
  React.useEffect(() => {
    async function pizzasData() {
      try {
        const { data } = await axios.get(
          "https://63b6af9b4f17e3a931bbffb5.mockapi.io/items/" + id
        );
        setPizzas(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    }
    pizzasData();
  }, []);
  if (!pizzas) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container">
      <img src={pizzas.imageUrl} />
      <h1>{pizzas.title}</h1>

      <h4>{pizzas.price} ₽</h4>
      <Link to="/">
        {" "}
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};
export default FullPizzas;
