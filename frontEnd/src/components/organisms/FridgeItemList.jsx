import React from 'react';
import FridgeItem from '../molecules/FridgeItem';

const FridgeItemList = ({ fridgeItems, getNotificationBackgroundColor, getExpiryStatus, handleEditClick, deleteItem, loading }) => {
  return (
    <div className='w-2/3'>
      {loading ? (
          <div className="text-gray-500 animate-pulse">Loading fridge items...</div>
        ) : (
          <ul className="list-none  mt-4">
            {fridgeItems.length > 0 ? (
              fridgeItems.map((item) => (
                <FridgeItem
                  key={item.id}
                  item={item}
                  getNotificationBackgroundColor={getNotificationBackgroundColor}
                  getExpiryStatus={getExpiryStatus}
                  handleEditClick={handleEditClick}
                  deleteItem={deleteItem}
                />
              ))
            ) : (
              <div className="text-gray-500">No items in fridge</div>
            )}
          </ul>
        )}
    </div>
    
  );
};

export default FridgeItemList;
