import axios from "axios";

export const imageUpload = async imageUrl =>{
	const formData = new FormData();
	// console.log(formData);
	formData.append('image', imageUrl);

	const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
	// console.log(formData);

	return data.data.display_url;
}