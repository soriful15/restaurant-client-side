import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import axios from 'axios';
export const AuthContext = createContext(null)

const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const goggleProviderSingIn = new GoogleAuthProvider()


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    const googleProvider = () => {
        setLoading(true)
        return signInWithPopup(auth, goggleProviderSingIn)
    }


    const updateUserProfile = (name, photo, email) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
            email: email
        })
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {


        const unsubscribe = onAuthStateChanged(auth, loggedUser => {
            console.log('logged in user inside auth state observe', loggedUser);
            setUser(loggedUser)
            // setLoading(false)


            // jwt
            if (loggedUser) {
                axios.post('http://localhost:3000/jwt', { email: loggedUser.email })
                    .then(data => {
                        // console.log(data.data.token)
                        localStorage.setItem('JwtTokenSecret', data.data.token)
                        setLoading(false)
                    })
            }
            else {
                localStorage.removeItem('JwtTokenSecret');
            }




        })
        return () => {
            unsubscribe()
        }

    }, [])
    const authInfo = {
        createUser, singIn, user, loading, googleProvider, logOut, updateUserProfile
    }
    return (
        <>
            <AuthContext.Provider value={authInfo} >

                {children}
            </AuthContext.Provider>
        </>
    );
};

export default AuthProvider;