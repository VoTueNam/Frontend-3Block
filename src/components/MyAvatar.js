// hooks
// import useAuth from '../hooks/useAuth';
import { useAuth } from '../firebaseLogin/contexts/AuthContext';

// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { currentUser } = useAuth();
  // var results = JSON.parse(localStorage.getItem('user'));
  const results = currentUser;

  return (
    <Avatar
      src={
        // user?.photoURL
        results?.photoURL
      }
      alt={results?.displayName || results?.email}
      color={results?.photoURL ? 'default' : createAvatar(results?.displayName).color}
      {...other}
    >
      {createAvatar(results?.displayName || results?.email).name}
    </Avatar>
  );
}
