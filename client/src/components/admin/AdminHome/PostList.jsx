import React, { useEffect, useState } from 'react'
import { blockUserPost, getReportDetails, reportedPosts, unblockUserPost } from '../../../api/AdminRequests'
import moment from "moment"
import { ToastContainer, toast } from 'react-toastify';  //Toast
import 'react-toastify/dist/ReactToastify.css';  //Toast Css


function PostList() {
  const [Posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({})
  const [reportData, setreportData] = useState([])
  const [update,setUpdate] = useState(false)

  useEffect(() => {
    reported()
  }, [update])

  const reported = async () => {
    const { data } = await reportedPosts()
    setPosts(data)
  }
  const handleView = async (post) => {
    setModalData(post)
    setShowModal(true)
    try {
      const { data } = await getReportDetails(post._id)
      setreportData(data)
    } catch (error) {
      console.log(error);
    }
  }

  // HANDLE BLOCK POST 

  const handleBlockPost = async (postId) => {
    console.log(postId, 'pppiddd');
    try {
      const { data } = await blockUserPost(postId)
      console.log(data, 'block res');
      setUpdate(!update)
      setShowModal(false)
      setreportData()
      toast.warn(data.message)
    } catch (error) {
      console.log(error);
    }
  }

  // UNBLOCK POST 

  const handleUnblockPost = async (postId) => {
    try {
      const { data } = await unblockUserPost(postId)
      console.log(data, 'block res');
      setreportData()
      setUpdate(!update)
      setShowModal(false)
      toast.warn(data.message)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(Posts);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    POST ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    POSTED BY
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    CREATED AT
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    STATUS
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    No of Reports
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Posts.map((post) => {
                  let date = moment(post?.Created).format("YYYY-MM-DD")
                  return (
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {post?._id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {post?.userId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <a
                          className="text-green-500 hover:text-green-700"
                          href="#"
                        >
                          {post?.reportdedStatus ? "Disabled" : "Active"}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">

                        {post?.reporterID?.length}

                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          className="text-blue-500 hover:text-blue-700 border-2 p-1 rounded-lg"
                          type='button'
                          onClick={() => handleView(post)}

                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })}


              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
        <>

          {showModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-lg">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Details
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative px-6 flex-auto">
                      {modalData.image ?
                        <div className="flex justify-center">
                          <img className="min-w-[150px] min-h-[100px]" src={`/images/${modalData.image}`} />
                        </div>
                        : null}
                      {/* <p className="my-2 text-slate-500  text-md leading-relaxed">
                        Description: {modalData.description}
                      </p> */}
                      <p>
                        No.of Reports : {modalData?.reports?.length}
                      </p>

                      <div className="overflow-y-auto max-h-32">
                        <table class=' text-xs border rounded-lg my-2 w-80  text-gray-500  text-center'>
                          <thead class='text-xs text-gray-700 uppercase bg-gray-100'>
                            <tr>
                              <th>Report By</th>
                              <th>Reported At</th>
                              <th>Reason</th>
                            </tr>
                          </thead>
                          <tbody className="">
                            {reportData?.map((data) => {
                              let reportedOn = moment(data?.createdAt).format("YYYY-MM-DD")
                              return (
                                <tr className="text-sm">
                                  <td>{data?.userId.UserName}</td>
                                  <td>{reportedOn}</td>
                                  <td>{data?.reportReason}</td>
                                </tr>

                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      
                      {modalData.reportdedStatus !=true ? <button
                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleBlockPost(modalData._id)}
                      >
                        Block Post
                      </button> : <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleUnblockPost(modalData._id)}
                      >
                        Unblock Post
                      </button>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>
      </div>
    </div>
  )
}

export default PostList