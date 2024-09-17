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
  const [category, setcategory] = useState();
  const [details, setdetails] = useState();
  const [gender, setgender] = useState();
  const [like, setlike] = useState();

  const [Items, setItems] = useState([]); // Store users as an array
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);

  // CREATE Operation: Function to add a user
  const addItem = async () => {
    try {
      if (
        name === "" &&
        url === "" &&
        price == "" &&
        category === "shoe" &&
        gender === "male" &&
        details === ""
      ) {
        //add more items details
        setError(error);
      } else {
        //add data to firebase collection "user", if not found it creates one with collection name "user"
        const docRef = await addDoc(collection(db, "items"), {
          name: name,
          url: url,
          price: price,
          category: category,
          gender: gender,
          details: details,
        });
        //   console.log("Document written with ID: ", docRef.id);
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
          }, //add details as needed
        ]);
        setName(""); // Clear the input field after adding
        seturl("")
        setprice("")
        setcategory("shoe")
        setgender("female")
        setdetails("")
      }
    } catch (e) {
      setError("Error adding document: " + e.message);
    }
  };

  // READ Operation: Fetching users from Firestore
  useEffect(() => {
    const getItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));       //you also can edit the collection by updating the items in state. and giving the name of collection as we need.
        const itemArray = []; // Collect users in an array
        querySnapshot.forEach((doc) => {
          itemArray.push({ id: doc.id, ...doc.data() }); // Collect user data
        });
        setItems(itemArray); // Set the users array in state
        setLoad(false); // Mark as loaded
      } catch (e) {
        setError("Error fetching documents: " + e.message);
        setLoad(false);
      }
    };
    getItems();
  }, []);

  // DELETE Operation: Function to delete a user
  const deleteData = async (id) => {
    const itemDocRef = doc(db, "items", id);
    try {
      await deleteDoc(itemDocRef);
      // Remove user from local state
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (e) {
      setError("Error deleting document: " + e.message);
    }
  };

  return (
    <div>
      {/* Input for creating a new user */}
      Name: <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name" className="border-2 border-black"
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     addData();
        //   }
        // }}       //if only one input was there we would have done this one
      />
      <br/>
      Url: <input type="text" value={url} onChange={(e)=>seturl(e.target.value)} placeholder="Image Url" className="border-2 border-black"/><br/>
      Price: <input type="number" value={price} onChange={(e)=>setprice(e.target.value)} placeholder="Price" className="border-2 border-black"/><br/>
      Gender: <select value={gender} onChange={(e)=>setgender(e.target.value)} className="border-2 border-black">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Xakka</option>
      </select>
      <br/>
      Categories: <select value={category} onChange={(e)=>setcategory(e.target.value)} className="border-2 border-black">
        <option value="shoe">Shoes</option>
        <option value="Clothes">Clothes</option>
      </select><br/>
      Details: <br/> <textarea value={details} onChange={(e)=>setdetails(e.target.value)} placeholder="Details" className="border-2 border-black"></textarea><br/>
      

      <button onClick={addItem} className="border-2 border-black">Add Item</button>

      <br/>
      <br/>
      <br/>
      <br/>
      {/* Display Area */}
      
      <h1 className="font-bold text-xl">DataBase storage:</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}{/* Display errors */}
      {load && <div>Loading...</div>} {/* Display loading state */}
    <table className="border-collapse border border-black">
        <thead>
            <tr>
            <th className="border border-black">Image</th>
            <th className="border border-black">Name</th>
            <th className="border border-black">Category</th>
            <th className="border border-black">Delete</th>
            </tr>
        </thead>
        <tbody>
            {Items.map((item) => (
            <tr key={item.id}>
                <td className="border border-black">
                <img src={item.url} alt="img" className="h-16" />
                </td>
                <td className="border border-black">{item.name}</td>
                <td className="border border-black">{item.category}</td>
                <td className="border border-black">
                <button onClick={() => deleteData(item.id)} className="border-2 border-black m-3 h-8">
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
