'use client'

import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';


const registerModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register, 
        handleSubmit,
        formState: { errors },
    }  = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    }); 

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data)
        .then(() => {
            toast.success("Account created successfully!")
            registerModal.onClose()
            loginModal.onOpen()
            console.log(data)
        }).catch((err) => {
            toast.error("Something went wrong! Please try again")
        }).finally(() => { 
            setIsLoading(false)
        })
    }
    
const onToggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
}, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title="Welcome to Ride Buddy!"
            subtitle='Create an account now you piece of shit'
            />
            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
            <Input id='email' label='Phone Number' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' type='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
            {/* disabled /> */}
        </div>
    )

    const footerContent = (
        <div className='flex flex-col mt-4'>
            <hr />
            {/* <div className="gap-4  p-6">
            <Button 
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            /> */}

            <div className='justify-center flex flex-row items-center gap-2'>
                <div className='py-4'>
                    Already have an account?
                </div> 
                <div onClick={onToggle}
                className='text-neutral-800 cursor-pointer hover:underline'>
                    Log in
                </div>
            </div>
            {/* </div> */}

            
        </div>
    )
    
    return ( <Modal 
        disabled={isLoading} 
        isOpen={registerModal.isOpen}
        // title='Welcome to RiderB'
        // subtitle='Create an account'
        actionLabel='Continue' 
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}  
        body={bodyContent}
        footer={footerContent}
        
    /> );
}
 
export default registerModal;