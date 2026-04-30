import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_plant_02.jpg/800px-Snake_plant_02.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hierbabuena_0611_Revised.jpg/800px-Hierbabuena_0611_Revised.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/800px-Spathiphyllum_cochlearispathum_RTBG.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
        { name: "Boston Fern", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Nephrolepis_exaltata_var_bostoniensis_fern.jpg/800px-Nephrolepis_exaltata_var_bostoniensis_fern.jpg", description: "Acts as a natural humidifier.", cost: "$20" },
        { name: "Rubber Plant", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Ficus_elastica_variegata.jpg/800px-Ficus_elastica_variegata.jpg", description: "Absorbs airborne chemicals.", cost: "$17" },
        { name: "Aloe Vera", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/800px-Aloe_vera_flower_inset.png", description: "Clears benzene and formaldehyde.", cost: "$14" },
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Single_lavendar_flower02.jpg/800px-Single_lavendar_flower02.jpg", description: "Calming scent, reduces anxiety.", cost: "$20" },
        { name: "Jasmine", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/050228_FranciscoDA_Jasmine.jpg/800px-050228_FranciscoDA_Jasmine.jpg", description: "Sweet fragrance, improves sleep.", cost: "$18" },
        { name: "Rosemary", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/20140407Rosmarinus_officinalis2.jpg/800px-20140407Rosmarinus_officinalis2.jpg", description: "Improves memory and concentration.", cost: "$15" },
        { name: "Mint", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Lamiaceae_shoot_Pennyroyal.jpg/800px-Lamiaceae_shoot_Pennyroyal.jpg", description: "Fresh scent, aids digestion.", cost: "$12" },
        { name: "Lemon Balm", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-091.jpg/800px-Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-091.jpg", description: "Citrusy aroma, reduces stress.", cost: "$14" },
        { name: "Hyacinth", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Hyacinthus_orientalis_ftd.jpg/800px-Hyacinthus_orientalis_ftd.jpg", description: "Strong floral scent, uplifting.", cost: "$22" },
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Echinacea", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Echinacea_purpurea.jpg/800px-Echinacea_purpurea.jpg", description: "Boosts immune system.", cost: "$16" },
        { name: "Peppermint", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Mentha_x_piperita_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-095.jpg/800px-Mentha_x_piperita_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-095.jpg", description: "Relieves headaches and nausea.", cost: "$13" },
        { name: "Chamomile", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Matricaria_recutita_-_Flickr_003.jpg/800px-Matricaria_recutita_-_Flickr_003.jpg", description: "Calming, aids sleep.", cost: "$15" },
        { name: "Turmeric", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Curcuma_longa_roots.jpg/800px-Curcuma_longa_roots.jpg", description: "Anti-inflammatory properties.", cost: "$19" },
        { name: "Ginger", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Zingiber_officinale_2.jpg/800px-Zingiber_officinale_2.jpg", description: "Aids digestion, reduces nausea.", cost: "$11" },
        { name: "Valerian", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Valerian_%28Valeriana_officinalis%29.jpg/800px-Valerian_%28Valeriana_officinalis%29.jpg", description: "Natural sleep aid.", cost: "$17" },
      ]
    },
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      {!showCart ? (
        <div>
          <div style={{ backgroundColor: '#4CAF50', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: 'white' }}>
              <h3 style={{ margin: 0 }}>Paradise Nursery</h3>
              <p style={{ margin: 0, fontSize: '12px' }}>Where Green Meets Serenity</p>
            </div>
            <a href="#plants" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Plants</a>
            <a href="#cart" onClick={handleCartClick} style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>
              🛒 <span style={{ fontSize: '16px' }}>{totalCartItems}</span>
            </a>
          </div>
          <div style={{ padding: '20px' }}>
            {plantsArray.map((category) => (
              <div key={category.category}>
                <h2 style={{ textAlign: 'center', borderBottom: '2px solid #4CAF50', paddingBottom: '8px' }}>{category.category}</h2>
                <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                  {category.plants.map((plant) => (
                    <div key={plant.name} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', width: '200px', textAlign: 'center', position: 'relative' }}>
                      <span style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'red', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>SALE</span>
                      <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }} />
                      <h4 style={{ margin: '8px 0 4px' }}>{plant.name}</h4>
                      <p style={{ color: 'green', fontWeight: 'bold', margin: '4px 0' }}>{plant.cost}</p>
                      <p style={{ fontSize: '12px', color: '#555', margin: '4px 0' }}>{plant.description}</p>
                      <button
                        onClick={() => handleAddToCart(plant)}
                        disabled={!!addedToCart[plant.name]}
                        style={{ marginTop: '8px', padding: '8px 12px', backgroundColor: addedToCart[plant.name] ? '#aaa' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer', width: '100%' }}
                      >
                        {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
