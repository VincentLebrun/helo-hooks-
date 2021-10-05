import React, { useState, useEffect } from 'react';
import './App.css';
import { Cart } from './components/Cart';
import { Header } from './components/Header';
import { Vegetable } from './components/Vegetable';

const App = () => {

  // Création d'une propriété vegetables dans le state
  const [vegetables, setVegetables] = useState([]);
  // Nouvelle propriété dans le state pour stocker les éléments du panier
  const [cart, setCart] = useState({ items: [], total: 0 });
  // const [count, setCount] = useState(vegetables.length);

  // Fonction asynchrone pour faire appel à l'api de Strapi
  const getVegetables = async () => {
    await fetch("http://localhost:1337/vegetables")
      .then(response => response.json())
      .then(data => {
        // Utilisation de la fonction setVegetables mise à disposition par useState. Cette fonction nous permet de mettre à jour la propriété vegetables de notre state
        setVegetables(data);
      });
  };

  // Utilisation du hook useEffect pour faire appel à notre API après le premier rendu du composant (équivalent à la méthode componentDidMount que nous connaissons)
  // Le deuxième paramètre de la fonction useEffect permet de réguler le moment où va s'éxécuter le useEffect
  useEffect(() => {
    getVegetables();
  }, []);

  const addToCart = (vegetable) => {
    // Cette ligne permet d'avoir un id unique lors de l'affichage du panier
    const item = { ...vegetable };
    item.id = `${item.id}-${Date.now()}`; 

    // cart.items.push(vegetable); --> mutation de state
    // on doit toujours passer par la fonction de modification de la propriété qui est mise à disposition par le useState
    setCart({ 
      items: [...cart.items, item], 
      total: Math.round((cart.total + vegetable.price) * 100) / 100
    });
  }

  const listVegetables = vegetables.map(vegetable => {
    return (
      <Vegetable
        key={vegetable.id}
        name={vegetable.name}
        price={vegetable.price}
        image={vegetable.image}
        addToCart={() => addToCart(vegetable)}
      />
    );
  });

  return (
    <div className="App">
      <Header />

      <div className="App-vegetables-wrapper">
        <div className="App-vegetables">
          {listVegetables}
        </div>
      </div>

      <div className="App-cart">
        <Cart
          items={cart.items}
          total={cart.total}
        />
      </div>
    </div>
  );
}

export default App;
