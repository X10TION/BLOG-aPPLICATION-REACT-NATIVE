const Post = require("../Models/PostModel");
const FeaturedPost = require("../Models/FeaturePost");
const cloudinary = require("../Cloud");
const { isValidObjectId } = require("mongoose");
///////////////////////////////////////////////////////////////////////
const FEATURE_POST_COUNT = 4;

const addToFeaturesPost = async (postId) => {
  const isAlreadyExists = await FeaturedPost.findOne({ post: postId });
  //    //////// validating file request
  if (isAlreadyExists) return;

  const featurePost = new FeaturedPost({ post: postId });
  await featurePost.save();

  const featurePostSorted = await FeaturedPost.find({}).sort({
    createdAt: -1,
  });

  featurePostSorted.forEach(async (post, index) => {
    if (index >= FEATURE_POST_COUNT)
      await FeaturedPost.findByIdAndDelete(post._id);
  });
};
///////////////////////////////////////////////////////////////////////////////////////

exports.createPost = async (req, res) => {
  const { title, meta, content, slug, author, tags, featured } = req.body;
  // console.log(req.file)
  const { file } = req;
  const isAlreadyExists = await Post.findOne({ slug });
  //    //////// validating file request
  if (isAlreadyExists)
    return res.status(401).json({ error: "Please Use unique slug" });

  const newPost = new Post({ title, meta, content, slug, author, tags });
  if (file) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      file.path
    );
    newPost.thumbnail = { url, public_id };
  }
  await newPost.save();

  if (featured) addToFeaturesPost(newPost._id);
  res.json({
    post: {
      id: newPost._id,
      title,
      content,
      thumbnail: newPost.thumbnail?.url,
      author: newPost.author,
    },
  });
};

exports.deletePost = async (req, res) => {
  const { postID } = req.params;
  console.log(postID);

  if (!isValidObjectId(postID))
    return res.status(404).json({ error: "Invalide Request!" });

  const post = await Post.findById(postID);
  
console.log(post);
  if (!post) return res.status(404).json({ error: "Post not Found!" });

  const  public_id  = post.thumbnail?.public_id;

  if (public_id) {
    const { result } = await cloudinary.uploader.destroy(public_id);

    if (result !== "ok")
      return res
        .status({ error: error })
        .json({ error: "Could not remove thumbnail!" });
  }
  await Post.findByIdAndDelete(postID);
  res.json({ message: "Post removed successfully" });
};


exports.updatePost = async (req, res) => {
    const { postID } = req.params;
      const { title, meta, content, slug, author, tags, featured } = req.body;
      // console.log(req.file)
      const { file } = req;
    console.log(postID);

    if (!isValidObjectId(postID))
      return res.status(404).json({ error: "Invalide Request!" });


        const post = await Post.findById(postID);
        if(!post) return res.status(404).json({ error: "Post not Found!" });
}