import React from 'react';
import ProductForm from '../components/ProductForm';
import { useProductContext } from '../context/ProductContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const { state, dispatch } = useProductContext();
  const navigate = useNavigate();

  const pid = Number(id);
  const product = state.products.find((p) => p.id === pid);

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  const handleSubmit = (p: Omit<Product, 'id'> & { id?: number }) => {
    dispatch({ type: 'UPDATE', payload: { ...p, id: pid } });
    navigate(`/products/${pid}`);
  };

  return (
    <div className="card">
      <h2>Chỉnh sửa sản phẩm</h2>
      <ProductForm initial={product} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditProduct;
