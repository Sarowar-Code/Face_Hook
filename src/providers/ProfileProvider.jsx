import { useReducer } from "react";
import { ProfileContext } from "../context";
import { initalState, profileReducer } from "../reducers/profileReducer";

const ProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(profileReducer, initalState);

    return (
        <ProfileContext.Provider value={{ state, dispatch }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
