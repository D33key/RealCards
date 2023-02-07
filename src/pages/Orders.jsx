import React, { useContext } from "react";
import Card from "../components/Card/Card";
import Info from '../components/Info/Info';
import AppContext from "../context";

const Orders = () => {
    let { confirmedOrder, setConfirmedOrder } = useContext(AppContext);

    return (
        <div className="orders">
            <div className="titleWrapper">
                <h1>Мои заказы</h1>
                {confirmedOrder.length > 0 ? (
                    <>
                        <div className="items">
                            {confirmedOrder.map((favorite) => (
                                <Card
                                    {...favorite}
                                    key={favorite.id}
                                    isHidden={true}
                                />
                            ))}
                        </div>
                        <button
                            className="confirm"
                            onClick={() => {
                                localStorage.clear();
                                setConfirmedOrder([]);
                            }}
                        >
                            Очистить мои заказы
                        </button>
                    </>
                ) : (
                    <Info
                        title={"У вас нет заказов"}
                        description={"Оформите хотя бы один заказ."}
                        img={"assets/infoImages/noorders.jpg"}
                        isDrawer={false}
                    />
                )}
            </div>
        </div>
    );
};

export default Orders;
