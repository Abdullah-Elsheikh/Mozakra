import { Comment } from "../../../db/models/comment.model.js";

//add comment
const createComment = async (req, res, next) => {
  try {
    const { description } = req.body;             
    const { courseId } = req.params;     
    const userId = req.authUser._id;           
    const comment = await Comment.create({
      description,
      courseId,
      userId
    }); 

    return res.status(201).json({
      id: comment._id,
      description: comment.description,
      courseId: comment.courseId,
      userId: comment.userId,
      createdAt: comment.createdAt
    });
  } catch (err) {
    return next(err);
  }
};

//get comment 
const getCommentById = async (req, res) => {
     try {
    const { courseId } = req.params;
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);
    const sort = req.query.sort || '-createdAt';

    const filter = { courseId };
    const [items, total] = await Promise.all([
      Comment.find(filter).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
      Comment.countDocuments(filter)
    ]);

    return res.status(200).json({
      items,
      page,
      limit,
      total,
      hasMore: page * limit < total
    });
  } catch (e) { next(e); }
};

//update comment
const updateComment = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const comment = await Comment.findById(id);
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    comment.description = description;
    await comment.save();

    res.status(200).json({
        id: comment._id,
        description: comment.description,
        postId: comment.postId,
        userId: comment.userId
    });
};

//delete comment
const deleteComment = async (req, res) => {
 const { id } = req.params;
const deleted = await Comment.findByIdAndDelete(id);
if (!deleted) return res.status(404).json({ message: "Comment not found" });
return res.status(200).json({ message: "Deleted", id });

};

export {createComment, updateComment, deleteComment, getCommentById};