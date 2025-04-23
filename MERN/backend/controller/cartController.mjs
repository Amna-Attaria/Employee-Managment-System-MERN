export const getCart=(req,res)=>{
    console.log(req.user)
    res.status(200).json({
        message: "cart data fetched successfully",
        success:true
    })
}