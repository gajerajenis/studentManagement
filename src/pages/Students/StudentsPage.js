import React, { useState, useMemo } from 'react';
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye, FiX,
  FiUser, FiMail, FiPhone, FiBook, FiAward, FiGrid,
  FiList, FiCheckCircle, FiAlertCircle, FiInfo,
  FiChevronLeft, FiChevronRight, FiUsers, FiTrendingUp,
  FiBarChart2, FiCalendar
} from 'react-icons/fi';
import './Students.scss';

// ─── Helpers ────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  'linear-gradient(135deg,#00d4aa,#00a884)',
  'linear-gradient(135deg,#7c3aed,#a855f7)',
  'linear-gradient(135deg,#ff6b35,#ff8c5a)',
  'linear-gradient(135deg,#3b82f6,#60a5fa)',
  'linear-gradient(135deg,#ec4899,#f472b6)',
  'linear-gradient(135deg,#f59e0b,#fbbf24)',
];

const CARD_ACCENTS = ['#00d4aa', '#7c3aed', '#ff6b35', '#3b82f6', '#ec4899', '#f59e0b'];

const getInitials = (name) =>
  name ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'ST';

const getColorIndex = (id) => (id % AVATAR_COLORS.length);

// ─── Seed Data ───────────────────────────────────────────────────────────────
const SEED_STUDENTS = [
  { id: 1, name: 'Aarav Shah', email: 'aarav@edu.in', phone: '9876543210', course: 'Computer Science', grade: 'A+', gpa: 9.4, year: '3rd Year', status: 'active', joined: '2022-07-15' },
  { id: 2, name: 'Priya Patel', email: 'priya@edu.in', phone: '9876543211', course: 'Data Science', grade: 'A', gpa: 8.9, year: '2nd Year', status: 'active', joined: '2023-07-10' },
  { id: 3, name: 'Rohan Mehta', email: 'rohan@edu.in', phone: '9876543212', course: 'AI & ML', grade: 'B+', gpa: 7.8, year: '1st Year', status: 'pending', joined: '2024-07-20' },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@edu.in', phone: '9876543213', course: 'Cybersecurity', grade: 'A+', gpa: 9.7, year: '4th Year', status: 'active', joined: '2021-07-05' },
  { id: 5, name: 'Karan Singh', email: 'karan@edu.in', phone: '9876543214', course: 'Cloud Computing', grade: 'B', gpa: 7.2, year: '2nd Year', status: 'inactive', joined: '2023-07-18' },
  { id: 6, name: 'Nisha Verma', email: 'nisha@edu.in', phone: '9876543215', course: 'Web Development', grade: 'A', gpa: 8.6, year: '3rd Year', status: 'active', joined: '2022-07-22' },
  { id: 7, name: 'Dev Joshi', email: 'dev@edu.in', phone: '9876543216', course: 'Computer Science', grade: 'A+', gpa: 9.1, year: '1st Year', status: 'active', joined: '2024-07-12' },
  { id: 8, name: 'Pooja Sharma', email: 'pooja@edu.in', phone: '9876543217', course: 'Data Science', grade: 'B+', gpa: 8.0, year: '3rd Year', status: 'active', joined: '2022-07-08' },
  { id: 9, name: 'Amit Kumar', email: 'amit@edu.in', phone: '9876543218', course: 'AI & ML', grade: 'C+', gpa: 6.8, year: '2nd Year', status: 'inactive', joined: '2023-07-25' },
];

