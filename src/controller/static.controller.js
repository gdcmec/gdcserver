const {
    getAbout,
    getTechStack,
    AddTechStack,
    editTechStack,
    deleteTechStack,
    editAbout

} = require("../services/static.services");


const getAboutController = async (req, res) => {
    try {
        const result = await getAbout();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getTechStackController = async (req, res) => {
    try {
        const result = await getTechStack();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const AddTechStackController = async (req, res) => {
        
    try {
        const result = await AddTechStack(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const editTechStackController = async (req, res) => {
    try {
        const result = await editTechStack(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteTechStackController = async (req, res) => {
    try {
        const result = await deleteTechStack(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const editAboutController = async (req, res) => {
    try {
        const result = await editAbout(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getStaticController = async (req, res) => {
    try {
        const AboutUs = await getAbout();
        const TechStack = await getTechStack();
        res.status(200).json({ AboutUs, TechStack });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {
    getAboutController,
    getTechStackController,
    AddTechStackController,
    editTechStackController,
    deleteTechStackController,
    editAboutController,
    getStaticController
}



