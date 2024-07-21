// src/components/Detail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ListOfOrchids from '../ListOfOrchids'; // Chỉnh sửa đường dẫn import

const Detail = () => {
  const { id } = useParams();
  const orchid = ListOfOrchids.find(o => o.id === id);

  if (!orchid) {
    return <h2>Orchid not found</h2>;
  }

  return (
    <div>
      <img src={orchid.image} alt={orchid.name} />
      <h3>{orchid.name}</h3>
      <p>Origin: {orchid.origin}</p>
      <p>Color: {orchid.color}</p>
      <p>Category: {orchid.category}</p>
      <p>Rating: {orchid.rating}</p>
      {orchid.isSpecial && <p>This is a special orchid!</p>}
    </div>
  );
};

export default Detail;
