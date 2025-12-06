import React from 'react';
import { Category } from '../types';

interface SearchFilterProps {
  q: string;
  setQ: (s: string) => void;
  cat: string;
  setCat: (c: string) => void;
  min: string;
  setMin: (s: string) => void;
  max: string;
  setMax: (s: string) => void;
}

const categories: (Category | 'Tất cả')[] = [
  'Tất cả',
  'Điện tử',
  'Quần áo',
  'Đồ ăn',
  'Sách',
  'Khác',
];

const SearchFilter: React.FC<SearchFilterProps> = ({ q, setQ, cat, setCat, min, setMin, max, setMax }) => {
  return (
    <div className="search-filter">
      <div className="form-row">
        <input
          className="input"
          placeholder="Tìm theo tên..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="form-row">
        <select className="input" value={cat} onChange={(e) => setCat(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <input
          className="input"
          type="number"
          placeholder="Min giá"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Max giá"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
