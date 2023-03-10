import React, { useContext, useEffect, useState } from 'react'
import myPic from '../../../assets/myPic.jpg'
import { BsFillHeartFill, BsFillShareFill, BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import { MdReport, MdModeEditOutline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import axios from '../../../Axios/axios'
import { format, render, cancel, register } from 'timeago.js';
import jwtdecode from "jwt-decode"
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import { deletepost, editUserPost, reportPost, updatePost } from '../../../api/UserRequest'
import { useSelector } from 'react-redux'
import { socket, SocketContext } from '../../../Context/SocketContext'
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Feed() {
    AOS.init()
    // useEffect(() => {
    //     AOS.init({ duration: 200 });

    // }, []);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const navigate = useNavigate()
    const user = useSelector((state) => state.User)

    let userDetails = localStorage.getItem("Usertoken") ? jwtdecode(localStorage.getItem("Usertoken")) : ''

    // const socket = useContext(SocketContext)

    const [feed, setFeed] = useState([])
    const [CommentSection, setCommentSection] = useState({ status: false, postId: '' })
    const [Comment, setComment] = useState({ postId: '', Comment: "", userId: '' })
    const [ViewAllComment, setViewAllComment] = useState([])
    const [deleteModal, setdeleteModal] = useState({ postId: '', status: false });
    const [editModal, seteditModal] = useState({ postId: '', status: false, description: '', image: "", likes: [] });
    const [reportModal, setreportModal] = useState({ postId: '', status: false });
    const [Postedit, setPostedit] = useState()
    const [reason, setReason] = useState('')
    useEffect(() => {
        getPost()
    }, [])
    const getPost = () => {
        axios.get(`/getPost/${userDetails.id}`, {
            headers: {
                "x-access-token": localStorage.getItem("Usertoken"),
            },
        }).then((response) => {
            if (response.data.result) {
                console.log(response.data.feed);
                setFeed(response.data.feed)

            } else {
                console.log("something went wrong");
            }
        })
    }

    const likes = (postID, userId) => {
        let data = {
            postid: postID,
            userId: userDetails.id
        }
        axios.post('/likes', data, {
            headers: {
                "x-access-token": localStorage.getItem("Usertoken"),
            },
        }).then((response) => {
            getPost()
            if (response.data.liked) {
                socket.emit('send-notification', {
                    senderId: userDetails.id,
                    receiverId: userId,
                    description: "Liked Your Post"

                })
            }
        })
    }

    const showComments = (postID) => {
        console.log('mj');
        axios.get(`/getComments?postId=${postID}`, {
            headers: {
                "x-access-token": localStorage.getItem("Usertoken"),
            },
        }).then((response) => {
            console.log(response.data);
            setViewAllComment(response.data.Comments)
        })
    }

    const showComment = (postID) => {
        console.log('mj');
        showComments(postID)
        setCommentSection({
            status: !CommentSection.status,
            postId: postID
        })
    }
    const handleChange = (e, postId) => {

        console.log(postId);
        console.log(e.target.value);
        setComment({
            ...Comment,
            postId: postId,
            Comment: e.target.value,
            userId: userDetails.id
        })

    }
    const postComment = (id) => {
        console.log(id, "njnjnbjhb");
        axios.post(`/postComment/${id}`, Comment, {
            headers: {
                "x-access-token": localStorage.getItem("Usertoken"),
            },
        }).then((response) => {

            if (response.data) {
                socket.emit('send-notification', {
                    senderId: userDetails.id,
                    receiverId: id,
                    description: "Commented Your Post"

                })
            }

            console.log(response);
            showComments(Comment.postId)
            setComment({
                ...Comment,
                postId: '',
                Comment: '',
                userId: ''
            })

        })
    }
    const deletePost = async (postId) => {

        const { data } = await deletepost(postId)
        if (data) {
            getPost()
            setdeleteModal({ status: false })
        }

    }
    // const reportPost = async (postId) => {
    //     console.log(postId);

    // }
    const handleBlock = async () => {
        console.log(reportModal.postId, reason, userDetails.id);
        const items = {
            postId: reportModal.postId,
            reason: reason,
            userId: userDetails.id
        }
        const { data } = await reportPost(items)
        setreportModal({ status: false })

    }
    const editPost = async (postId) => {
        console.log(postId, "editcheyyAnayt");
        const { data } = await editUserPost(postId)
        console.log(data, "0id9ud");
        seteditModal({ postId: data._id, status: true, image: data.image, likes: data.likes, description: data.description })
        // initial = data.description
        setPostedit(data.description)
    }

    const handleChangee = (e) => {
        console.log("handlechange ann");
        setPostedit(e.target.value)
    }
    console.log(Postedit, "editbhbhhwbh");
    const Update = async (id) => {

        const updation = {
            desc: Postedit,
            postId: id
        }
        const { data } = await updatePost(updation)
        console.log(data, "hhhhh");

        if (data) {
            seteditModal({ status: false })
            getPost()

        }
    }
    return (
        < >
            <div className=' overflow-y-scroll h-[89vh]  overflow-hidden scrollbar-hide    '>

                {
                    feed.map((post, index) => {
                        return (

                            <div className='bg-[#1f354d] p-2 rounded-lg  shadow-light w-full mb-4 max-w-[40rem] ' >
                                {/* <Link className='flex items-center cursor-pointer hover:bg-white rounded-lg p-3' key={index}
                                to={`${item._id != userDetails.id ? "/searchProfile" : "/userProfile"}`} state={{ user: item }}
                                onClick={() => { setSearchModal(false) }}>
                                <div className='h-[40px] w-[40px] bg-gray-600 rounded-full mr-3'>

                                    {
                                        item.image &&
                                        <img className="h-full w-full object-cover rounded-full" src={PF + item.image} alt="" />
                                    }
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-bold	'>
                                        {item.UserName}
                                    </p>

                                </div>
                            </Link> */}
                                <div className="flex justify-between">
                                    <Link className='flex my-3 pb-3 ' key={index}
                                        to={`${post.userId._id != userDetails.id ? "/searchProfile" : "/userProfile"}`} state={{ user: post.userId }} >
                                        <div>
                                            <div className='rounded-full  relative w-[50px] h-[50px]'>
                                                {
                                                    post.userId.image ?
                                                        <img src={PF + post.userId.image} className='rounded-full object-cover w-full h-full ' alt="" />
                                                        :
                                                        <img src={'https://imgs.search.brave.com/d0IIb0RSYo0SCzA8yldT5UCB9IByR7XvhKjLrb6F-Zc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC53/UnR2T05fOEpLUlFn/aGRST3c1UXZRSGFI/YSZwaWQ9QXBp'} alt="ProfileImage" className="rounded-full object-cover w-full h-full " />
                                                }

                                            </div>
                                        </div>
                                        <div className='ml-6 '>
                                            <h2 className='text-[14px] font-semibold text-white'>{post.userId.UserName}</h2>
                                            <p className='text-[10px] text-slate-300'>{format(post.Created)}</p>
                                        </div>
                                        <div className='ml-2 p-1'>
                                            <p className='text-[12px] text-slate-300'>{post.userId.email}</p>

                                        </div>

                                    </Link>
                                    {/* <div className=' flex'> */}
                                    {/* <button className='justify-end text-white' ><BsThreeDotsVertical/></button> */}

                                    {/* </div> */}
                                    <div class="relative hover-trigger text-white">
                                        <BsThreeDotsVertical />
                                        <div class="absolute bg-gray-400 border border-grey-100 px-3 py-1 hover-target right-3 rounded-md">
                                            {
                                                post.userId._id == userDetails.id ?
                                                    <>
                                                        < button className='text-red-600 text-lg' onClick={() => setdeleteModal({ postId: post._id, status: true })}> <AiTwotoneDelete /> </button>
                                                        < button className='text-green-600 text-lg' onClick={() => editPost(post._id)}> <MdModeEditOutline /> </button>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            !post.reporterID?.includes(userDetails.id) ?
                                                                < button className='text-red-600 text-lg ' onClick={() => setreportModal({ postId: post._id, status: true })}> <MdReport /> </button>
                                                                : <h2 className='text-red-600'>Reported</h2>
                                                        }</>
                                            }

                                        </div>
                                    </div>


                                </div>
                                <div className='object-contain '>
                                    <img src={PF+post.image} alt="" className='rounded-lg object-cover w-full  h-[500px] border-4 border-spacing-3 border-[#50809b]' />
                                </div>
                                <div className='p-2 max-w-[40rem]'>
                                    <p className='text-[#A0ADB4]  text-base	truncate'>{post.description}</p>
                                </div>
                                <div className='flex gap-3 p-3'>
                                    <div className='flex'>

                                        <button className='bg-[#274055] rounded-lg text-white p-1 flex gap-1 items-center' onClick={() => likes(post._id, post.userId._id)}> <p className=''>{post.Likes.length}</p> <BsFillHeartFill className={` ${post.Likes.includes(userDetails.id) ? " text-red-600" : "text-white"}  `} /></button>
                                    </div>
                                    <button className='bg-[#274055] rounded-lg text-white p-1 ' onClick={() => showComment(post._id)}><FaRegCommentDots className={` flex  text-white  items-center `} /></button>
                                    <button className='bg-[#274055] rounded-lg text-white p-1 '><BsFillShareFill className='flex text-white  items-center' /></button>
                                </div>
                                {
                                    CommentSection.status && CommentSection.postId == post._id ?
                                        <div className=' '>
                                            <div className='max-h-[12rem] overflow-y-scroll scrollbar-hide'>
                                                {
                                                    ViewAllComment.map((comment, index) => {
                                                        return (
                                                            <div className='flex mb-3 '>
                                                                <div className='flex rounded-full  min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px]'>
                                                                    <img src={comment.userId.image ? `/images/${comment.userId.image}` : `https://randomuser.me/api/portraits/lego/0.jpg`} className='rounded-full object-cover w-full h-full ' alt="" />
                                                                </div>
                                                                <div className='ml-5  gap-3 items-center'>
                                                                    <h2 className='text-[14px] font-semibold text-white'>{comment.userId.UserName}  	&nbsp; <span className='text-[10px] text-gray-400'>{format(comment.created)}</span></h2>
                                                                    <span className='text-[13px] text-gray-400'>{comment.Comment}</span>
                                                                </div>
                                                            </div>


                                                        )
                                                    })
                                                }
                                            </div>



                                            <div className='flex w-full '>
                                                <div className=' rounded-full  w-[50px] h-[50px] z-20'>
                                                    <img src={user.image ? `/images/${user.image}` : `https://randomuser.me/api/portraits/lego/0.jpg`} className='rounded-full object-cover w-full h-full ' alt="" />
                                                    {/* <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div> */}

                                                </div>
                                                <div className='flex w-full border-2 gap-2 rounded-lg border-gray-400 ml-[-25px] '>
                                                    <input name="Caption" id="" className='w-full h-10 p-3 bg-transparent pl-8' value={Comment.Comment} onChange={(e) => handleChange(e, post._id)} />
                                                    {
                                                        Comment.Comment != '' ?
                                                            <button className=' text-white pr-2 hover:text-gray-500 ' onClick={() => postComment(post.userId._id)}  >Post</button>
                                                            : null
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                        : null


                                }

                            </div>

                        )
                    })
                }




                {
                    deleteModal.status ?
                        (
                            <>
                                <div class=" flex-col space-y-4 min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none   ">

                                    <div class="flex flex-col p-8 bg-gray-800 shadow-md hover:shodow-lg rounded-2xl">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="w-16 h-16 rounded-2xl p-3 border border-gray-800 text-blue-400 bg-gray-900" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <div class="flex flex-col ml-3">
                                                    <div class="font-medium leading-none text-gray-100">Delete Your Post ?</div>
                                                    <p class="text-sm text-gray-500 leading-none mt-1">By deleting your Post  you will lose your all data
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='flex justify-center'>
                                            <button class="flex-no-shrink w-1/3 bg-green-500 px-5  ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-500 text-white rounded-full" onClick={() => setdeleteModal({ status: false })}>Cancel</button>
                                            <button class="flex-no-shrink w-1/3 bg-red-500 px-5  ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full" onClick={() => deletePost(deleteModal.postId)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

                            </>
                        )
                        : null
                }

                {reportModal.status ?
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-sm">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex gap-3  justify-between items-center p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-md text-black font-semibold inline">
                                            Why are you reporting this post?
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => {
                                                setreportModal({ status: false })
                                                setReason(null)
                                            }}
                                        >
                                            <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ??
                                            </span>
                                        </button>
                                    </div>

                                    <div className='flex flex-col m-2 justify-center  gap-3 max-h-50 overflow-y-auto no-scrollbar'>
                                        <div className="px-3">
                                            <input type="radio" required className="mr-2" value="It's spam" name="reason" onChange={(e) => setReason(e.target.value)} />
                                            <label htmlFor="reason">It's spam</label>
                                        </div>
                                        <div className="px-3">
                                            <input type="radio" className="mr-2" name="reason" value="I just don't like it" onChange={(e) => setReason(e.target.value)} />
                                            <label htmlFor="reason">I just don't like it</label>
                                        </div>
                                        <div className="px-3">
                                            <input type="radio" className="mr-2" name="reason" value='false Information' onChange={(e) => setReason(e.target.value)} />
                                            <label htmlFor="reason">false Information</label>
                                        </div>
                                        <div className="px-3">
                                            <input type="radio" className="mr-2" name="reason" value='Scam or Fraud' onChange={(e) => setReason(e.target.value)} />
                                            <label htmlFor="reason">Scam or Fraud</label>
                                        </div>
                                        <div className="px-3">
                                            <input type="radio" className="mr-2" name="reason" value='Hate speech or symbols' onChange={(e) => setReason(e.target.value)} />
                                            <label htmlFor="reason">Hate speech or symbols</label>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-gray-500 background-transparent font-bold uppercase px-6  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                setreportModal({ status: false })
                                                setReason(null)
                                            }}
                                        >
                                            Close
                                        </button>
                                        <button class="bg-cyan-600 hover:bg-red-400 text-white font-bold py-1 px-4 rounded inline-flex items-center disabled:bg-cyan-100"
                                            onClick={handleBlock} disabled={!reason}>
                                            <span>Submit</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </> : null}

                {
                    editModal.status ?
                        (
                            <>
                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                        <div className="border-0 rounded-lg  shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">


                                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none" id="modal">
                                                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                                                    <div className="relative pt-2 bg-transparent   ">

                                                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4"></h1>
                                                        <div className=' w-full  rounded-lg flex flex-col  border-slate-200 border shadow-md  '>

                                                            <div className='flex flex-col items-center  rounded-lg'>
                                                                <div className='flex flex-col   w-full'>
                                                                    <div className='p-2 bg-[#1f354d] rounded-t-lg   border-slate-200 border-t shadow-md'>
                                                                        <div className='flex items-center space-x-2'>

                                                                            <img src={user?.image ? `/images/${user.image}` : "https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp"} className='rounded-full w-10 h-10' alt="" />
                                                                            <div>
                                                                                <p className='font-medium text-white'>{user.UserName}</p>

                                                                                <div className='flex justify-center items-center pt-1 gap-2'>
                                                                                    {/* <input className='text-sm w-80 h-10 bg-gray-500 rounded-sm p-2 text-gray-100' value={Postedit} onChange={handleChangee} /> */}
                                                                                    <textarea name="Caption" id="" className='text-sm w-80 h-20 bg-gray-500 rounded-sm p-2 text-gray-100 scrollbar-hide' value={Postedit} placeholder="Enter ur Caption" ></textarea>
                                                                                    <button type="button" class="items-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm p-2 text-center mr-2 mb-2" onClick={() => Update(editModal.postId)}>Update</button>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='relative w-full pb-3 rounded-b-lg  bg-[#1f354d] '>
                                                                        <img className='object-contain w-[500px] h-[300px] rounded-lg' alt="" src={`/images/${editModal.image}`} />
                                                                    </div>

                                                                    {/* <div className='flex justify-between rounded-b-2xl items-center  bg-white  text-gray-400 border-t '>
                                                                        <div className='w-20  flex justify-between items-center space-x-4 p-2'>
                                                                            <div className='text-2xl flex text-slate-900 hover:cursor-pointer '   >


                                                                                <span className='text-lg ml-2'></span>

                                                                            </div>
                                                                            <div className='text-xl flex text-slate-900 cursor-pointer ' >
                                                                                <div className='py-1'>
                                                                                    jnj
                                                                                </div>


                                                                                <span className='ml-2 text-lg'>nz</span>

                                                                            </div>
                                                                            <div className='text-xl'> zzz</div>

                                                                        </div>
                                                                        <div className='text-xl p-2 '>nzbz</div>
                                                                    </div> */}



                                                                    {/* <div className='flex flex-col '>
                                                                        <div className=' max-h-32 overflow-auto scrollbar-hide rounded-b-2xl border-slate-200  shadow-md' >




                                                                            <div className="flex gap-3 py-2 pl-3 items-center bg-white">
                                                                                <div>

                                                                                    <img src={user?.image ? `/images/${user.image}` : "https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp"} className='rounded-full' width={30} height={30} alt="" />
                                                                                </div>
                                                                                <div>
                                                                                    <div>
                                                                                        <span className="font-medium text-sm mr-2">zzz</span>
                                                                                        <span className="">zzz</span>
                                                                                    </div>
                                                                                    <p className="text-slate-500 text-xs ">  bba</p>
                                                                                </div>
                                                                            </div>





                                                                        </div>


                                                                    </div> */}


                                                                </div>
                                                            </div>

                                                        </div>
                                                        <button className="cursor-pointer absolute top-0 right-0 mt-8   mr-5 text-white hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={() => seteditModal({ status: false })}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                                <line x1="6" y1="6" x2="18" y2="18" />
                                                            </svg>
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>

                        ) : null
                }



            </div>
        </>
    )
}

export default Feed