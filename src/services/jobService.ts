/*export const jobService = {
  postJob: () => {},
  fetchJobs: () => {},
}; */


import { db } from '../firebase'; // make sure this is your correct Firebase setup
import { collection, getDocs } from 'firebase/firestore';

export const fetchJobs = async () => {
  const querySnapshot = await getDocs(collection(db, 'jobs'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
