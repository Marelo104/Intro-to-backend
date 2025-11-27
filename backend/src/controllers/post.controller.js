import { Post } from "../models/post.model.js";

const createPost = async (req, res)=>{
    try {
        const { name, description, age } = req.body;

        if(!name || !description || !age) 
        return res.status(400).json({message: "All fields are important"});
        
        const post = await Post.create({ name, description, age});

        if(!post) return res.status(404).json({ message: "No info"});

        res.status(200).json({ message: "Post Create Successfully", post})
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
}

const getPosts = async (req, res)=>{
    try {
        const getAllPost = await Post.find();
        res.status(200).json(getAllPost)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
}

const updatePost = async (req, res)=>{
    try {
        if(Object.keys(req.body).length === 0){
            res.status(400).json({ message: "No data was provided for update" })
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!post) return res.status(404).json({ message: "Post Not Found" });

        res.status(200).json({ message: "Post Update Successfully", post})
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
}

const deletePost = async (req, res)=>{
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id, {new: true})
        if(!deleted) return res.status(404).json({ message: "Post Not Found" });

        res.status(200).json({ message: "Delete Successfully", deleted})
    } catch (error) {
        res.status(500).json({
            message: "Internal Server error", error
        });
    }
}

export {
    createPost,
    getPosts,
    updatePost,
    deletePost
};