import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imageUpload } from '../../../api/utils';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddPlant = () => {

  const { user } = useAuth();
  const [uploadImage, setUploadImage] = useState({image: {name: 'Upload button'},});
  const [ loading, setLoading ] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    //save seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    const plantData = {
      name,
      description,
      category,
      price,
      quantity,
      image: imageUrl,
      seller,
    };

    console.table(plantData);
  
    try{
      await axiosSecure.post(`/plants`,  plantData)
      toast.success('data save to successfully')
    }catch(err){
      toast.error(err.message)
      console.log(err);
    }finally{
      setLoading(false);
    } 
  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm 
      handleSubmit={handleSubmit}
      uploadImage={uploadImage}
      setUploadImage={setUploadImage}
      loading={loading}
      />
    </div>
  )
}

export default AddPlant
