import { gql } from "@apollo/client";
import { useRouter } from "next/router"
import client from "../../apollo-client";

function DynamicPage({postDetail}:any) {
  var post = postDetail;
  var categorys = post?.categories?.nodes;
  // console.log(post);
  return (
    <>
      <h1>{post?.title}</h1>
      <div className="content" dangerouslySetInnerHTML={ {__html: post?.content}} />
      <img src={post?.featuredImage?.node.mediaItemUrl}  />
      <div className="cat">
        <h3>Category:</h3>
        {
          categorys&&categorys.map((category: any,index: number ) =>  (
            <>
            <div className="item" key={"item-"+index}>
              {category.name} <br />
              {category.slug}<br />
              {category.uri} <br /><br />
            </div>
            </>
        ))
        }
      </div>
     
    </>
  );
}
export default DynamicPage;


export async function getStaticProps(context: { params: {
  [x: string]: any; slug: any; 
}; }) {

  const slug = context?.params.slug
  console.log(context);
  const { data } = await client.query({
    query: gql`
    query NewQuery {
      postBy(slug:${slug}) {
        title
        content
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        categories {
          nodes {
            slug
            name
            uri
          }
        }
      }
    }
    `,
  });

  return {
    props: {
      postDetail: data.postBy,
    },
 };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}