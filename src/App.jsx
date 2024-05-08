import {useState} from "react";

const initialItems = [
  {
    id: "001",
    name: "Milk",
    quantity: 0,
    bought: false,
    price: 0
  },

  {
    id: "002",
    name: "Bread",
    quantity: 1,
    bought: false,
    price: 0
  },

  {
    id: "003",
    name: "Oats",
    quantity: 1,
    bought: false,
    price: 0
  },

  {
    id: "004",
    name: "Bananas",
    quantity: 1,
    bought: false,
    price: 0
  },
]



export default function App() {

  const [items, setItems] = useState(initialItems);
  // const [items, setItems] = useState([]);

  return (
    <div>
      <Logo />
      <Main items={items} setItems={setItems} />
      <Footer items={items} />
    </div>
  );
}


function Logo() {

  return <h1 className="logo">Shopping List</ h1>
}


function Main({items, setItems}) {

  function handleAddToList(newItem) {
    setItems(items => [...items, newItem]);
    setShowAddForm(false);
  }

  const [showAddForm, setShowAddForm] = useState(false);

  return ( 
    <div className="main">

      <div >
        <List items={items} setItems={setItems} showAddForm={showAddForm} setShowAddForm={setShowAddForm} >Grocery</List>
        {showAddForm && <AddItemForm onAddToList={handleAddToList} />}
      </ div>

    </ div>
  );
}

function List({items, setItems, showAddForm, setShowAddForm, children}) {  

  function handleClearList() {

    const confirmClear = window.confirm("Are u sure u want to remove all items from the list");

    if(confirmClear)
      setItems([]);
  }

  return (
      <ul>        
        <h3>{children}</h3>     
        {items.map(item => <Item item={item} items={items} setItems={setItems} key={item.id} />)}
        {/*<h4>List Total = X</h4>*/}

        <div style={{display: "flex", justifyContent: "space-between", paddingTop: "1.2rem" }}>
          <Button onClick={() => setShowAddForm(show => !show)} >{showAddForm ? "Close" : "Add Item"}</ Button>
          {items.length > 0 && <Button onClick={handleClearList} >Clear List </ Button>}
        </ div>

      </ul>
  );
}


function Item({item, items, setItems}) {

  function handleBuyItem(id) {

    if(item.price < 1) return;
    setItems(items => items.map(item => item.id === id ? {...item, bought: !item.bought} : item))
  }

  function handleIncreaseQuantity(id) {
    // console.log("inc");
    setItems(items => items.map(item => item.id === id ? {...item, quantity: item.quantity+1} : item))
  }

  function handleDecreaseQuantity(id) {
    // console.log("dec");
    setItems(items => items.map(item => item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity-1} : item))    
  }

  function handleRemoveItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleUpdatePrice(e) {
    setItems(items => items.map(el => el.id === item.id ? {...el, price: Number(e.target.value)} : el));
  }

  return (
    <li >
      <input type="checkbox" disabled={item.price <= 0} value={item.bought} onChange={() => handleBuyItem(item.id)} />

      <span style={item.bought ? {textDecoration: "line-through"} : {}} >{item.name}</ span>

      <span style={{gap: "1.2rem"} } >
        <button onClick={() => handleDecreaseQuantity(item.id)} >-</ button>
        {item.quantity}
        <button  onClick={() => handleIncreaseQuantity(item.id)} >+</ button>
      </span>

      <input placeholder="Price..." value={item.price} onChange={e => handleUpdatePrice(e)} className="input-box" disabled={item.bought} />

      <button onClick={() => handleRemoveItem(item.id)} >X</button>
    </li>
  );
}


function AddItemForm({onAddToList}) {

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {

    e.preventDefault();

    const newItem = {
      id: crypto.randomUUID(),
      name, quantity,
      bought: false,
      price: 0,
    }    
    onAddToList(newItem);
  }

  return <form className="add-item-form" onSubmit={e => handleSubmit(e)} >

    <div>
      <label>Item Name: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </ div>

    <div>
      <label>Quantity: </label>
      <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
    </ div>

    <Button>Add</Button>
  </ form>
}

function Footer({items}) {

  const totalItems = items.length;
  const packedItems = items.slice().filter(item => item.bought).length;
  let currentPrice = 0;
  items.map(item => item.bought ? currentPrice += (item.price * item.quantity) : currentPrice );

  return <footer className="footer">
    You have bought {packedItems} out of {totalItems} items in your list and the current expenses are {currentPrice}.
  </ footer>
}

function Button({children, onClick}) {

  return <button onClick={onClick} >{children}</button>
}