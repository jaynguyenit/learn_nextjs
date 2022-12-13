import { gql } from "@apollo/client";
import Link from "next/link";
import client from "../apollo-client";


function Blog({ posts1 }:any) {
  var posts = posts1?.nodes;
  return (
    <>
    <div className="nav">
      <Link
        href={{
          pathname: "/services",
          query: { sub_id: "4411",publisher_id: "test publisher" },
        }}
      >
        Services
      </Link><br />
      <Link href="/services/sub-services">
        Sub Services
      </Link>
    </div>

    <h1>Danh sach bai viet</h1>
    {
        posts.map((post: any) =>  (
            <>
            <div className="item">
                <h2>{post.title}</h2>
                <div className="content" dangerouslySetInnerHTML={ {__html: post.content}} />
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
