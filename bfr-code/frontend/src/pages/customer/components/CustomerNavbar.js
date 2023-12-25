
import React from 'react';
import logo from '../../../../logo.svg';

function CustomerNavbar() {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <h1 className="text-xl font-bold ml-4">Customer Navbar</h1>
        </div>

      </div>
    </header>
  );
}

export default CustomerNavbar;