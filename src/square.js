import React from 'react'

export default function Square({ value, onClick }) {

    return (
      <button className="cell" onClick={onClick}>
        {value}
      </button>
    );
  }