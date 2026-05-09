'use client';
import { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getColleges, getCollegeFilters, type College, type PaginationMeta } from '@/lib/api';
import CollegeCard from '@/components/CollegeCard';
import CollegeFilters from '@/components/CollegeFilters';

function CollegesPageContent() {
  const router = useRouter();
  const params = useSearchParams();

  const [colleges, setColleges] = useState<College[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<{ states: string[]; types: string[]; courses: string[] }>({ states: [], types: [], courses: [] });

  const [search, setSearch] = useState(params.get('search') || '');
  const [state, setState] = useState(params.get('state') || '');
  const [feesMax, setFeesMax] = useState(params.get('fees_max') || '');
  const [course, setCourse] = useState(params.get('course') || '');
  const [type, setType] = useState(params.get('type') || '');
  const [page, setPage] = useState(Number(params.get('page') || 1));

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    getCollegeFilters().then(setFilterOptions).catch(console.error);
  }, []);

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getColleges({ search: debouncedSearch, state, fees_max: feesMax, course, type, page, limit: 12 });
      setColleges(res.colleges);
      setPagination(res.pagination);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [debouncedSearch, state, feesMax, course, type, page]);

  useEffect(() => { fetchColleges(); }, [fetchColleges]);

  const resetFilters = () => { setState(''); setFeesMax(''); setCourse(''); setType(''); setSearch(''); setPage(1); };

  return (
    <div style={{ padding: '32px 24px 120px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Explore Colleges</h1>
        <p style={{ color: '#9ca3af', fontSize: 15 }}>
          {pagination ? `${pagination.total} colleges found` : 'Loading...'}
        </p>
      </div>

      <div className="colleges-layout">
        {/* Sidebar */}
        <aside className="card colleges-sidebar" style={{ padding: 20, position: 'sticky', top: 80 }}>
          <CollegeFilters
            search={search} state={state} feesMax={feesMax} course={course} type={type}
            states={filterOptions.states} courses={filterOptions.courses} types={filterOptions.types}
            onSearch={v => { setSearch(v); setPage(1); }}
            onState={v => { setState(v); setPage(1); }}
            onFeesMax={v => { setFeesMax(v); setPage(1); }}
            onCourse={v => { setCourse(v); setPage(1); }}
            onType={v => { setType(v); setPage(1); }}
            onReset={resetFilters}
          />
        </aside>

        {/* Grid */}
        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
              <Loader2 size={32} color="#6366f1" style={{ animation: 'spin 1s linear infinite' }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : colleges.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No colleges found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="colleges-grid">
                {colleges.map(college => <CollegeCard key={college.id} college={college} />)}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <button onClick={() => setPage(p => p - 1)} disabled={!pagination.hasPrev} className="btn-outline" style={{ padding: '8px 14px' }}>
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)} style={{
                      width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer',
                      background: page === p ? '#6366f1' : 'rgba(255,255,255,0.05)',
                      color: page === p ? 'white' : '#9ca3af', fontWeight: 600, fontSize: 14,
                    }}>{p}</button>
                  ))}
                  <button onClick={() => setPage(p => p + 1)} disabled={!pagination.hasNext} className="btn-outline" style={{ padding: '8px 14px' }}>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CollegesPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Loader2 size={36} color="#6366f1" style={{ animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <CollegesPageContent />
    </Suspense>
  );
}
