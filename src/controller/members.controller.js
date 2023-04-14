
const {addNewMember, editMember, deleteMember, getMembers , getDetails , getSectionMembers} = require('../services/member.services');

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

const getDetailsController = async (req, res) => {
    const member_id = req.params.id;
    const member = await getDetails(member_id);
    if(!member)
        res.status(500).json({
            success: false,
            message: "Member not found",
        });
    else
    res.status(200).json({
        success: true,
        member : member
    });
}

const deleteMemberController = async (req, res) => {
    const member_id = req.params.id;
    const result = await deleteMember(member_id)
    if(result){
    console.log("Member deleted");
    res.status(200).json({
        success: true,
        message: "Member deleted",
    })}
    
    else {
        res.status(500).json({
            success: false,
            message: "Member not deleted",
        })
    }
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

const getSectionMembersController = async (req, res) => {
    
    console.log("got request");
    const sections = await getSectionMembers();
    if(!sections)
        res.status(500).json({
            success: false,
            message: "Members not found",
        });
    else
    res.status(200).json({
        success: true,
        sections : sections
    });
}



module.exports = {addNewMemberController, editMemberController, deleteMemberController, getMembersController , getDetailsController , getSectionMembersController};
