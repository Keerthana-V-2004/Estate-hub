
import { useSelector } from 'react-redux';
import { useRef , useState, useEffect} from 'react';

export default function Profile() {
  const fileRef =useRef();

  const currentUser = useSelector((state) => state.user.currentUser);

  const [file, setFile] = useState(null);
  const  [avatar, setAvatar] = useState(currentUser.avatar);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if(file){
      uploadImage();
    }
  },[file]);

  const uploadImage = async () => {
    try {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: reader.result,
          }),
        });

        const data = await res.json();
        console.log("upload status",res.status);
        console.log("upload res",data);

        if(!res.ok){
          console.log("upload failed");
          return;
        }
        

        setAvatar(data.url);

        setFormData((prev) => ({
          ...prev,
          avatar: data.url,
        }));
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  console.log("submitting",formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {    
      const res = await fetch('/api/user/update',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false){
    console.log(data.message);
    return;
    }
    console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  return (
    <div className='p-3 max-w-lg mx-auto'> 
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

    <form className='gap-4 flex flex-col' onSubmit={handleSubmit}>

      <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>

       <img src={avatar} alt='avatar' className='w-24 h-24 rounded-full object-cover mx-auto mb-5 cursor-pointer self-center'
       onClick={() => fileRef.current.click()}/>

       <input onChange={handleChange} type='text' placeholder='username' id='username' className='w-full p-3 rounded-lg mb-4 focus:outline-none' readOnly/>
       
       <input onChange={handleChange} type='email' placeholder='email' 
       id='email'  className='w-full p-3 rounded-lg  mb-4 focus:outline-none' readOnly/> 

       <input onChange={handleChange} type='email' placeholder='password' 
       id='password'className='w-full p-3 rounded-lg  mb-4 focus:outline-none' readOnly/>  

       <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>

       <div className='justify-between flex'>
        <span className='text-red-700 cursor-pointer '>Delete account</span>
        <span className='text-red-700 cursor-pointer '>Log out</span>
        </div>

    </form>

    </div>
    
  );
}
