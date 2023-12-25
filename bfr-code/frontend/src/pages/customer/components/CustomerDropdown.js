import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function CustomerDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Actions
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Sign Out</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomerDropdown;