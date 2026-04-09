import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import type { User } from "@/types/index";
import { useEffect } from "react";

export const useUsersApi = () => {
    const { user, accessToken } = useAuth();
    
    
    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/users", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (err) {
            console.error("Error al obtener usuarios:", err);
            throw err;
        }
    };

    const postUser = async (userData: User) => {
        try {
            const response = await axios.post("http://localhost:3000/api/users", userData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (err) {
            console.error("Error al crear usuario:", err);
            throw err;
        }
    };

    const getUserById = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (err) {
            console.error("Error al obtener usuario:", err);
            throw err;
        }
    };

    const updateUser = async (id: string, userData: User) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/users/${id}`, userData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (err) {
            console.error("Error al actualizar usuario:", err);
            throw err;
        }
    };

    const deleteUser = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (err) {
            console.error("Error al eliminar usuario:", err);
            throw err;
        }
    };

    return {
        getUsers,
        postUser,
        getUserById,
        updateUser,
        deleteUser
    };
};