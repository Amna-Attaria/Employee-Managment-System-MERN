import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
		description: {
			type: String,
			trim: true,
		},


		price: {
			type: Number,
			required: true,
        },
        image: {
            type: String,
            required: true,
        }
	,
		
	},
);


export default mongoose.model('Product', ProductSchema);