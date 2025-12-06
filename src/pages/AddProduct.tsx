import React from 'react';
import ProductForm from '../components/ProductForm';
import { useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

const AddProduct: React.FC = () => {
  const { state, dispatch } = useProductContext();
  const navigate = useNavigate();

  // Tính id tiếp theo dựa trên sản phẩm hiện có
  const nextId = state.products.length
    ? Math.max(...state.products.map((p) => p.id)) + 1
    : 1;

  const handleSubmit = (p: Omit<Product, 'id'> & { id?: number }) => {
    const prod: Product = { ...p, id: nextId };
    dispatch({ type: 'ADD', payload: prod });
    navigate('/');
  };

  return (
    <div className="card">
      <h2>Thêm sản phẩm</h2>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddProduct;
