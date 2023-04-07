
const {addNewMember, editMember, deleteMember, getMembers} = require('../services/member.services');

const addNewMemberController = async (req, res) => {
    const member = req.body.member;
    const member_id = await addNewMember(member);
    if(!member_id)
        res.status(500).json({message : "Member not added"});
    else
    res.status(200).json({member_id : member_id , message : "Member added"});
}

const editMemberController = async (req, res) => {
    const member = req.body.member;
    const updated_member = await editMember(member);
    if(!updated_member)
        res.status(500).json({
            success: false,
            message: "Member not edited",
        });
    else
        res.status(200).json({
            success: true,
            message: "Member edited",
            member : updated_member
        });
}

const deleteMemberController = async (req, res) => {
    const member_id = req.body.member_id;
    deleteMember(member_id).then((result) => {
    if(result)
    res.status(200).json({
        success: true,
        message: "Member deleted",
    })
    
    else {
        res.status(500).json({
            success: false,
            message: "Member not deleted",
        })
    }});
}

const getMembersController = async (req, res) => {
    console.log("got request");
    const members = await getMembers();
    if(!members)
        res.status(500).json({
            success: false,
            message: "Members not found",
        });
    else
    res.status(200).json({
        success: true,
        members : members
    });
}

module.exports = {addNewMemberController, editMemberController, deleteMemberController, getMembersController};