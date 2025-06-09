import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const roleUser = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if ('admin' == roleUser) {
    return children;
  }

  if (roleUser == 'admin') {
    return <Navigate to="/CrudProducts" replace />;
  } else {
    return <Navigate to="/AddProducts" replace />;
  }
};

export default ProtectedRoutes;
