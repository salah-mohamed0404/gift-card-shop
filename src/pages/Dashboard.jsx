import React, { useState } from 'react';
import axios from 'axios'
const Dashboard = () => {
  

    const [formData, setFormData] = useState({
        logoName: '',
        logoImage: null,
        brandDescription: '',
        logoWithoutBackground: null
    });

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleFileChange = (event) => {

        console.log(event.target.files[0])
        setFormData({ ...formData, [event.target.name]: event.target.files[0] });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append('logoName', formData.logoName);
        form.append('logoImage', formData.logoImage);
        form.append('brandDescription', formData.brandDescription);
        form.append('logoWithoutBackground', formData.logoWithoutBackground);
        console.log(form)
        try {
            const response = await axios.post('http://localhost:3001/submit-form', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form submitted successfully', response.data);
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };



    const handleSubmitCards = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('logoName', formData.logoName);
        formData.append('logoImage', formData.logoImage);
        formData.append('brandDescription', formData.brandDescription);
        formData.append('logoWithoutBackground', formData.logoWithoutBackground);

        try {
            await axios.post('http://localhost:5000/submit-form', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    const handleCustomCard = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('logoName', formData.logoName);
        formData.append('logoImage', formData.logoImage);
        formData.append('brandDescription', formData.brandDescription);
        formData.append('logoWithoutBackground', formData.logoWithoutBackground);

        try {
            await axios.post('http://localhost:5000/submit-form', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form submitted successfully');
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };


    return (

        <div className="container mx-auto   px-4 py-[200px]">
            <div className="grid gap-8 border-2 border-black py-10 px-10">
                <form onSubmit={handleSubmit} >
            <div className="mb-5">
                <label htmlFor="logoName" className="block text-gray-700 text-md font-bold mb-2">Logo Name Brand</label>
                <input type="text" id="logoName" name="logoName" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-5">
                <label htmlFor="logoImage" className="block text-gray-700 text-md font-bold mb-2">Logo Image</label>
                        <input type="file" id="logoImage" name="logoImage" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
            </div>
            <div className="mb-5">
                <label htmlFor="brandDescription" className="block text-gray-700 text-md font-bold mb-2">Brand Description</label>
                <textarea id="brandDescription" name="brandDescription" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-5">
                <label htmlFor="logoWithoutBackground" className="block text-gray-700 text-md font-bold mb-2">Logo Without Background</label>
                        <input type="file" id="logoWithoutBackground" name="logoWithoutBackground" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
            </div>
                    <button type="submit" className="bg-secondary-500 hover:bg-rose-500 text-white font-bold w-full  py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
            </button>
        </form>
        </div>
            <div className='grid gap-8 border-2 mt-10  border-black py-10 px-10'>     
        <form onSubmit={handleSubmitCards}>
                <div className="mb-5">
                    <label htmlFor="logoWithoutBackground" className="block text-gray-700 text-md font-bold mb-2">card front</label>
                    <input type="file" id="logoWithoutBackground" name="logoWithoutBackground" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
                </div>
                <div className="mb-5">
                    <label htmlFor="logoWithoutBackground" className="block text-gray-700 text-md font-bold mb-2">card back</label>
                    <input type="file" id="logoWithoutBackground" name="logoWithoutBackground" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
                </div>
                <div className="mb-5">
                    <label htmlFor="logoWithoutBackground" className="block text-gray-700 text-md font-bold mb-2">price</label>
                    <input type="text" id="logoName" name="logoName" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                
                    <button type="submit" className="bg-secondary-500 hover:bg-rose-500 text-white font-bold py-2 w-full  px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </form>
            </div>
            <div className='grid gap-8 border-2 border-black mt-10  py-10 px-10'>                                                                                                                                          
            <form onSubmit={handleCustomCard}>
                <div className="mb-5">
                    <label htmlFor="logoWithoutBackground" className="block text-gray-700 text-md font-bold mb-2">colors</label>
                    <input type="color" />
                </div>
                <div className="mb-5">
                    <label htmlFor="logoWithoutBackground" className="block text-gray-700 text-md font-bold mb-2">shapes</label>
                    <input type="file" id="shape" name="logoWithoutBackground" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
                </div>
               
                    <button type="submit" className="bg-secondary-500 hover:bg-rose-500 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-secondary-500">
                    Submit
                </button>
            </form>
</div>
        </div>
      
    );
};

export default Dashboard;
