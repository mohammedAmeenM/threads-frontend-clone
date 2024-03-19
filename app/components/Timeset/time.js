const getElapsedTime = (createdOn) => {
    const now = Date.now();
    const postDate = new Date(createdOn);
    const diffMs = now - postDate.getTime();
  
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
    let elapsedTime = '';
  
    if (days > 0) {
      elapsedTime = `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      elapsedTime = `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      elapsedTime = `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      elapsedTime = `${seconds} second${seconds > 1 ? 's' : ''}`;
    }
    return elapsedTime === '' ? 'Just now' : `${elapsedTime} ago`;
  };
  
  module.exports = getElapsedTime;