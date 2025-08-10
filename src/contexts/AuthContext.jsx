import React, {createContext, useEffect, useContext, useState} from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const[user,setUser] = useState(null);
    const[loading,setLoading] = useState(true);
    const[isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        checkAuthStatus();
    },[]);

    const checkAuthStatus = async () => {
        try{
            const userData = await authService.getCurrentUser();
            if(userData){
                setUser(userData);
                setIsAuthenticated(true);
            }
        }catch(error){
            console.error("Auth Check Failed" + error);
        }finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try{
            await authService.login(credentials);
            await checkAuthStatus();
            return true;
        }catch(error){
            throw error;
        }finally{
            setLoading(false);
        }
    };

    // Logout functionality

    const logout = async () => {
        setLoading(true);
        try{
            await authService.logout();
            await checkAuthStatus();
            return true;
        }catch(error){
            throw error;
        }finally{
            setLoading(false);
        }
    }

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        checkAuthStatus,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};