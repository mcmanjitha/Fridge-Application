import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import Label from '../atoms/Label';
import Button from '../atoms/Button';

const FridgeItem = ({ item, getNotificationBackgroundColor, getExpiryStatus, handleEditClick, deleteItem }) => {
  
  const [deleteing, setDeleting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [currentId, setCurrentId] = useState();

  const handleDeleteClick = (itemId) => {
    setDeleting(true);
    setCurrentId(itemId);
    if (isConfirmed) {
      deleteItem(itemId); // Proceed with the deletion if confirmed
    }
  };

  const makeDelete = () => {
    deleteItem(currentId);
    setDeleting(false);
  }
  
  return (
    <div>
      <li className="bg-white mt-2 py-2 shadow-sm flex w-full">
        <div className="w-3/12 ml-6 text-left font-bold text-slate-800 justify-center">{item.name}</div>
        <div className="w-5/12 text-left text-sm justify-center">Expiry Date -  {item.expiryDate}</div>
        <div className={`w-2/12 rounded-2xl font-semibold mx-2 text-center p-1 ${getNotificationBackgroundColor(item.expiryDate)}`}>
          {getExpiryStatus(item.expiryDate)}
        </div>
        <div className="w-1/12 text-right text-slate-600 cursor-pointer hover:text-slate-950" onClick={() => handleEditClick(item)}>
          <FontAwesomeIcon icon={faPencil} />
        </div>
        <div className="w-1/12 mr-6 ml-4 text-right hover:text-orange-600 cursor-pointer" onClick={() => handleDeleteClick(item.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </li>
      {deleteing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-lg font-bold mb-4">Delete Item</h2>
          <Label>
            🍉 Are you sure you want to delete this item?
          </Label>
          <div className="flex justify-between mt-6">
            <Button onClick={() => setDeleting(false)} className="mr-4 bg-gray-300 px-4 py-2 flex-1">
              No
            </Button>
            <Button onClick={() => makeDelete()} className="bg-sky-800 w-full text-white px-4 py-2 flex-1">
              Yes
            </Button>
          </div>
        </div>
      </div>
      )}
    </div>
    
  );
};

export default FridgeItem;
