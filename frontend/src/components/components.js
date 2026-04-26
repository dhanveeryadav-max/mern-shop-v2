// PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

// AdminRoute.js
export function AdminRoute({ children }) {
  const { user } = useAuth();
  return user && user.isAdmin ? children : <Navigate to="/" />;
}

// Footer.js
export function Footer() {
  return (
    <footer style={{
      background: '#1a1a2e', color: '#888', textAlign: 'center',
      padding: '20px', marginTop: 'auto', fontSize: '14px'
    }}>
      © {new Date().getFullYear()} ShopMERN — Built with MERN Stack ❤️
    </footer>
  );
}
