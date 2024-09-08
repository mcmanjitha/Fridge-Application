import React from 'react';
import Label from '../atoms/Label';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';

const ItemForm = ({ itemName, setItemName, expiryDate, setExpiryDate, handleAddToFridge }) => {
    return (
      <div className=" bg-white shadow-xl rounded-lg mt-8 p-6 w-2/3">
        <div className="flex justify-between items-center ">
          <div className="w-1/3">
            <Label>🍉 Item Name</Label>
            <InputField value={itemName} onChange={(e) => setItemName(e.target.value)} type="text" />
          </div>
          <div className="w-1/3 mx-4">
            <Label>⏰ Expiry Date</Label>
            <InputField value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} type="date" />
          </div>
          <div className="w-1/3">
            <Button onClick={handleAddToFridge} className="mt-8 bg-sky-800 w-full text-white py-2 px-4 rounded-lg hover:bg-sky-900">
              ADD TO FRIDGE
            </Button>
          </div>
        </div>
      </div>
    )
};

export default ItemForm;
