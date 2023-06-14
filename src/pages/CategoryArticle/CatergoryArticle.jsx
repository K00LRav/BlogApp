import React from 'react'
import './CategoryArticle.css'
import { useParams } from 'react-router-dom'
import { db } from "../../config/firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import ArticleCard from '../../components/ArticleCard/ArticleCard';

function CatergoryArticle() {
    //show article from certain category
    //what category? in the url
    const {categoryName} = useParams();

    //create state to hold the articles
    const [articles, setArticles] = React.useState([])

    //get documents for this category when the page loads
    React.useEffect(
        () => {
          //create reference to articles collection
          const articleRef = collection(db, "articles");
    
          //set up query to filter documents
          //sort and then get the first 5
          const q = query(articleRef, 
            where('category','==', categoryName))
    
          //get the documents from this collection
          getDocs(q, articleRef)
            .then((res) => {
              //console.log(res.docs[0].data())
              const articles = res.docs.map((item) => ({
                id: item.id,
                ...item.data(),
              }));
              console.log(articles);
              setArticles(articles)
            })
            .catch((err) => console.log(err));
        },[categoryName] //run anytime category changes, this is a use effect with a dependency
    )

  return (
    <div className='category-articles'>
        {
            articles.map(item => <ArticleCard key={item.id} article={item} />)
            //articles.map(item => <p>{item?.title}</p>)
        }
    </div>
  )
}

export default CatergoryArticle