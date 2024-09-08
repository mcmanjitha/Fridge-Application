

export  const getExpiryStatus = (expiryDate) => {
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

export  const getNotificationBackgroundColor = (expiryDate) => {
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
  