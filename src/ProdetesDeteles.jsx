import React from 'react'
import { useParams } from 'react-router-dom';
import {useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
 

function ProdetesDeteles() {

  const getids = useParams()


  const mutation = useMutation({
    mutationFn: (newProdect) => {
      return axios.put(`https://fakestoreapi.com/products/${getids.id}`, newProdect)
    },
  })



  const setpro = async ()=>{
    const  date = await  fetch(`https://fakestoreapi.com/products/${getids.id}`)
    .then(res=>res.json());
  
     return date;
    
  }

  const { isLoading, isError, data} = useQuery({ queryKey:["produ",getids.id ], queryFn: setpro });  
      
      
     
 
  if(isError){
    return <h2>Some Problem in this site..... {isError}</h2>
  }
  if(isLoading){
    return <h2>Loading....</h2>
  }

  return (
    <div>
       <h1>Title: {data.title}</h1>

       <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Update Prodect' })
            }}
          >
           Update Title
          </button>
    </div>
  )
}

export default ProdetesDeteles
