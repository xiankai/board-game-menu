import React from 'react';

const Header = ({ message, print = false }) => (
  <h1
    className={print ? 'print' : ''}
    style={{
      fontFamily: ['Indie Flower', 'cursive'],
      fontSize: 65,
      margin: '0 auto',
    }}
  >
    { message }
  </h1>
);

export default Header;
