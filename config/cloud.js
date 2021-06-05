const cloudinary = require('cloudinary').v2


cloudinary.config({ 
    cloud_name: 'beproject', 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});


exports.cloud = async (req, res) => {

	// console.log(req.body)
	// console.log(req.files)

	// //move to local file system
	// const fileName = req.files.myData.name
	// await req.files.myData.mv(`./uploads/${fileName}`)

	// // upload to cloudinary
	// const moved = await cloudinary.uploader.upload(`./uploads/${fileName}`)
	// const uploadFile = await fs.unlink(`./uploads/${fileName}`)

	// console.log(moved, uploadFile)
	// console.log("removed")

	try {
		
		const bas64FormattedString = await base64.encode(req.files.myData.data)
		// res.json({
		// 	data: req.files.myData,
		// 	data2: req.files.myData.data,
		// 	string: bas64FormattedString
		// })
		// res.send(bas64FormattedString)

		// const uploadFile = await cloudinary.uploader.upload(bas64FormattedString)
		const uploadFile = await cloudinary.uploader.upload(`data:${req.files.myData.mimetype};base64,${bas64FormattedString}`)
		// res.json({
		// 	success: true,
		// 	json: uploadFile
		// })
		res.send({"success": true})
	} catch (error) {
		console.log(error)
		
	}


}