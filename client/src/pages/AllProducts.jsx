import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const AllProducts = () => {
    const { category, setCategory, books, clothes,shops } = useContext(AppContext)

    const [bookCategory, setBookCategory] = useState(false)
  
    const [filterBook, setFilterBook] = useState([])

    const navigate = useNavigate()
    const [clothCategory, setClothCategory] = useState(false)

    const [clothSubCategory, setClothSubCategory] = useState(false)

    const [filterClothes, setFilterClothes] = useState([])

    const [filterShops,setFilterShops]=useState([])
    const [shopCategory, setShopCategory] = useState(false)
    
    const applyFilterClothes = () => {

        let filtered = clothes

        if (clothCategory) {

            filtered = filtered.filter(
                (item) => item.category === clothCategory
            )

        }

        if (clothSubCategory) {

            filtered = filtered.filter(
                (item) => item.subCategory === clothSubCategory
            )

        }

        setFilterClothes(filtered)

    }

   const applyFilterShops=()=>{
    let filtered=shops.filter((shop)=>shop.isActive===true)
    if(shopCategory){
        filtered=filtered.filter((shop)=>shop.category===shopCategory)
    }
    setFilterShops(filtered)
   }

    

    
    useEffect(() => {
        applyFilterClothes()
    }, [clothes, clothCategory, clothSubCategory])

    const applyFilterBook = async () => {
        if (bookCategory) {
            setFilterBook(books.filter((book) => book.category === bookCategory))
        } else {
            setFilterBook(books)
        }
    }

    useEffect(() => {
        applyFilterBook()
    }, [books, bookCategory])
    useEffect(() => {
        applyFilterShops()
    }, [shops, shopCategory])
    return (
        <div className='flex flex-row w-full h-full mt-16 ml-2 scroll-smooth'>
            <div className='fixed w-[18%] border-r-[1px] border-gray-500  pl-3 flex flex-col gap-2 ml-2 text-gray-800 text-md h-[100vh]'>
                <p className='mt-4 font-medium '>FILTER</p>
                <div className='flex flex-row gap-2 cursor-pointer'>
                    <p onClick={(e) => setCategory('clothes')} className='text-md'><input type='checkbox' value='clothes' className='mr-2' checked={category === 'clothes'} onChange={(e) => setCategory(e.target.value)} />CLOTHES</p>
                    <p onClick={(e) => setCategory('books')} className='text-md'><input type='checkbox' value='books' className='mr-2' checked={category === 'books'} onChange={(e) => setCategory(e.target.value)} />BOOKS</p>
                </div>
                <p onClick={(e) => setCategory('shops')} className='cursor-pointer text-md'><input type='checkbox' value='shops' className='mr-2' checked={category === 'shops'} onChange={(e) => setCategory(e.target.value)} />SHOPS</p>

                {
                    category === 'clothes' ? <div className='flex flex-col gap-2'>
                        <div className='border-gray-500 border-[1px] mr-2  p-3'>
                            <p className='mb-2 text-sm'>CATEGORY</p>
                            <p onClick={() => clothCategory === 'Men' ? setClothCategory(false) : setClothCategory('Men')} className='text-sm cursor-pointer'><input type='checkbox' value='Men' className='mr-2' checked={clothCategory === 'Men'} onChange={() => setClothCategory(
                                clothCategory === "Men"
                                    ? false
                                    : "Men"
                            )} />Men</p>
                            <p onClick={() => clothCategory === 'Women' ? setClothCategory(false) : setClothCategory('Women')} className='text-sm cursor-pointer'><input type='checkbox' value='Women' className='mr-2' checked={clothCategory === 'Women'} onChange={() => setClothCategory(
                                clothCategory === "Women"
                                    ? false
                                    : "Women"
                            )} />Women</p>
                            <p onClick={() => clothCategory === 'Kids' ? setClothCategory(false) : setClothCategory('Kids')} className='text-sm cursor-pointer'><input type='checkbox' value='Kids' className='mr-2' checked={clothCategory === 'Kids'} onChange={() => setClothCategory(
                                clothCategory === "Kids"
                                    ? false
                                    : "Kids"
                            )} />Kids</p>
                        </div>
                        <div className='border-gray-500 border-[1px] mr-2  p-3'>
                            <p className='mb-2 text-sm'>SUB-CATEGORY</p>
                            <p onClick={() => clothSubCategory === 'Topwear' ? setClothSubCategory(false) : setClothSubCategory('Topwear')} className='text-sm cursor-pointer'><input type='checkbox' value='Topwear' className='mr-2' checked={clothSubCategory === 'Topwear'} onChange={() => setClothSubCategory(
                                clothSubCategory === "Topwear"
                                    ? false
                                    : "Topwear"
                            )} />Topwear</p>
                            <p onClick={() => clothSubCategory === 'Bottomwear' ? setClothSubCategory(false) : setClothSubCategory('Bottomwear')} className='text-sm cursor-pointer'><input type='checkbox' value='Bottomwear' className='mr-2' checked={clothSubCategory === 'Bottomwear'} onChange={() => setClothSubCategory(
                                clothSubCategory === "Bottomwear"
                                    ? false
                                    : "Bottomwear"
                            )} />Bottomwear</p>
                            <p onClick={() => clothSubCategory === 'Innerwear' ? setClothSubCategory(false) : setClothSubCategory('Innerwear')} className='text-sm cursor-pointer'><input type='checkbox' value='Innerwear' className='mr-2' checked={clothSubCategory === 'Innerwear'} onChange={() => setClothSubCategory(
                                clothSubCategory === "Innerwear"
                                    ? false
                                    : "Innerwear"
                            )} />Innerwear</p>
                        </div>
                    </div> : category === 'books' ? <div className='border-gray-500 border-[1px] mr-2  p-3 '>
                        <p className='mb-2 text-sm'>CATEGORY</p>
                        <p onClick={() => bookCategory === 'Mythology' ? setBookCategory(false) : setBookCategory('Mythology')} className='text-sm cursor-pointer'><input type='checkbox' value='Mythology' className='mr-2' checked={bookCategory === 'Mythology'} onChange={() => setBookCategory(
                            bookCategory === "Mythology"
                                ? false
                                : "Mythology"
                        )} />Mythology</p>
                        <p onClick={() => bookCategory === 'Story' ? setBookCategory(false) : setBookCategory('Story')} className='text-sm cursor-pointer'><input type='checkbox' value='Story' className='mr-2' checked={bookCategory === 'Story'} onChange={() => setBookCategory(
                            bookCategory === 'Story'
                                ? false
                                : 'Story'
                        )} />Story</p>
                        <p onClick={() => bookCategory === 'Fiction' ? setBookCategory(false) : setBookCategory('Fiction')} className='text-sm cursor-pointer'><input type='checkbox' value='Fiction' className='mr-2' checked={bookCategory === 'Fiction'} onChange={() => setBookCategory(
                            bookCategory === 'Fiction'
                                ? false
                                : 'Fiction'
                        )} />Fiction</p>
                        <p onClick={() => bookCategory === 'Science' ? setBookCategory(false) : setBookCategory('Science')} className='text-sm cursor-pointer'><input type='checkbox' value='Science' className='mr-2' checked={bookCategory === 'Science'} onChange={() => setBookCategory(
                            bookCategory === 'Science'
                                ? false
                                : 'Science'
                        )} />Science</p>
                        <p onClick={() => bookCategory === 'Science Fiction' ? setBookCategory(false) : setBookCategory('Science Fiction')} className='text-sm cursor-pointer'><input type='checkbox' value='Science Fiction' className='mr-2' checked={bookCategory === 'Science Fiction'} onChange={() => setBookCategory(
                            bookCategory === 'Science Fiction'
                                ? false
                                : 'Science Fiction'
                        )} />Science Fiction</p>
                        <p onClick={() => bookCategory === 'Fantacy' ? setBookCategory(false) : setBookCategory('Fantacy')} className='text-sm cursor-pointer'><input type='checkbox' value='Fantacy' className='mr-2' checked={bookCategory === 'Fantacy'} onChange={() => setBookCategory(
                            bookCategory === 'Fantacy'
                                ? false
                                : 'Fantacy'
                        )} />Fantacy</p>
                        <p onClick={() => bookCategory === 'Biography' ? setBookCategory(false) : setBookCategory('Biography')} className='text-sm cursor-pointer'><input type='checkbox' value='Biography' className='mr-2' checked={bookCategory === 'Biography'} onChange={() => setBookCategory(
                            bookCategory === 'Biography'
                                ? false
                                : 'Biography'
                        )} />Biography</p>
                        <p onClick={() => bookCategory === 'History' ? setBookCategory(false) : setBookCategory('History')} className='text-sm cursor-pointer'><input type='checkbox' value='History' className='mr-2' checked={bookCategory === 'History'} onChange={() => setBookCategory(
                            bookCategory === 'History'
                                ? false
                                : 'History'
                        )} />History</p>
                        <p onClick={() => bookCategory === 'Comics' ? setBookCategory(false) : setBookCategory('Comics')} className='text-sm cursor-pointer'><input type='checkbox' value='Comics' className='mr-2' checked={bookCategory === 'Comics'} onChange={() => setBookCategory(
                            bookCategory === 'Comics'
                                ? false
                                : 'Comics'
                        )} />Comics</p>
                        <p onClick={() => bookCategory === 'Business' ? setBookCategory(false) : setBookCategory('Business')} className='text-sm cursor-pointer'><input type='checkbox' value='Business' className='mr-2' checked={bookCategory === 'Business'} onChange={() => setBookCategory(
                            bookCategory === 'Business'
                                ? false
                                : 'Business'
                        )} />Business</p>
                        <p onClick={() => bookCategory === 'Technology' ? setBookCategory(false) : setBookCategory('Technology')} className='text-sm cursor-pointer'><input type='checkbox' value='Technology' className='mr-2' checked={bookCategory === 'Technology'} onChange={() => setBookCategory(
                            bookCategory === 'Technology'
                                ? false
                                : 'Technology'
                        )} />Technology</p>
                        <p onClick={() => bookCategory === 'Horror' ? setBookCategory(false) : setBookCategory('Horror')} className='text-sm cursor-pointer'><input type='checkbox' value='Horror' className='mr-2' checked={bookCategory === 'Horror'} onChange={() => setBookCategory(
                            bookCategory === 'Horror'
                                ? false
                                : 'Horror'
                        )} />Horror</p>
                        <p onClick={() => bookCategory === 'Adventure' ? setBookCategory(false) : setBookCategory('Adventure')} className='text-sm cursor-pointer'><input type='checkbox' value='Adventure' className='mr-2' checked={bookCategory === 'Adventure'} onChange={() => setBookCategory(
                            bookCategory === 'Adventure'
                                ? false
                                : 'Adventure'
                        )} />Adventure</p>
                    </div> : <div className='border-gray-500 border-[1px] mr-2  p-3'>
                        <p className='mb-2 text-sm'>CATEGORY</p>
                        <p onClick={() => shopCategory === 'books' ? setShopCategory(false) : setShopCategory('books')} className='text-sm cursor-pointer'><input type='checkbox' value='books' className='mr-2' checked={shopCategory === 'books'} onChange={() => setShopCategory(
                            shopCategory === "books"
                                ? false
                                : "books"
                        )} />Books</p>
                        <p onClick={() => shopCategory === 'clothes' ? setShopCategory(false) : setShopCategory('clothes')} className='text-sm cursor-pointer'><input type='checkbox' value='clothes' className='mr-2' checked={shopCategory === 'clothes'} onChange={() => setShopCategory(
                            shopCategory === "clothes"
                                ? false
                                : "clothes"
                        )} />Clothes</p>
                    </div>
                }
            </div>
            <div className='ml-[210px] w-[80%] bg-violet-100 pl-2 pb-4'>
                {
                    category === 'books' ? <div className='grid grid-cols-3 gap-2 mx-5 my-4'>
                        {
                            filterBook.map((item, index) => (
                                <div onClick={() => navigate(`${category}/${item._id}`)} key={index} className='h-[440px]   w-[260px] rounded-md shadow-lg hover:translate-y-[-3px] duration-4000 flex flex-col shadow-black/15 mb-3 text-sm hover:cursor-pointer   bg-white'>
                                    <img className='h-[65%] w-full  rounded-tr-md rounded-tl-md' src={item.image} alt="" />
                                    <div className='flex flex-col m-2'>
                                        <p className='mb-1 font-semibold text-black'>{item.name}</p>
                                        <p>{item.title}</p> </div>
                                    <div className='flex flex-row justify-between mt-2'>
                                        <p className='px-2 py-1 ml-3 border border-black rounded-2xl'>&#8377;{item.price}</p>
                                        <button className='px-3 py-1 ml-3 mr-4 font-normal text-black bg-pink-400 border-none rounded-2xl hover:bg-[ink-500'> View</button>
                                    </div>
                                </div>
                            ))
                        }


                    </div> : category === 'clothes' ? <div className='grid grid-cols-3 gap-2 m-4 '>
                        {
                            filterClothes.map((cloth, index) => (
                                <div onClick={() => navigate(`${category}/${cloth._id}`)} key={index} className='h-[440px]   w-[260px] rounded-md shadow-lg hover:translate-y-[-3px] duration-4000 flex flex-col shadow-black/15 mb-3 text-sm hover:cursor-pointer  mr-2 bg-white'>
                                    <img className='h-[65%] w-full rounded-tr-md  rounded-tl-md' src={cloth.image[0]} alt="" />
                                    <div className='flex flex-col m-2'>
                                        <p className='mb-1 font-semibold text-black'>{cloth.name}</p>
                                        <p>{cloth.description}</p> </div>
                                    <div className='flex flex-row justify-between mt-2'>
                                        <p className='px-2 py-1 ml-3 border border-black rounded-2xl'>&#8377;{cloth.price}</p>
                                        <button className='px-3 py-1 ml-3 mr-4 font-normal text-black bg-pink-400 border-none rounded-2xl hover:bg-pink-500'>View</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div> : category === 'shops' ? <div className='grid grid-cols-3 gap-2 mt-2 ml-3 '>

                        {/* Card */}
                        {
                            filterShops.map((item,index)=>(
                             <div key={index} onClick={()=>navigate(`/shops/${item.category}/${item._id}`)} className='overflow-hidden transition-all duration-300 bg-white shadow-md w-[260px] rounded-md hover:shadow-xl h-[380px] mt-2 cursor-pointer mb-1'>

                            <img
                                src={item.image}
                                alt=""
                                className='object-cover w-full h-60'
                            />

                            <div className='flex flex-col gap-3 px-5 mt-2'>

                                
                                    <p className='text-xl font-semibold'>
                                        {item.name}
                                    </p>

                                   
                                
                                <div>
                                    <p className='text-sm text-gray-500'>
                                    {item.address.one}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {item.address.two}
                                </p>
                                </div>
                                

                                <div className='flex items-center justify-between text-sm text-gray-700'>
                                    <p>+91 {item.contact}</p>

                                     <span className='px-3 py-1 text-xs text-green-600 bg-green-100 rounded-full'>
                                        Active
                                    </span>
                                </div>

                            </div>
                        </div>
                            ))
                        }
                        </div>
                        : " "
                }
                    </div>
        </div>
            )
}

            export default AllProducts
