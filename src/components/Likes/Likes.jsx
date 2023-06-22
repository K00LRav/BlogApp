import React, {useState, useEffect} from 'react'
import './Likes.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { auth } from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db } from '../../config/firebaseConfig'
import { addDoc, collection, deleteDoc } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore'
import { doc } from 'firebase/firestore'


function Likes({articleId}) {

    //get user data
    const [user] = useAuthState(auth)

    const [isLiked, setIsLiked] =useState(false)
    const [likeCount, setLikeCount] = useState(0)

    useEffect(
        //did the user like this aritcle?
        //need to get hold of the likes collection
        ()=>{
            const likesRef = collection(db, "likes")

            //checking if user is logged in
            if(user){
                const q = query(likesRef, 
                    where("articleId", "==",articleId), 
                    where("userId", "==", user.uid)
                )

                //looking for a matching document
                getDocs(q, likesRef).then(res =>{
                    if(res.size>0){
                        setIsLiked(true)
                    }
                })
            }
        },[user]
    )

    useEffect(
        ()=>{
            const likesRef = collection(db, "likes")

            //now find like count
            //make a query to count the likes of this article
            const q2 = query(likesRef,where("articleId", "==", articleId))

            //look for matching document
            getDocs(q2, likesRef)
            .then(res =>{
                setLikeCount(res.size)
            })
            .catch(err => console.log(err))
            },[isLiked])
        
    

    const handleLike = () =>{
        if(user){
            const likesRef = collection(db, "likes")

            addDoc(likesRef,{
                userId: user?.uid,
                articleId: articleId
            }).then(res => setIsLiked(true))
            .catch(err => console.log(err))
        }
    }

    const handleUnlike = () => {
        console.log("userid", user.uid )
        
        if(user){
            //need to find document with this article with articleid and userid
            //to get document id
            const likesRef = collection(db, "likes")

            //setup query to  find id of the record to delete
            const q = query(likesRef, 
                where("articleId", "==",articleId), 
                where("userId", "==", user.uid)
            )

            //get a match 
            getDocs(q, likesRef).then(res => {
                console.log(res.size)
                const likedId = res.docs[0].id

                //now delete this doc from the likes collection
                deleteDoc(doc(db,"likes", likedId))
                .then(res => setIsLiked(false))
                .catch(err => console.log(err))
            })
        }
    }

  return (
    <div>{isLiked? <FaHeart onClick={handleUnlike}/> : <FaRegHeart onClick={handleLike}/>}
    <span>{likeCount}</span>
    </div>
    
  )
}

export default Likes