import React, { useState } from 'react';
import axios from 'axios'
const Dashboard = () => {
  

    const [formData, setFormData] = useState({
        logoName: '',
        logoImage: null,
        brandDescription: '',
        cardFront:null,
        cardBack:null,
        logoWithoutBackground: null,
        shapes: [],
    color: ''
    });

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleFileChange = (event) => {

       
         if (event.target.name === 'shapes') {
        setFormData({ ...formData, shapes: [...event.target.files] });
    } else {
        setFormData({ ...formData, [event.target.name]: event.target.files[0] });
    }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData();
        form.append('logoName', formData.logoName);
        form.append('logoImage', formData.logoImage);
        form.append('brandDescription', formData.brandDescription);
        form.append('logoWithoutBackground', formData.logoWithoutBackground);
       
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
        const form = new FormData();
              form.append('price', formData.price);
        form.append('cardFront', formData.cardFront);
       form.append('cardBack', formData.cardBack);
        try {
            const response = await axios.post('http://localhost:3001/submit-card', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form submitted successfully', response.data);
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

   const handleCustomCardSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    
    formData.shapes.forEach((file, index) => form.append(`shapes[${index}]`, file));
     form.append('color', formData.color)

    try {
        const response = await axios.post('http://localhost:3001/submit-custom-card', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Custom card form submitted successfully', response.data);
    } catch (error) {
        console.error('Error submitting custom card form', error);
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
                    <label htmlFor="cardFront" className="block text-gray-700 text-md font-bold mb-2">card front</label>
                    <input type="file" id="cardFront" name="cardFront" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
                </div>
                <div className="mb-5">
                    <label htmlFor="cardBack" className="block text-gray-700 text-md font-bold mb-2">card back</label>
                    <input type="file" id="cardBack" name="cardBack" onChange={handleFileChange} className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
                </div>
                <div className="mb-5">
                    <label htmlFor="Price" className="block text-gray-700 text-md font-bold mb-2">price</label>
                    <input type="text" id="Price" name="Price" onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                
                    <button type="submit" className="bg-secondary-500 hover:bg-rose-500 text-white font-bold py-2 w-full  px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </form>
            </div>
            <div className='grid gap-8 border-2 border-black mt-10  py-10 px-10'>                                                                                                                                          
          <form onSubmit={handleCustomCardSubmit}>
    <div className="mb-5">
        <label htmlFor="colors" className="block text-gray-700 text-md font-bold mb-2">Colors</label>
        <input type="color" id="colors" name="color" onChange={handleInputChange} />
    </div>
    <div className="mb-5">
        <label htmlFor="shapes" className="block text-gray-700 text-md font-bold mb-2">Shapes</label>
        <input type="file" id="shapes" name="shapes" onChange={handleFileChange} multiple className="w-full text-md text-gray-700 py-1 px-2 border rounded" />
    </div>
    <button type="submit" className="bg-secondary-500 hover:bg-rose-500 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Submit
    </button>
</form>
</div>
        </div>
      
    );
};

export default Dashboard;
