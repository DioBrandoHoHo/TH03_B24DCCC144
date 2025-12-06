import React from 'react';
import { Product } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useProductContext();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xoá sản phẩm này?')) {
      dispatch({ type: 'DELETE', payload: product.id });
    }
  };

  return (
    <div className="card">
      <h3>{product.ten}</h3>
      <div className="small">
        {product.danhMuc} • {product.soLuong} cái
      </div>
      <p className="small">{product.moTa}</p>

      <div className="actions">
        <div className="price">{product.gia.toLocaleString()}₫</div>
        <div className="buttons">
          <button className="btn" onClick={() => navigate(`/products/${product.id}`)}>
            Xem
          </button>
          <Link className="btn" to={`/edit/${product.id}`}>
            Sửa
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
