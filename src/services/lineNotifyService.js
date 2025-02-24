/**
 * Send notification to LINE Notify API
 * @param {string} token - LINE Notify token
 * @param {string} message - Message to send
 * @returns {Promise} - Response from LINE Notify
 */
export const sendNotification = async (token, message) => {
    try {
      const response = await fetch('https://notify-api.line.me/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        },
        body: new URLSearchParams({
          message: message
        })
      });
      
      const result = await response.json();
      console.log('LINE Notification sent:', result);
      return result;
    } catch (error) {
      console.error('Error sending LINE notification:', error);
      return { error: true, message: error.message };
    }
  };