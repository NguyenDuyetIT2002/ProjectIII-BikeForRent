import React from 'react';
import CustomerNavbar from './CustomerNavbar';
import CustomerDropdown from './CustomerDropdown';

function CustomerPageWithDropdown() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', top: '0', right: '0' }}>
        <CustomerNavbar />
        <CustomerDropdown />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <button style={{ padding: '10px', fontSize: '16px' }}>Rent Button</button>
      </div>
    </div>
  );
}