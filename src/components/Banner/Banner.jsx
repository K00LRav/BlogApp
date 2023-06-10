import React from "react";
import { db } from "../../config/firebaseConfig";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import "./Banner.css";

function Banner() {
  //create state for main article and other articles
  const [mainArticle, setMainArticle] = React.useState("");
  const [otherArticles, setOtherArticles] = React.useState([]);

  //when this page loads, get top 5 article from db
  //and display
  React.useEffect(
    () => {
      //create reference to articles collection
      const articleRef = collection(db, "articles");

      //set up query to filter documents
      //sort and then get the first 5
      const q = query(articleRef, 
        orderBy('createdAt', 'desc'), limit(5))

      //get the documents from this collection
      getDocs(q, articleRef)
        .then((res) => {
          //console.log(res.docs[0].data())
          const articles = res.docs.map((item) => ({
            id: item.id,
            ...item.data(),
          }));
          console.log(articles);
          //I have data, what do I do with it??
          //put first one in mainArticle
          setMainArticle(articles[0]);
          //put the rest of the articles in otherArticles
          setOtherArticles(articles.splice(1));
        })
        .catch((err) => console.log(err));
    },
    [] //run once when page loads
  );

  return (
    <div className="banner-container">
      <div
        className="main-article-container"
        style={{ backgroundImage: `url(${mainArticle?.imageUrl})` }}
      >
            <div className="banner-info">
                <h2>{mainArticle?.title}</h2>
                <small>{mainArticle?.createdAt?.toDate().toDateString()}</small>
            </div>
      </div>
      <div className="other-articles-container">
        {
            otherArticles?.map(item => 
            <div className="other-article-item" 
            style={{backgroundImage:`url(${item?.imageUrl})`}}>
                <div className="banner-info">
                    <h3>{item?.title}</h3>
                    <small>{item?.createdAt?.toDate().toDateString()}</small>
                </div>
            </div>
            )
        }
      </div>
    </div>
  );
}

export default Banner;
