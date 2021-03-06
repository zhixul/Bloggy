const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosastic = require('mongoosastic');
var elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({host: 'https://search-bloggy-iec77mrsmswpriiofnkjh3ggrq.us-west-1.es.amazonaws.com'});

// Create Schema for single Post
const PostSchema = new Schema({
  linked_userid: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String, 
    es_indexed:true,
    required: true
  },
  subtitle: {
    type:String, 
    es_indexed:true,
    default: ""
  },
  author: {
    type:String, 
    es_indexed:true,
    default: "Anonymous"
  },
  dateTime: {
    type: Date,
    es_indexed:true,
    default: Date.now
  },
  text: {
    type: String,
    es_indexed:true,
    required: true
  },
  sources: {
    type: [String]
  },
  tags: {
    type: [String]
  },
  likes: [
    {
      linked_like_userid: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  dislikes: [
    {
      linked_dislike_userid: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
 
  comments: [
    {
      linked_comm_userid: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      username: {
        type: String,
        default: "Anonymous"
      },
      avatar: {
        type: String
      },
      dateTime: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

PostSchema.plugin(mongoosastic, {
    esClient: esClient
});
module.exports = Post = mongoose.model("posts", PostSchema);
