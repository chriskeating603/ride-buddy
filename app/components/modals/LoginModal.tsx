'use client'

import axios from 'axios';
import {signIn} from 'next-auth/react'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { sign } from 'crypto';
import { useRouter } from 'next/navigation';



const loginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register, 
        handleSubmit,
        formState: { errors },
    }  = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    }); 

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => { 
            setIsLoading(false)
            if(callback?.ok) {
                toast.success('Logged in successfully')
                router.refresh()
                loginModal.onClose()
            }
            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }
    
    const onToggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title="Log in you piece of garbage"
            subtitle='Welcome back to Ride Buddy'
            />
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
                onClick={() => signIn('google'
                // , {callbackUrl: 'http://localhost:3000'}
                )}
            /> */}

            <div className='justify-center flex flex-row items-center gap-2'>
                <div className='py-4'>
                    First time using Ride Buddy?
                </div> 
                <div onClick={onToggle}
                className='text-neutral-800 cursor-pointer hover:underline'>
                    Create an account
                </div>
            </div>
            {/* </div> */}

            
        </div>
    )
    
    return ( <Modal 
        disabled={isLoading} 
        isOpen={loginModal.isOpen}
        // title='Welcome to RiderB'
        subtitle='Create an account'
        actionLabel='Continue' 
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}  
        body={bodyContent}
        footer={footerContent}
        
    /> );
}
 
export default loginModal;