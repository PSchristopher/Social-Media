import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { follow, suggestion } from '../../../api/UserRequest'
function RsideBar() {
    const userData = useSelector(state => state.User)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [state, setstate] = useState(false)
    const [suggestData, setsuggestData] = useState([])

    useEffect(() => {
        suggestion(userData?._id).then((response) => {
            setsuggestData(response.data)
        })
    }, [state])

    const handleFollow = async (Id) => {

        const data = {
            userId: userData._id,
            friendsId: Id
        }
        try {
            const result = await follow(data)
            console.log(result);
            if (result) {
                setstate(!state)
            }

        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <div className='container bg-[#1f354d] p-5 rounded-lg shadow-light w-full' >
            <h1 className='font-semibold text-white'>Suggested For You</h1>
            {
                suggestData.length !== 0 ?
                    suggestData.map((data) => {
                        console.log(data, "jjjj");
                        return (


                            <div className='flex justify-between my-3 pt-3'>
                                <div className=' '>
                                    <div className='rounded-full  relative w-[50px] h-[50px]'>
                                        <img src={PF + data.image } className='rounded-full object-cover w-full h-full ' alt={data.image} />
                                    </div>
                                </div>
                                <div className=' '>
                                    <h2 className='text-[14px] font-semibold text-white'>{data.UserName}</h2>
                                    <p className='text-[10px] text-slate-300'>{data.email}</p>
                                </div>
                                <div className=' '>
                                    <button className='text-[14px] font-semibold  text-white float-right cursor-pointer bg-blue-600 rounded-2xl p-1 pr-3 pl-3 ' onClick={(e) => handleFollow(data._id)}>Follow</button>
                                </div>
                            </div>
                        )
                    })
                    : <div className="flex flex-col items-center gap-2">
                        <p>Connect with more People.</p>
                        <img className="w-20 opacity-60" ></img>
                        <p className="text-xs">No suggestions available ....</p>
                    </div>
            }


        </div>
    )
}

export default RsideBar