'use client';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FiltersProps {
  search: string;
  state: string;
  feesMax: string;
  course: string;
  type: string;
  states: string[];
  courses: string[];
  types: string[];
  onSearch: (v: string) => void;
  onState: (v: string) => void;
  onFeesMax: (v: string) => void;
  onCourse: (v: string) => void;
  onType: (v: string) => void;
  onReset: () => void;
}

const FEE_OPTIONS = [
  { label: 'Any', value: '' },
  { label: 'Under ₹1L/yr', value: '100000' },
  { label: 'Under ₹2L/yr', value: '200000' },
  { label: 'Under ₹5L/yr', value: '500000' },
  { label: 'Under ₹10L/yr', value: '1000000' },
  { label: 'Under ₹25L/yr', value: '2500000' },
];

export default function CollegeFilters(props: FiltersProps) {
  const hasFilters = props.state || props.feesMax || props.course || props.type;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search */}
      <div style={{ position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
        <input
          id="college-search"
          type="text"
          placeholder="Search colleges..."
          value={props.search}
          onChange={e => props.onSearch(e.target.value)}
          className="input-field"
          style={{ paddingLeft: 38 }}
        />
      </div>

      {/* Filter header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9ca3af', fontSize: 13, fontWeight: 600 }}>
          <SlidersHorizontal size={14} /> Filters
        </div>
        {hasFilters && (
          <button onClick={props.onReset} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 12 }}>
            <X size={12} /> Reset
          </button>
        )}
      </div>

      {/* State */}
      <div>
        <label style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6, display: 'block' }}>State</label>
        <select id="filter-state" value={props.state} onChange={e => props.onState(e.target.value)} className="input-field">
          <option value="">All States</option>
          {props.states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* College Type */}
      <div>
        <label style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6, display: 'block' }}>Type</label>
        <select id="filter-type" value={props.type} onChange={e => props.onType(e.target.value)} className="input-field">
          <option value="">All Types</option>
          {props.types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Fees */}
      <div>
        <label style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6, display: 'block' }}>Max Fees (per year)</label>
        <select id="filter-fees" value={props.feesMax} onChange={e => props.onFeesMax(e.target.value)} className="input-field">
          {FEE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Course */}
      <div>
        <label style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, marginBottom: 6, display: 'block' }}>Course</label>
        <select id="filter-course" value={props.course} onChange={e => props.onCourse(e.target.value)} className="input-field">
          <option value="">All Courses</option>
          {props.courses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </div>
  );
}
