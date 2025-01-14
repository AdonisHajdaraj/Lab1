import React, { useState } from 'react'
import '../styles/contactus.css'
import contactimg from '../assets/img-01.png'

const Contactus = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        message:'',
    });

const [errors, setErrors] = useState({})
const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData, [name] : value
    })
}

const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, message } = formData;
    const errors = {};
    if(!name.trim()){
        validationErrors.name = "Plotesoni emrin dhe mbiemrin";
    }else if(!isValidEmail(email)) {
        errors.email = 'Shkruaj nje email te vlefshem';
    }
    if(!message.trim()) {
        errors.message = 'Shkruaj mesazhin';
    }

    if(Object.keys(errors).length === 0) {
        console.log('Forma u dergua me sukses', formData);
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    } else{
        setErrors(errors);
    }   

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
  return (
    <div>
        <form onSubmit={handleSubmit}>
      <div class="contact1">
		<div class="container-contact1">
			<div class="contact1-pic js-tilt" data-tilt>
				<img src={contactimg} alt="IMG"/>
			</div>

			<form class="contact1-form validate-form">
				<span class="contact1-form-title">
					CONTACT FORM
				</span>

				<div class="wrap-input1 validate-input" data-validate = "Name is required">
					<input class="input1" type="text" name="name" placeholder="Emri & Mbiemri" value={formData.name} onChange={handleChange}/>
                    {errors.name && <div className='error'>{errors.name}</div>}
					<span class="shadow-input1"></span>
				</div>

				<div class="wrap-input1 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					<input class="input1" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                    {errors.email && <div className='error'>{errors.email}</div>}
					<span class="shadow-input1"></span>
				</div>

				

				<div class="wrap-input1 validate-input" data-validate = "Message is required">
					<textarea class="input1" name="message" placeholder="Shkruj mesazhin..." value={formData.message} onChange={handleChange}/>
                    {errors.message && <div className='error'>{errors.message}</div>}
					<span class="shadow-input1"></span>
				</div>

				<div class="container-contact1-form-btn">
					<button class="contact1-form-btn" type='submit'>
						<span>
							Send
							<i class="fa fa-long-arrow-right" aria-hidden="true"></i>
						</span>
					</button>
				</div>
			</form>
		</div>
	</div>
      </form>
    </div>
  )
}

export default Contactus
