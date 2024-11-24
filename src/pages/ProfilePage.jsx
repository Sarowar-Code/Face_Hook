import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { api } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        setLoading(true);
        const fetchProfile = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
                        auth?.user?.id
                    }`
                );
                setUser(response?.data?.user);
                setPosts(response?.data?.posts);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return <div>Fethcing your data...</div>;
    }

    return (
        <>
            Welcome {user?.firstName} {user?.lastName}{" "}
        </>
    );
};

export default ProfilePage;
