import React, { useMemo, useState, useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 6;

const Home: React.FC = () => {
  const { state } = useProductContext();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Tất cả');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const minN = Number(min) || 0;
    const maxN = max ? Number(max) : Infinity;
    return state.products.filter((p) => {
      if (cat !== 'Tất cả' && p.danhMuc !== cat) return false;
      if (p.gia < minN || p.gia > maxN) return false;
      if (q && !p.ten.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [state.products, q, cat, min, max]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // đảm bảo page luôn nằm trong range
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div>
      <SearchFilter
        q={q}
        setQ={setQ}
        cat={cat}
        setCat={setCat}
        min={min}
        setMin={setMin}
        max={max}
        setMax={setMax}
      />
      <div className="info-line">
        Tổng sản phẩm: {total} — Trang {page} / {totalPages}
      </div>
      <div className="grid" style={{ marginTop: 12 }}>
        {pageItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Home;
