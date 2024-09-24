import React, { useEffect, useState } from "react"; 
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

const Additem = () => {
  const [name, setName] = useState(""); // Input for the name
  const [url, seturl] = useState();
  const [price, setprice] = useState();
  const [category, setcategory] = useState("shoe");
  const [details, setdetails] = useState();
  const [gender, setgender] = useState("male");
  const [like, setlike] = useState();

  const [Items, setItems] = useState([]); // Store items as an array
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);

  // State for sorting category
  const [sortCategory, setSortCategory] = useState("all");

  // CREATE Operation: Function to add an item
  const addItem = async () => {
    try {
      if (
        name === "" ||
        url === "" ||
        price === "" ||
        category === "" ||
        gender === "" ||
        details === ""
      ) {
        setError("Please fill in all fields.");
      } else {
        const docRef = await addDoc(collection(db, "items"), {
          name: name,
          url: url,
          price: price,
          category: category,
          gender: gender,
          details: details,
        });
        setItems((prevItems) => [
          ...prevItems,
          {
            id: docRef.id,
            name: name,
            url: url,
            price: price,
            category: category,
            gender: gender,
            details: details,
          },
        ]);
        setName("");
        seturl("");
        setprice("");
        setcategory("shoe");
        setgender("male");
        setdetails("");
      }
    } catch (e) {
      setError("Error adding document: " + e.message);
    }
  };

  // READ Operation: Fetching items from Firestore
  useEffect(() => {
    const getItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const itemArray = [];
        querySnapshot.forEach((doc) => {
          itemArray.push({ id: doc.id, ...doc.data() });
        });
        setItems(itemArray);
        setLoad(false);
      } catch (e) {
        setError("Error fetching documents: " + e.message);
        setLoad(false);
      }
    };
    getItems();
  }, []);

  // DELETE Operation: Function to delete an item
  const deleteData = async (id) => {
    const itemDocRef = doc(db, "items", id);
    try {
      await deleteDoc(itemDocRef);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (e) {
      setError("Error deleting document: " + e.message);
    }
  };

  // Filter the items based on the selected sorting category
  const filteredItems = sortCategory === "all" 
    ? Items 
    : Items.filter((item) => item.category === sortCategory);

  return (
    <div className="bg-gray-100 p-4 w-full flex flex-col items-center justify-center">
      {/* Input for creating a new item */}
      <div className=" w-[75%] flex flex-col justify-center items-center p-4 mb-4">
        <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
        <div className="mb-2">
          Name: <br/>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="border-[1px] border-gray-500 p-1 rounded-sm"
          />
        </div>
        <div className="mb-2">
          Url:  <br/>
          <input 
            type="text" 
            value={url} 
            onChange={(e) => seturl(e.target.value)} 
            placeholder="Image Url" 
            className="border-[1px] border-gray-500 p-1 rounded-sm"
          />
        </div>
        <div className="mb-2">
          Price:  <br/>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setprice(e.target.value)} 
            placeholder="Price" 
            className="border-[1px] border-gray-500 p-1 rounded-sm"
          />
        </div>
        <div className="mb-2">
          Gender: &nbsp;&nbsp;
          <select 
            value={gender} 
            onChange={(e) => setgender(e.target.value)} 
            className="border-[1px] border-gray-500 p-1 rounded-sm"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Xakka</option>
          </select>
        </div>
        <div className="mb-2">
          Categories: &nbsp;&nbsp;
          <select 
            value={category} 
            onChange={(e) => setcategory(e.target.value)} 
            className="border-[1px] border-gray-500 p-1 rounded-sm"
          >
            <option value="shoe">Shoes</option>
            <option value="Clothes">Clothes</option>
          </select>
        </div>
        <div className="mb-2">
          Details: <br/>
          <textarea 
            value={details} 
            onChange={(e) => setdetails(e.target.value)} 
            placeholder="Details" 
            className="border-[1px] border-gray-500 p-1 rounded-sm w-full"
          />
        </div>
        <button 
          onClick={addItem} 
          className="rounded-lg border-[1px] border-gray-500 p-2 bg-green-500 text-white"
        >
          Add Item
        </button>
      </div>


      {/* Display Area */}
      <h1 className="font-bold text-xl mb-4">Database storage:</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {load && <div>Loading...</div>}
      
          {/* Sorting dropdown */}
          <div className="mb-4">
            <label className="mr-2">Sort by Category: </label>
            <select 
              value={sortCategory} 
              onChange={(e) => setSortCategory(e.target.value)} 
              className="border-[1px] border-gray-500 p-1 rounded-sm"
            >
              <option value="all">All</option>
              <option value="shoe">Shoes</option>
              <option value="Clothes">Clothes</option>
            </select>
          </div>
 
      <table className="border-collapse border border-black w-full">
        <thead>
          <tr>
            <th className="border border-black">Image</th>
            <th className="border border-black">Name</th>
            <th className="border border-black">Category</th>
            <th className="border border-black">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td className="border border-black">
                <img src={item.url} alt="img" className="h-16" />
              </td>
              <td className="border border-black">{item.name}</td>
              <td className="border border-black">{item.category}</td>
              <td className="border border-black">
                <button 
                  onClick={() => deleteData(item.id)} 
                  className="border-[1px] bg-red-400 border-gray-500 p-1 rounded-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Additem;
