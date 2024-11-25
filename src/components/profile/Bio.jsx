import { useState } from "react";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/share.svg";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";
const Bio = () => {
    const { state, dispatch } = useProfile();
    const { api } = useAxios();
    const [bio, setBio] = useState(state?.user?.bio);
    const [editMode, setEditMode] = useState(false);

    const handleBioEdit = async () => {
        dispatch({
            type: actions.profile.DATA_FETCHING,
        });
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
                    state?.user?.id
                }`,
                { bio }
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.USER_DATA_EDITED,
                    data: response.data,
                });
            }
            setEditMode(false);
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    return (
        <>
            <div className="mt-4 flex items-start gap-2 lg:mt-6">
                <div className="flex-1">
                    {!editMode ? (
                        <p className="leading-[188%] text-gray-400 lg:text-lg">
                            {state?.user?.bio}
                        </p>
                    ) : (
                        <textarea
                            className="text-black"
                            value={bio}
                            rows={4}
                            cols={55}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    )}
                </div>
                {!editMode ? (
                    <button
                        onClick={() => setEditMode(true)}
                        className="flex-center h-7 w-7 rounded-full"
                    >
                        <img src={EditIcon} alt="Edit" />
                    </button>
                ) : (
                    <button className="flex-center h-7 w-7 rounded-full">
                        <img
                            src={CheckIcon}
                            alt="Check"
                            onClick={handleBioEdit}
                        />
                    </button>
                )}
            </div>
        </>
    );
};

export default Bio;
