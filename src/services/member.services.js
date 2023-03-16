const Member = require('../Models/MemberModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const addNewMember = async (memberDetails) => {

    const memeber_id = await Member.create({
        name: memberDetails.name,
        photoUrl: memberDetails.photoUrl,
        position: memberDetails.position,
    })
    .then((result) => {
        console.log(result);
        return result._id;
    }
    ).catch((err) => {
        console.log(err);
    });
    return memeber_id;

}

const editMember = async (memberDetails) => {
    
    let result = null;
    try{
     result = await Member.findByIdAndUpdate({_id: new ObjectId(memberDetails.id)}, {
        name: memberDetails.name,
        photoUrl: memberDetails.photoUrl,
        position: memberDetails.position,
    },{new : true})
}
catch(err){
    console.log(err);
}
    return result;
}

const deleteMember = async (member_id) => {

    Member.deleteOne({_id: new ObjectId(member_id)})
    .then((result) => {
        console.log(result);
    }
    ).catch((err) => {
        console.log(err);
    }
    );
}

const getMembers = async () => {
    const members = await Member.find().sort({position: 1})
    return members;
}

module.exports = { addNewMember, editMember, deleteMember , getMembers }