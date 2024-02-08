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



const LoginModal = () => {
    const router = useRouter()
    const LoginModal = useLoginModal()
    const RegisterModal = useRegisterModal()
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
                LoginModal.onClose()
            }
            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }
    
    const onToggle = useCallback(() => {
        LoginModal.onClose()
        RegisterModal.onOpen()
    }, [LoginModal, RegisterModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title="Log into Chat Signal"
            subtitle='Connect with your friends while you drive or have a few free minutes.'
            center={true}
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
                    New user?
                </div> 
                <div onClick={onToggle}
                className='text-neutral-800 cursor-pointer hover:underline font-bold text-xl underline'>
                    Create an account here
                </div>
            </div>
            {/* </div> */}

            
        </div>
    )
    
    return ( <Modal 
        disabled={isLoading} 
        isOpen={LoginModal.isOpen}
        // title='Welcome to RiderB'
        subtitle='Create an account'
        actionLabel='Continue' 
        onClose={LoginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}  
        body={bodyContent}
        footer={footerContent}
        
    /> );
}
 
export default LoginModal;