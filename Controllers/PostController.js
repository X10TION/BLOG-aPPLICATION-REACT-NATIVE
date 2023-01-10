const Post = require('../Models/PostModel');
const FeaturedPost = require('../Models/FeaturePost')
///////////////////////////////////////////////////////////////////////
const FEATURE_POST_COUNT =  4;

const addToFeaturesPost = async(postId) => {
   const featurePost =  new FeaturedPost({ post: postId})
    await  featurePost.save()

   const featurePostSorted =  await featurePost.find({}).sort({createdAt: -1})
  
   featurePostSorted.forEach(async(post, index) => {

    if(index  >= FEATURE_POST_COUNT) await FeaturedPost.findByIdAndDelete(post._id)
   })
   
}
///////////////////////////////////////////////////////////////////////////////////////

exports.createPost = async(req, res) => {
    const { title, meta, content, slug, author, tags, featured } = req.body
    // console.log(req.file)
  
        const newPost = new Post(
            {title,meta, content, slug, author, tags }
        )
          await newPost.save();
          if(featured) addToFeaturesPost(newPost._id)

        res.json({newPost});
}