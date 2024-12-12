import React from 'react';
import OrderHistory from '../components/OrderHistory';

function UserInfo() {
  return (
    <div>
      <h2>User Information</h2>
      <p>Username: John Doe</p>
      <p>Email: johndoe@example.com</p>
      <OrderHistory />
    </div>
  );
}

export default UserInfo;