const COURSES = ['Computer Science', 'Data Science', 'AI & ML', 'Cybersecurity', 'Cloud Computing', 'Web Development', 'Mobile Dev', 'DevOps'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const GRADES = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D'];

// ─── Toast ───────────────────────────────────────────────────────────────────
const ToastContainer = ({ toasts }) => (
  <div className="toast-container">
    {toasts.map(t => (
      <div key={t.id} className={`toast toast--${t.type}`}>
        <span className="toast__icon">
          {t.type === 'success' ? <FiCheckCircle /> : t.type === 'error' ? <FiAlertCircle /> : <FiInfo />}
        </span>
        <span>{t.message}</span>
      </div>
    ))}
  </div>
);

// ─── Modal Wrapper ───────────────────────────────────────────────────────────
const Modal = ({ children, onClose }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal">{children}</div>
  </div>
);

// ─── Add / Edit Form ─────────────────────────────────────────────────────────
const StudentForm = ({ student, onSave, onClose }) => {
  const isEdit = !!student?.id;
  const [form, setForm] = useState({
    name: student?.name || '',
    email: student?.email || '',
    phone: student?.phone || '',
    course: student?.course || '',
    year: student?.year || '',
    grade: student?.grade || '',
    gpa: student?.gpa || '',
    status: student?.status || 'active',
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.course) e.course = 'Course is required';
    if (!form.year) e.year = 'Year is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      ...student,
      ...form,
      gpa: parseFloat(form.gpa) || 0,
    });
  };

  const FG = ({ k, label, children }) => (
    <div className={`form-group${errors[k] ? ' form-group--error' : ''}`}>
      <label>{label}</label>
      {children}
      {errors[k] && <span className="form-group__error">{errors[k]}</span>}
    </div>
  );

  return (
    <>
      <div className="modal__header">
        <div>
          <h2>{isEdit ? 'Edit Student' : 'Add New Student'}</h2>
          <p>{isEdit ? `Editing — ${student.name}` : 'Fill in the details below'}</p>
        </div>
        <button className="modal__close" onClick={onClose}><FiX /></button>
      </div>

      <div className="modal__body">
        <div className="form-row">
          <FG k="name" label="Full Name">
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Aarav Shah" />
          </FG>
          <FG k="email" label="Email">
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="student@edu.in" />
          </FG>
        </div>

        <div className="form-row">
          <FG k="phone" label="Phone">
            <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="9876543210" />
          </FG>
          <FG k="course" label="Course">
            <select value={form.course} onChange={e => set('course', e.target.value)}>
              <option value="">Select course</option>
              {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </FG>
        </div>

        <div className="form-row">
          <FG k="year" label="Year">
            <select value={form.year} onChange={e => set('year', e.target.value)}>
              <option value="">Select year</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </FG>
          <FG k="grade" label="Grade">
            <select value={form.grade} onChange={e => set('grade', e.target.value)}>
              <option value="">Select grade</option>
              {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </FG>
        </div>

        <div className="form-row">
          <FG k="gpa" label="GPA (0–10)">
            <input type="number" min="0" max="10" step="0.1" value={form.gpa} onChange={e => set('gpa', e.target.value)} placeholder="8.5" />
          </FG>
          <FG k="status" label="Status">
            <select value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </FG>
        </div>

        <div className="form-actions">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={handleSave}>
            <FiCheckCircle /> {isEdit ? 'Save Changes' : 'Add Student'}
          </button>
        </div>
      </div>
    </>
  );
};

// ─── View Modal ──────────────────────────────────────────────────────────────
const StudentViewModal = ({ student, onClose, onEdit }) => {
  const ci = getColorIndex(student.id);
  return (
    <>
      <div className="modal__header" style={{ padding: '24px 28px 0' }}>
        <h2>Student Profile</h2>
        <button className="modal__close" onClick={onClose}><FiX /></button>
      </div>
      <div className="student-view__hero">
        <div
          className="student-view__avatar"
          style={{ background: AVATAR_COLORS[ci] }}
        >
          {getInitials(student.name)}
        </div>
        <div className="student-view__info">
          <h3>{student.name}</h3>
          <p>ID: STU-{String(student.id).padStart(4, '0')} · {student.course}</p>
          <span className={`student-card__status student-card__status--${student.status}`} style={{ marginTop: 8, display: 'inline-block' }}>
            {student.status}
          </span>
        </div>
      </div>

      <div className="student-view__grid">
        {[
          { label: 'Email', value: student.email },
          { label: 'Phone', value: student.phone || '—' },
          { label: 'Course', value: student.course },
          { label: 'Year', value: student.year },
          { label: 'Grade', value: student.grade || '—' },
          { label: 'GPA', value: student.gpa ? `${student.gpa} / 10` : '—' },
          { label: 'Joined', value: student.joined || '—' },
          { label: 'Status', value: student.status },
        ].map(f => (
          <div key={f.label} className="student-view__field">
            <label>{f.label}</label>
            <span>{f.value}</span>
          </div>
        ))}
      </div>

      <div className="form-actions" style={{ padding: '0 28px 28px' }}>
        <button className="btn btn--ghost" onClick={onClose}>Close</button>
        <button className="btn btn--primary" onClick={() => { onClose(); onEdit(student); }}>
          <FiEdit2 /> Edit Student
        </button>
      </div>
    </>
  );
};

// ─── Delete Confirm ──────────────────────────────────────────────────────────
const DeleteModal = ({ student, onConfirm, onClose }) => (
  <div className="delete-confirm">
    <div className="delete-confirm__icon"><FiTrash2 /></div>
    <h3>Delete Student?</h3>
    <p>
      Are you sure you want to remove <strong>{student.name}</strong>?
      This action cannot be undone.
    </p>
    <div className="form-actions" style={{ justifyContent: 'center' }}>
      <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
      <button className="btn btn--danger" onClick={onConfirm}>
        <FiTrash2 /> Yes, Delete
      </button>
    </div>
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────
const StudentsPage = () => {
  const [students, setStudents] = useState(SEED_STUDENTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');   // all | active | inactive | pending
  const [viewMode, setViewMode] = useState('grid');  // grid | list
  const [modal, setModal] = useState(null);    // null | 'add' | 'edit' | 'view' | 'delete'
  const [selected, setSelected] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  // ── Toast helper ─────────────────────────────────────────────────────────
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  // ── CRUD ─────────────────────────────────────────────────────────────────
  const handleAdd = (data) => {
    const newId = Math.max(...students.map(s => s.id), 0) + 1;
    setStudents(s => [...s, { ...data, id: newId, joined: new Date().toISOString().slice(0, 10) }]);
    setModal(null);
    addToast(`${data.name} added successfully!`);
  };

  const handleEdit = (data) => {
    setStudents(s => s.map(st => st.id === data.id ? { ...st, ...data } : st));
    setModal(null);
    addToast(`${data.name} updated!`);
  };

  const handleDelete = () => {
    setStudents(s => s.filter(st => st.id !== selected.id));
    setModal(null);
    addToast(`${selected.name} removed.`, 'info');
    setSelected(null);
  };

  const openModal = (type, student = null) => {
    setSelected(student);
    setModal(type);
  };

  // ── Filtered + Paginated ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let s = students;
    if (filter !== 'all') s = s.filter(st => st.status === filter);
    if (search.trim()) s = s.filter(st =>
      st.name.toLowerCase().includes(search.toLowerCase()) ||
      st.email.toLowerCase().includes(search.toLowerCase()) ||
      st.course.toLowerCase().includes(search.toLowerCase())
    );
    return s;
  }, [students, filter, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Stats
  const active = students.filter(s => s.status === 'active').length;
  const inactive = students.filter(s => s.status === 'inactive').length;
  const avgGpa = students.length ? (students.reduce((a, s) => a + (s.gpa || 0), 0) / students.length).toFixed(1) : 0;

  return (
    <div className="students-page">
      <ToastContainer toasts={toasts} />

      <div className="container">
        {/* ── Page Hero ─────────────────────────────────────────────────── */}
        <section className="page-hero">
          <div className="page-hero__inner">
            <div>
              <div className="page-hero__badge"><span />Student Management</div>
              <h1 className="page-hero__title">
                Manage <em>Students</em>
              </h1>
              <p className="page-hero__subtitle">
                Add, edit, view and track all enrolled students in one place.
              </p>
            </div>
            <button className="page-hero__add-btn" onClick={() => openModal('add')}>
              <FiPlus /> Add New Student
            </button>
          </div>
        </section>

        {/* ── Stats Row ─────────────────────────────────────────────────── */}
        <div className="students-stats">
          {[
            { icon: <FiUsers />, iconClass: 'teal', value: students.length, label: 'Total Students', trend: '+12%', trendType: 'up' },
            { icon: <FiCheckCircle />, iconClass: 'purple', value: active, label: 'Active', trend: '+5%', trendType: 'up' },
            { icon: <FiBarChart2 />, iconClass: 'orange', value: avgGpa, label: 'Avg GPA', trend: '+0.3', trendType: 'up' },
            { icon: <FiTrendingUp />, iconClass: 'blue', value: inactive, label: 'Inactive', trend: '-2%', trendType: 'down' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className={`stat-card__icon stat-card__icon--${s.iconClass}`}>{s.icon}</div>
              <div className="stat-card__info">
                <div className="stat-card__value">{s.value}</div>
                <div className="stat-card__label">{s.label}</div>
              </div>
              <span className={`stat-card__trend stat-card__trend--${s.trendType}`}>{s.trend}</span>
            </div>
          ))}
        </div>

        {/* ── Toolbar ───────────────────────────────────────────────────── */}
        <div className="students-toolbar">
          <div className="students-toolbar__search">
            <FiSearch />
            <input
              placeholder="Search by name, email, course…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>

          <div className="students-toolbar__filter">
            {['all', 'active', 'inactive', 'pending'].map(f => (
              <button
                key={f}
                className={`students-toolbar__filter-btn${filter === f ? ' students-toolbar__filter-btn--active' : ''}`}
                onClick={() => { setFilter(f); setPage(1); }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="students-toolbar__view-toggle">
            <button
              className={`students-toolbar__view-btn${viewMode === 'grid' ? ' students-toolbar__view-btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <FiGrid />
            </button>
            <button
              className={`students-toolbar__view-btn${viewMode === 'list' ? ' students-toolbar__view-btn--active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <FiList />
            </button>
          </div>
        </div>

        {/* ── Cards ─────────────────────────────────────────────────────── */}
        <div className={`students-grid${viewMode === 'list' ? ' students-grid--list' : ''}`}>
          {paginated.length === 0 ? (
            <div className="students-empty">
              <div className="students-empty__icon"><FiUsers /></div>
              <h3>No students found</h3>
              <p>Try adjusting your search or filters, or add a new student.</p>
            </div>
          ) : paginated.map((student, idx) => {
            const ci = getColorIndex(student.id);
            const gpaPercent = ((student.gpa || 0) / 10) * 100;
            return (
              <div
                key={student.id}
                className="student-card"
                style={{ '--card-accent': CARD_ACCENTS[ci], animationDelay: `${idx * 0.06}s` }}
              >
                <div className="student-card__header">
                  <div
                    className="student-card__avatar"
                    style={{ background: AVATAR_COLORS[ci] }}
                  >
                    {getInitials(student.name)}
                  </div>
                  <div className="student-card__meta">
                    <div className="student-card__name">{student.name}</div>
                    <div className="student-card__id">
                      STU-{String(student.id).padStart(4, '0')}
                    </div>
                  </div>
                  <span className={`student-card__status student-card__status--${student.status}`}>
                    {student.status}
                  </span>
                </div>

                <div className="student-card__details">
                  <div className="student-card__detail-item">
                    <FiUser /> {student.name}
                  </div>
                  <div className="student-card__detail-item">
                    <FiPhone /> {student.phone || 'N/A'}
                  </div>
                  <div className="student-card__detail-item">
                    <FiBook /> {student.course}
                  </div>
                  <div className="student-card__detail-item">
                    <FiAward /> {student.grade || 'N/A'}
                  </div>
                  <div className="student-card__detail-item">
                    <FiCalendar /> {student.year}
                  </div>
                  <div className="student-card__detail-item">
                    <FiMail /> {student.email}
                  </div>
                </div>

                {viewMode !== 'list' && (
                  <div className="student-card__grade-bar">
                    <div className="student-card__grade-bar-label">
                      <span>GPA Performance</span>
                      <span>{student.gpa || 0} / 10</span>
                    </div>
                    <div className="student-card__grade-bar-track">
                      <div
                        className="student-card__grade-bar-fill"
                        style={{ width: `${gpaPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="student-card__actions">
                  <button
                    className="student-card__action-btn student-card__action-btn--view"
                    onClick={() => openModal('view', student)}
                  >
                    <FiEye /> View
                  </button>
                  <button
                    className="student-card__action-btn student-card__action-btn--edit"
                    onClick={() => openModal('edit', student)}
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button
                    className="student-card__action-btn student-card__action-btn--delete"
                    onClick={() => openModal('delete', student)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Pagination ────────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination__btn pagination__btn--arrow"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <FiChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                className={`pagination__btn${p === page ? ' pagination__btn--active' : ''}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="pagination__btn pagination__btn--arrow"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      {modal === 'add' && (
        <Modal onClose={() => setModal(null)}>
          <StudentForm onSave={handleAdd} onClose={() => setModal(null)} />
        </Modal>
      )}

      {modal === 'edit' && selected && (
        <Modal onClose={() => setModal(null)}>
          <StudentForm student={selected} onSave={handleEdit} onClose={() => setModal(null)} />
        </Modal>
      )}

      {modal === 'view' && selected && (
        <Modal onClose={() => setModal(null)}>
          <StudentViewModal
            student={selected}
            onClose={() => setModal(null)}
            onEdit={(s) => openModal('edit', s)}
          />
        </Modal>
      )}

      {modal === 'delete' && selected && (
        <Modal onClose={() => setModal(null)}>
          <DeleteModal
            student={selected}
            onConfirm={handleDelete}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default StudentsPage;