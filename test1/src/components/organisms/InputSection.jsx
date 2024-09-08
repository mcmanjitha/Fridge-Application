import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../Redux/fridgeItemsSlice';
import HeroSection from './HeroSection';
import FridgeItemList from './FridgeItemList';

import ItemForm from '../molecules/ItemForm';
import EditModal from './EditModal';

const InputSection = () => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [fridgeItems, setFridgeItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAddToFridge = async () => {
    if (itemName && expiryDate) {
      const newItem = {
        name: itemName,
        expiryDate: expiryDate,
      };
  
      try {
        // Send the new item to the server as a POST request
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem), // Convert the new item to JSON
        });
  
        if (!response.ok) {
          throw new Error('Failed to add item to the fridge');
        }
        const savedItem = await response.json(); // Get the saved item from the server
        dispatch(addItem(savedItem));
  
        // Update the local state after successfully adding the item to the server
        setFridgeItems([...fridgeItems, savedItem]);
  
        // Optionally, if you're using Redux to manage state, dispatch the action
        dispatch(addItem(savedItem));
  
        // Reset the form
        setItemName('');
        setExpiryDate('');
      } catch (error) {
        console.error('Error adding item:', error);
        // Handle any errors that occurred during the POST request
      }
    }
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);  // Set the current item to be edited
    setItemName(item.name); // Pre-fill the item name and expiry date
    setExpiryDate(item.expiryDate);
    setIsEditing(true); // Open the modal
  };

  const handleUpdateItem = async () => {
    const updatedItem = {
      id: currentItem.id,
      name: itemName,
      expiryDate: expiryDate,
    };
    try {
      // Send a PUT request to update the item in the backend
      const response = await fetch(`${apiUrl}/${currentItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error('Failed to update the item');
      }
      // Update local state with the new item details
      const updatedItems = fridgeItems.map((item) =>
        item.id === currentItem.id ? updatedItem : item
      );
      setFridgeItems(updatedItems); // Update the items with the new values

      setIsEditing(false); // Close the modal
      setCurrentItem(null); // Clear the current item
    } catch (error) {
      console.error('Error updating item:', error);
      // Handle any errors that occurred during the PUT request
    }
  };

  const deleteItem = async (id) => {
    console.log("id = "+id);
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      dispatch(removeItem(id));
      // Update the state by filtering out the deleted item
      setFridgeItems(fridgeItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const getExpiryStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry - today;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 0) {
      return 'Expired'; // Expiry is soon, show red color
    } else if (daysRemaining <=30) {
      return 'Expire Soon'; // Expiry in less than a week, show yellow color
    } else {
      return 'Healthy'; // Expiry is more than a week away, show green color
    }
  };

  const getNotificationBackgroundColor = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry - today;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 0) {
      return 'bg-red-200 text-red-900'; // Expiry is soon, show red color
    } else if (daysRemaining <= 30) {
      return 'bg-yellow-200 text-yellow-900'; // Expiry in less than a week, show yellow color
    } else {
      return 'bg-green-200 text-green-900'; // Expiry is more than a week away, show green color
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        
        setFridgeItems(data);  // Store the data in state
        dispatch(setFridgeItems(data));
        setLoading(false);  // Turn off loading state
      } catch (error) {
        setError(error.message);
        setLoading(false);  // Turn off loading state in case of error
      }
      finally {
        setLoading(false);  // Ensure loading is always set to false, even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <div className='items-center bg-blue-50 w-screen h-screen flex flex-col'>
      <div className='w-full h-1/3 fixed bg-white'></div>
      <div className='relative z-20 w-full h-full flex flex-col items-center'>
        <HeroSection />
        <ItemForm
          itemName={itemName}
          expiryDate={expiryDate}
          setItemName={setItemName}
          setExpiryDate={setExpiryDate}
          handleAddToFridge={handleAddToFridge}
        />
        <div className='text-right w-2/3 pt-6 pr-2 font-semibold'> Total Items - {fridgeItems.length}</div>
        <FridgeItemList
          fridgeItems={fridgeItems}
          getNotificationBackgroundColor={getNotificationBackgroundColor}
          getExpiryStatus={getExpiryStatus}
          handleEditClick={handleEditClick}
          deleteItem={deleteItem}
          loading={loading}
        />
        {isEditing && (
          <EditModal
            itemName={itemName}
            expiryDate={expiryDate}
            setItemName={setItemName}
            setExpiryDate={setExpiryDate}
            setIsEditing={setIsEditing}
            handleUpdateItem={handleUpdateItem}
            
          />
        )}
      </div>
    </div>
  );
};

export default InputSection;
