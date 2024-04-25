import React, {useState, useEffect} from "react"
import styles from "./Profile.module.css"
import {ProfileSide} from "./components/ProfileSide"
import {ProfileMain} from "./components/ProfileMain"
import {useLocation} from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import {db} from '../../Firebase/firebase';

const Profile = () => {
    const location = useLocation()
    const id = location.pathname.replace("/profile/", "")

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(db, 'users', id);

                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                } else {
                    console.log('No such user!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchUserData();
    }, [id]); 

    return (
        <>
            {userData && (
                <>
                    <div className={styles.plug}></div>
                    <div className={styles.wrapper}>
                        {userData && (
                            <>
                                <ProfileSide userData={userData} userId={id} />
                                <ProfileMain userData={userData} />
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export {Profile}