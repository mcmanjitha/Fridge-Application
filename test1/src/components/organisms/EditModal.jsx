import React from 'react';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';
import Label from '../atoms/Label';

const EditModal = ({ itemName, expiryDate, setItemName, setExpiryDate, setIsEditing, handleUpdateItem }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Edit Item</h2>
        <Label>
          🍉 Item Name
          <InputField type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </Label>
        <Label className="mt-4">
          ⏰ Expiry Date
          <InputField type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </Label>
        <div className="flex justify-end mt-6">
          <Button onClick={() => setIsEditing(false)} className="mr-4 bg-gray-300 px-4 py-2">
            Cancel
          </Button>
          <Button onClick={handleUpdateItem} className="bg-sky-800 w-full text-white px-4 py-2">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
