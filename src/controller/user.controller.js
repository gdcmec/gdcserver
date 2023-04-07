
const {addUser, getUsers,editUser,getUserEvents, deleteUser ,getUserId, getInterested, getAttendees, getFeedbacks} = require('../services/user.services');


const addUserController = async (req, res) => {
    const user = req.body.user;
    const user_id = await addUser(user);
    if(!user_id)
        res.status(500).json({message : "User not added"});
    else
    res.status(200).json({user_id : user_id , message : "User added"});
}

const getUsersController = async (req, res) => {
     
    const users = await getUsers();
    if(!users)
        res.status(500).json({
            success: false,
            message: "Users not found",
        });
    else
    res.status(200).json({
        success: true,
        users : users
    });
}

const deleteUserController = async (req, res) => {
    const user_id = req.params.user_id;
    deleteMember(member_id).then((result) => {
    if(result)
    res.status(200).json({
        success: true,
        message: "User deleted",
    })
    
    else {
        res.status(500).json({
            success: false,
            message: "User not deleted",
        })
    }});
}

const getUserEventsController = async (req, res) => {
    const user_id = req.params.user_id;
    const events = await getUserEvents(user_id);
    if(!events)
        res.status(500).json({
            success: false,
            message: "Events not found",
        });
    else
    res.status(200).json({
        success: true,
        events : events
    });
}

const editUserController = async (req, res) => {

    const user = req.body.user;
    const updated_user = await editUser(user);
    if(!updated_user)
        res.status(500).json({
            success: false,
            message: "User not edited",
        });
    else
        res.status(200).json({
            success: true,
            message: "User edited",
            user : updated_user
        });
}

module.exports = {addUserController, getUsersController, deleteUserController, getUserEventsController, editUserController};

    
