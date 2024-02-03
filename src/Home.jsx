import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React   from 'react'
import { Link, useSearchParams } from "react-router-dom";


function Home() {

  const [searchs , setsearch] = useSearchParams({skip:0,limit:4})
 
  const limit = parseInt(searchs.get('limit') || 0)
  const skip  = parseInt(searchs.get('skip') || 0)
  const q =  searchs.get("q") || '';

  const setpro = async ()=>{
    const  date = await  fetch(`https://fakestoreapi.com/products?limit=${limit}&skip=${skip}&q=${q}`)
    .then(res=>res.json());
    
     return date;
    
  } 


  const cat = async ()=>{
    const showcat = await fetch('https://fakestoreapi.com/products')
    .then((res)=>res.json());
    return showcat;
     
  }
  const {data:cata} = useQuery({queryKey:['cats'], queryFn:cat})
  
      const { isLoading, isError, data:produ} = useQuery({ queryKey:["produ",limit,skip,q], queryFn: setpro, placeholderData: keepPreviousData } );  
      
      
     
 
if(isError){
  return <h2>Some Problem in this site..... {isError}</h2>
}
if(isLoading){
  return <h2>Loading....</h2>
}


const pagecon= (conunt)=>{
  
  setsearch((pre)=>{
 pre.set('skip',Math.max(skip + conunt,0))
 return pre;
  })
    
}
 

  return (

    
    <div className="bg-white">


<header className="p-4 bg-gray-800 dark:text-gray-100">
	<div className="container flex justify-between h-16 mx-auto">
		<div className="flex">
			 
    <fieldset className="w-full   dark:text-gray-100">
	<label for="Search" className="hidden">Search</label>
	<div className="relative">
		<span className="absolute inset-y-0 left-0 flex items-center pl-2">
			<button type="button" title="search" className="p-1 focus:outline-none focus:ring">
				 
			</button>
		</span>
		<input onChange={(e)=>{
      setsearch((pre)=>{
        pre.set("q",e.target.value);
        pre.set('skip',0);
        return pre;
      })
    }} type="search" name="Search" placeholder="Search..." className="w-full py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400" />
	</div>
</fieldset>

		</div>


		<form className="w-2/5 pl-5   ">
  <fieldset className='rounded-2xl '>

  <div className="relative border rounded-2xl border-gray-300 text-gray-800 bg-white shadow-lg">
    <label for="frm-whatever" className="sr-only">My field</label>
    <select className="  w-full py-1 px-2 rounded-2xl  bg-white" name="whatever" id="frm-whatever">
        <option value="">Please choose&hellip;</option>
 { cata && cata?.map((data)=>{
  return    <option key={data.id} value="1">{data.category} </option>
      
    }) }
    </select>
    <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
    </div>
</div>
    </fieldset>
</form>

		<button className="p-4 lg:hidden">
			 
		</button>
	</div>
</header>



    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
  
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {produ && produ?.map((product) =>  ( 
            <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
           
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full cursor-pointer object-cover object-center lg:h-full lg:w-full"
              /> 
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                <Link to={`Prodect/${product.id}`}>   
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                    </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          </div>
 ))}
      </div>
    </div>


    <div className="flex justify-center space-x-1 dark:text-gray-100">
	<button title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800">
		<svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
			<polyline points="15 18 9 12 15 6"></polyline>
		</svg>
	</button>
	<button onClick={()=>{pagecon(-limit)}} type="button" title="Page 1" className="inline-flex items-center justify-center   h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-violet-400 dark:border-violet-400">Preves</button>

	<button type="button" onClick={()=>{pagecon(limit)}} className="inline-flex items-center justify-center   h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800" title="Page 2">Next</button>

 

	<button title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800">
		<svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
			<polyline points="9 18 15 12 9 6"></polyline>
		</svg>
	</button> <br /><br /><br />
</div>



  </div>

    
  )
}

export default Home
