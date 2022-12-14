import { gql } from "@apollo/client";
import Link from "next/link";
import client from "../apollo-client";
import { useRouter } from "next/router";



function Blog({ posts1 }:any) {
  const router = useRouter()
  const query = router.query; // gọi tất cả param url
  console.log(query);
  // const {
  //   query: { sub_id,utm_source },
  // } = router
  var posts = posts1?.nodes;
  return (
    <>
    <h1>Danh sach bai viet</h1>
    {
        posts.map((post: any,index: number) =>  (
            <>
            <div className="item" key={"item-"+index}>
              <Link href={`/post${post.uri}`} passHref={true}>
                  <h1>{post.title}</h1>
                  <div className="content" dangerouslySetInnerHTML={{__html: post.content}} />
              </Link>
            </div>
            </>
        ))
    }
    </>
  )
}
export default Blog;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query getPosts {
        posts {
          nodes {
            content
            title
            uri
          }
        }
      }
    `,
  });

  return {
    props: {
      posts1: data.posts,
    },
 };
}
