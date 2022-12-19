import axios from "../Axios/axios"

export const reportedPosts = () => axios.get('/admin/reported')

export const getReportDetails = (postId) => axios.get(`/admin/reporteddetails/${postId}`)

export const blockUserPost = (postId) => axios.put(`/admin/block_Post/${postId}`)

export const unblockUserPost = (postId) => axios.put(`/admin/unblock_Post/${postId}`)