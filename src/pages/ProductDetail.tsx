import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { state, dispatch } = useProductContext();
  const navigate = useNavigate();

  const pid = Number(id);
  const product = state.products.find((x) => x.id === pid);

  if (!product) {
    return (
      <div>
        Không tìm thấy sản phẩm. <Link to="/">Về trang chủ</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xoá sản phẩm này?')) {
      dispatch({ type: 'DELETE', payload: product.id });
      navigate('/');
    }
  };

  return (
    <div className="card">
      <h2>{product.ten}</h2>
      <div className="small">
        {product.danhMuc} • {product.soLuong} cái
      </div>
      <p>{product.moTa}</p>
      <div className="price">{product.gia.toLocaleString()}₫</div>

      <div className="actions">
        <Link className="btn" to={`/edit/${product.id}`}>
          Sửa
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          Xoá
        </button>
        <Link to="/" className="btn">
          Quay lại
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
