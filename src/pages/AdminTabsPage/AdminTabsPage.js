import React, { useState } from 'react';
import { FiArrowLeft, FiImage, FiSun, FiCalendar, FiUsers, FiPlus, FiTrash2, FiEye, FiX, FiMapPin, FiClock, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './AdminTabsPage.scss';
import StudentsPage from './StudentsPage/StudentsPage';


// ─── Toast ────────────────────────────────────────────────────────────────────
const ToastContainer = ({ toasts }) => (
  <div className="at-toast-container">
    {toasts.map(t => (
      <div key={t.id} className={`at-toast at-toast--${t.type}`}>
        <span className="at-toast__icon">
          {t.type === 'success' ? <FiCheckCircle /> : t.type === 'error' ? <FiAlertCircle /> : <FiInfo />}
        </span>
        <span>{t.message}</span>
      </div>
    ))}
  </div>
);

// ─── Modal ────────────────────────────────────────────────────────────────────
const Modal = ({ children, onClose }) => (
  <div className="at-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
    <div className="at-modal">{children}</div>
  </div>
);

// ══════════════════════════════════════════════════════════════
//  GALLERY TAB
// ══════════════════════════════════════════════════════════════
const SEED_GALLERY = [
  { id: 1, title: 'Annual Day 2024', category: 'Events', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=280&fit=crop', date: '2024-03-15' },
  { id: 2, title: 'Science Exhibition', category: 'Academic', url: 'https://images.unsplash.com/photo-1532094349884-543559277c5c?w=400&h=280&fit=crop', date: '2024-02-10' },
  { id: 3, title: 'Sports Day', category: 'Sports', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=280&fit=crop', date: '2024-01-20' },
  { id: 4, title: 'Cultural Night', category: 'Events', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=280&fit=crop', date: '2024-04-05' },
  { id: 5, title: 'Graduation Ceremony', category: 'Academic', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=280&fit=crop', date: '2023-12-20' },
  { id: 6, title: 'Tech Fest', category: 'Academic', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=280&fit=crop', date: '2024-05-01' },
];
const GALLERY_CATS = ['All', 'Events', 'Academic', 'Sports'];

const GalleryTab = ({ addToast }) => {
  const [photos, setPhotos] = useState(SEED_GALLERY);
  const [cat, setCat] = useState('All');
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Events', url: '', date: '' });

  const filtered = cat === 'All' ? photos : photos.filter(p => p.category === cat);

  const handleAdd = () => {
    if (!form.title || !form.url) return;
    const newP = { ...form, id: Date.now() };
    setPhotos(p => [...p, newP]);
    setForm({ title: '', category: 'Events', url: '', date: '' });
    setModal(null);
    addToast('Photo added to gallery!');
  };

  const handleDelete = (id) => {
    setPhotos(p => p.filter(x => x.id !== id));
    addToast('Photo removed.', 'info');
  };

  return (
    <div className="at-tab-content">
      <div className="at-tab-header">
        <div>
          <h2 className="at-tab-title"><FiImage /> Gallery</h2>
          <p className="at-tab-sub">Manage all campus photos & memories</p>
        </div>
        <button className="at-btn at-btn--primary" onClick={() => setModal('add')}>
          <FiPlus /> Add Photo
        </button>
      </div>

      <div className="at-filter-row">
        {GALLERY_CATS.map(c => (
          <button key={c} className={`at-filter-btn${cat === c ? ' at-filter-btn--active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="gallery-grid">
        {filtered.map(photo => (
          <div key={photo.id} className="gallery-card">
            <div className="gallery-card__img-wrap">
              <img src={photo.url} alt={photo.title} />
              <div className="gallery-card__overlay">
                <button className="gallery-card__overlay-btn" onClick={() => { setSelected(photo); setModal('view'); }}>
                  <FiEye />
                </button>
                <button className="gallery-card__overlay-btn gallery-card__overlay-btn--del" onClick={() => handleDelete(photo.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
            <div className="gallery-card__info">
              <span className="gallery-card__cat">{photo.category}</span>
              <p className="gallery-card__title">{photo.title}</p>
              <span className="gallery-card__date">{photo.date}</span>
            </div>
          </div>
        ))}
      </div>

      {modal === 'add' && (
        <Modal onClose={() => setModal(null)}>
          <div className="at-modal__header">
            <div><h2>Add Photo</h2><p>Upload a new photo to the gallery</p></div>
            <button className="at-modal__close" onClick={() => setModal(null)}><FiX /></button>
          </div>
          <div className="at-modal__body">
            <div className="at-form-group">
              <label>Title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Photo title" />
            </div>
            <div className="at-form-group">
              <label>Image URL</label>
              <input value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="at-form-row">
              <div className="at-form-group">
                <label>Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {['Events', 'Academic', 'Sports'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="at-form-group">
                <label>Date</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
            </div>
            <div className="at-form-actions">
              <button className="at-btn at-btn--ghost" onClick={() => setModal(null)}>Cancel</button>
              <button className="at-btn at-btn--primary" onClick={handleAdd}><FiPlus /> Add Photo</button>
            </div>
          </div>
        </Modal>
      )}

      {modal === 'view' && selected && (
        <Modal onClose={() => setModal(null)}>
          <div className="at-modal__header">
            <div><h2>{selected.title}</h2><p>{selected.category} · {selected.date}</p></div>
            <button className="at-modal__close" onClick={() => setModal(null)}><FiX /></button>
          </div>
          <div className="gallery-view-img">
            <img src={selected.url} alt={selected.title} />
          </div>
        </Modal>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
//  DARSHAN TAB
// ══════════════════════════════════════════════════════════════
const SEED_DARSHAN = [
  { id: 1, name: 'Somnath Temple', location: 'Gujarat', time: '06:00 AM – 09:00 PM', status: 'active', img: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=400&h=260&fit=crop', description: 'One of the twelve Jyotirlinga shrines of Lord Shiva.' },
  { id: 2, name: 'Dwarkadheesh Temple', location: 'Dwarka, Gujarat', time: '06:30 AM – 08:30 PM', status: 'active', img: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=400&h=260&fit=crop', description: 'Ancient temple dedicated to Lord Krishna.' },
  { id: 3, name: 'Ambaji Mata Temple', location: 'Banaskantha, Gujarat', time: '07:00 AM – 10:00 PM', status: 'active', img: 'https://images.unsplash.com/photo-1545830282-aca25a7b4e93?w=400&h=260&fit=crop', description: 'One of the 51 Shakti Peethas in India.' },
  { id: 4, name: 'Akshardham', location: 'Gandhinagar', time: '09:30 AM – 06:30 PM', status: 'maintenance', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=260&fit=crop', description: 'Magnificent swaminarayan temple complex.' },
];

const DarshanTab = ({ addToast }) => {
  const [darshanList, setDarshanList] = useState(SEED_DARSHAN);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', location: '', time: '', status: 'active', img: '', description: '' });

  const handleAdd = () => {
    if (!form.name || !form.location) return;
    setDarshanList(d => [...d, { ...form, id: Date.now() }]);
    setForm({ name: '', location: '', time: '', status: 'active', img: '', description: '' });
    setModal(null);
    addToast('Darshan location added!');
  };

  const handleDelete = (id) => {
    setDarshanList(d => d.filter(x => x.id !== id));
    addToast('Location removed.', 'info');
  };

  return (
    <div className="at-tab-content">
      <div className="at-tab-header">
        <div>
          <h2 className="at-tab-title"><FiSun /> Darshan</h2>
          <p className="at-tab-sub">Manage sacred & spiritual visit locations</p>
        </div>
        <button className="at-btn at-btn--primary" onClick={() => setModal('add')}>
          <FiPlus /> Add Location
        </button>
      </div>

      <div className="darshan-grid">
        {darshanList.map(d => (
          <div key={d.id} className="darshan-card">
            <div className="darshan-card__img-wrap">
              <img src={d.img || 'https://images.unsplash.com/photo-1545830282-aca25a7b4e93?w=400&h=200&fit=crop'} alt={d.name} />
              <span className={`darshan-card__status darshan-card__status--${d.status}`}>{d.status}</span>
            </div>
            <div className="darshan-card__body">
              <h3 className="darshan-card__name">{d.name}</h3>
              <p className="darshan-card__loc"><FiMapPin /> {d.location}</p>
              <p className="darshan-card__time"><FiClock /> {d.time}</p>
              <p className="darshan-card__desc">{d.description}</p>
              <div className="darshan-card__actions">
                <button className="at-btn at-btn--ghost at-btn--sm" onClick={() => { setSelected(d); setModal('view'); }}>
                  <FiEye /> View
                </button>
                <button className="at-btn at-btn--danger at-btn--sm" onClick={() => handleDelete(d.id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal === 'add' && (
        <Modal onClose={() => setModal(null)}>
          <div className="at-modal__header">
            <div><h2>Add Darshan Location</h2><p>Add a new sacred place</p></div>
            <button className="at-modal__close" onClick={() => setModal(null)}><FiX /></button>
          </div>
          <div className="at-modal__body">
            <div className="at-form-row">
              <div className="at-form-group">
                <label>Temple / Place Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Somnath Temple" />
              </div>
              <div className="at-form-group">
                <label>Location</label>
                <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="City, State" />
              </div>
            </div>
            <div className="at-form-row">
              <div className="at-form-group">
                <label>Darshan Time</label>
                <input value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} placeholder="06:00 AM – 09:00 PM" />
              </div>
              <div className="at-form-group">
                <label>Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="at-form-group">
              <label>Image URL</label>
              <input value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} placeholder="https://..." />
            </div>
            <div className="at-form-group">
              <label>Description</label>
              <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description..." />
            </div>
            <div className="at-form-actions">
              <button className="at-btn at-btn--ghost" onClick={() => setModal(null)}>Cancel</button>
              <button className="at-btn at-btn--primary" onClick={handleAdd}><FiPlus /> Add Location</button>
            </div>
          </div>
        </Modal>
      )}

      {modal === 'view' && selected && (
        <Modal onClose={() => setModal(null)}>
          <div className="at-modal__header">
            <div><h2>{selected.name}</h2><p>{selected.location}</p></div>
            <button className="at-modal__close" onClick={() => setModal(null)}><FiX /></button>
          </div>
          <div className="darshan-view">
            <img src={selected.img} alt={selected.name} className="darshan-view__img" />
            <div className="darshan-view__info">
              <p><FiMapPin /> <strong>Location:</strong> {selected.location}</p>
              <p><FiClock /> <strong>Darshan Time:</strong> {selected.time}</p>
              <p>{selected.description}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
//  EVENT TAB
// ══════════════════════════════════════════════════════════════
const SEED_EVENTS = [
  { id: 1, title: 'Annual Tech Symposium', date: '2024-08-15', time: '10:00 AM', venue: 'Main Auditorium', category: 'Academic', status: 'upcoming', seats: 200, registered: 145 },
  { id: 2, title: 'Cultural Fest — Rangmanch', date: '2024-07-25', time: '05:00 PM', venue: 'Open Ground', category: 'Cultural', status: 'upcoming', seats: 500, registered: 380 },
  { id: 3, title: 'Hackathon 2024', date: '2024-06-10', time: '09:00 AM', venue: 'Computer Labs', category: 'Technical', status: 'completed', seats: 120, registered: 120 },
  { id: 4, title: 'Sports Meet', date: '2024-09-05', time: '07:00 AM', venue: 'Sports Ground', category: 'Sports', status: 'upcoming', seats: 300, registered: 210 },
  { id: 5, title: 'Guest Lecture – AI', date: '2024-06-20', time: '11:00 AM', venue: 'Seminar Hall', category: 'Academic', status: 'completed', seats: 150, registered: 98 },
];
const EVENT_CATS = ['All', 'Academic', 'Cultural', 'Technical', 'Sports'];
const EVENT_STATUS = ['all', 'upcoming', 'completed'];

const EventTab = ({ addToast }) => {
  const [events, setEvents] = useState(SEED_EVENTS);
  const [cat, setCat] = useState('All');
  const [statusF, setStatusF] = useState('all');
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ title: '', date: '', time: '', venue: '', category: 'Academic', status: 'upcoming', seats: '', registered: 0 });

  const filtered = events
    .filter(e => cat === 'All' || e.category === cat)
    .filter(e => statusF === 'all' || e.status === statusF);

  const handleAdd = () => {
    if (!form.title || !form.date) return;
    setEvents(ev => [...ev, { ...form, id: Date.now(), seats: parseInt(form.seats) || 0, registered: 0 }]);
    setForm({ title: '', date: '', time: '', venue: '', category: 'Academic', status: 'upcoming', seats: '', registered: 0 });
    setModal(null);
    addToast('Event added successfully!');
  };

  const handleDelete = (id) => {
    setEvents(ev => ev.filter(x => x.id !== id));
    addToast('Event removed.', 'info');
  };

  return (
    <div className="at-tab-content">
      <div className="at-tab-header">
        <div>
          <h2 className="at-tab-title"><FiCalendar /> Events</h2>
          <p className="at-tab-sub">Organize and manage all campus events</p>
        </div>
        <button className="at-btn at-btn--primary" onClick={() => setModal('add')}>
          <FiPlus /> Add Event
        </button>
      </div>

      <div className="at-filter-row">
        {EVENT_CATS.map(c => (
          <button key={c} className={`at-filter-btn${cat === c ? ' at-filter-btn--active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
        <div className="at-filter-divider" />
        {EVENT_STATUS.map(s => (
          <button key={s} className={`at-filter-btn at-filter-btn--status${statusF === s ? ' at-filter-btn--active' : ''}`} onClick={() => setStatusF(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="event-list">
        {filtered.map(ev => {
          const pct = ev.seats ? Math.round((ev.registered / ev.seats) * 100) : 0;
          return (
            <div key={ev.id} className={`event-card event-card--${ev.status}`}>
              <div className="event-card__date-block">
                <span className="event-card__month">{new Date(ev.date).toLocaleString('default', { month: 'short' })}</span>
                <span className="event-card__day">{new Date(ev.date).getDate()}</span>
              </div>
              <div className="event-card__body">
                <div className="event-card__top">
                  <h3 className="event-card__title">{ev.title}</h3>
                  <span className={`event-card__status event-card__status--${ev.status}`}>{ev.status}</span>
                </div>
                <div className="event-card__meta">
                  <span><FiClock /> {ev.time}</span>
                  <span><FiMapPin /> {ev.venue}</span>
                  <span className={`event-card__cat event-card__cat--${ev.category.toLowerCase()}`}>{ev.category}</span>
                </div>
                <div className="event-card__seats">
                  <div className="event-card__seats-label">
                    <span>Registrations</span>
                    <span>{ev.registered} / {ev.seats} ({pct}%)</span>
                  </div>
                  <div className="event-card__seats-track">
                    <div className="event-card__seats-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
              <div className="event-card__actions">
                <button className="at-icon-btn at-icon-btn--view" onClick={() => { setSelected(ev); setModal('view'); }}><FiEye /></button>
                <button className="at-icon-btn at-icon-btn--del" onClick={() => handleDelete(ev.id)}><FiTrash2 /></button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="at-empty">
            <FiCalendar />
            <p>No events found</p>
          </div>
        )}
      </div>

      {modal === 'add' && (
        <Modal onClose={() => setModal(null)}>
          <div className="at-modal__header">
            <div><h2>Add New Event</h2><p>Fill in event details</p></div>
            <button className="at-modal__close" onClick={() => setModal(null)}><FiX /></button>
          </div>
          <div className="at-modal__body">
            <div className="at-form-group">
              <label>Event Title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Annual Tech Symposium" />
            </div>
            <div className="at-form-row">
              <div className="at-form-group">
                <label>Date</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div className="at-form-group">
                <label>Time</label>
                <input value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} placeholder="10:00 AM" />
              </div>
            </div>
            <div className="at-form-row">
              <div className="at-form-group">
                <label>Venue</label>
                <input value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} placeholder="Main Auditorium" />
              </div>
              <div className="at-form-group">
                <label>Total Seats</label>
                <input type="number" value={form.seats} onChange={e => setForm(f => ({ ...f, seats: e.target.value }))} placeholder="200" />
              </div>
            </div>
            <div className="at-form-row">
              <div className="at-form-group">
                <label>Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {['Academic', 'Cultural', 'Technical', 'Sports'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="at-form-group">
                <label>Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="at-form-actions">
              <button className="at-btn at-btn--ghost" onClick={() => setModal(null)}>Cancel</button>
              <button className="at-btn at-btn--primary" onClick={handleAdd}><FiCheckCircle /> Add Event</button>
            </div>
          </div>
        </Modal>
      )}

      {modal === 'view' && selected && (
        <Modal onClose={() => setModal(null)}>
          <div className="at-modal__header">
            <div><h2>{selected.title}</h2><p>{selected.category} · {selected.date}</p></div>
            <button className="at-modal__close" onClick={() => setModal(null)}><FiX /></button>
          </div>
          <div className="at-modal__body">
            <div className="event-view-grid">
              {[
                { l: 'Date', v: selected.date },
                { l: 'Time', v: selected.time },
                { l: 'Venue', v: selected.venue },
                { l: 'Category', v: selected.category },
                { l: 'Status', v: selected.status },
                { l: 'Seats', v: `${selected.registered} / ${selected.seats}` },
              ].map(f => (
                <div key={f.l} className="event-view-field">
                  <label>{f.l}</label>
                  <span>{f.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
//  MAIN ADMIN TABS PAGE
// ══════════════════════════════════════════════════════════════
const TABS = [
  { id: 'gallery',  label: 'Gallery',  icon: <FiImage /> },
  { id: 'darshan',  label: 'Darshan',  icon: <FiSun /> },
  { id: 'event',    label: 'Events',   icon: <FiCalendar /> },
  { id: 'student',  label: 'Students', icon: <FiUsers /> },
];

const AdminTabsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('gallery');
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  const handleBack = () => {
    if (navigate) navigate('/');
    else window.history.back();
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'gallery':  return <GalleryTab addToast={addToast} />;
      case 'darshan':  return <DarshanTab addToast={addToast} />;
      case 'event':    return <EventTab addToast={addToast} />;
      case 'student':  return <StudentsPage addToast={addToast} />;
      default:         return null;
    }
  };

  return (
    <div className="admin-tabs-page">
      <ToastContainer toasts={toasts} />

      {/* ── Sticky Header ─────────────────────────────────────── */}
      <header className="admin-tabs-header">
        <div className="admin-tabs-header__inner container">
          <button className="admin-tabs-header__back" onClick={handleBack} title="Go to Home">
            <FiArrowLeft />
          </button>

          <div className="admin-tabs-header__brand">
            <span className="admin-tabs-header__dot" />
            Admin Panel
          </div>

          <nav className="admin-tabs-header__tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`admin-tab-btn${activeTab === tab.id ? ' admin-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="admin-tab-btn__icon">{tab.icon}</span>
                <span className="admin-tab-btn__label">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="admin-tabs-header__spacer" />
        </div>
      </header>

      {/* ── Page Content ──────────────────────────────────────── */}
      <main className="admin-tabs-main container">
        {renderTab()}
      </main>
    </div>
  );
};

export default AdminTabsPage;