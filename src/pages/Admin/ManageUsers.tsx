import React, { useEffect, useState } from "react";
import "./../../styles/ManageUsers.css";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

interface User {
  id: string;
  name: string;
  fullName?: string;
  email: string;
  role: string;
  active: boolean;
  approved?: boolean;
  education?: string;
  experience?: string;
  skills?: string[];
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch graduates from graduates collection
        const graduatesSnapshot = await getDocs(collection(db, "graduates"));
        const graduatesData: User[] = graduatesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<User, 'id'>),
          role: "grad"
        }));

        // Fetch employers from users collection filtered by role
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersData: User[] = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<User, 'id'>)
        }));
        const employersData = usersData.filter(user => user.role === "employer");

        // Combine graduates and employers into one array for state
        setUsers([...graduatesData, ...employersData]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleActive = async (id: string) => {
    try {
      const userRef = doc(db, "users", id);
      const user = users.find(u => u.id === id);
      if (!user) return;
      await updateDoc(userRef, { active: !user.active });
      setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
    } catch (error) {
      console.error("Error toggling active status:", error);
    }
  };

  const changeRole = async (id: string, newRole: string) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { role: newRole });
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  const approveEmployer = async (id: string) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { approved: true });
      setUsers(users.map(u => u.id === id ? { ...u, approved: true } : u));
    } catch (error) {
      console.error("Error approving employer:", error);
    }
  };

  const resetPassword = async (email: string) => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      alert(`Reset password link sent to ${email}`);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Failed to send reset password email.");
    }
  };

  // Separate users by role
  const graduates = users.filter(user => user.role === "grad");
  const employers = users.filter(user => user.role === "employer");

  return (
    <div className="manage-users-container">
      <h1>User Management</h1>

      <div className="tables-container">

        <div className="table-wrapper">
          <h2>Employers</h2>
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Approved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employers.map(user => (
                <tr key={user.id} className={user.active ? "" : "inactive"}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.active ? "Active" : "Inactive"}</td>
                  <td>{user.approved ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => resetPassword(user.email)}>Reset Password</button>
                    <button onClick={() => toggleActive(user.id)}>
                      {user.active ? "Deactivate" : "Reactivate"}
                    </button>
                    {!user.approved && (
                      <button onClick={() => approveEmployer(user.id)}>Approve</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
