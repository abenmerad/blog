import { Model } from "objection"

class PostsModel extends Model {
  static tableName = "posts"

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: PostsModel,
      join: {
        from: "posts.usersId",
        to: "users.id",
      },
    },
  }
}
export default PostsModel
