"use client"

import useInviteBuddiesModal from "@/app/hooks/useInviteBuddiesModal"
import Modal from "./Modal"
import { useMemo, useState } from "react";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FieldValues, set, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { SubmitHandler } from "react-hook-form";


enum STEPS {
    FUNNY_NAME = 0,
    PHONE_NUMBER = 1
}

    // figure out the next post for inviting a friend
    // or should i just skip as a part of the mvp?
    // setIsLoading(true)
    // signIn('credentials', {
    //     ...data,
    //     redirect: false,
    // }).then((callback) => { 
    //     setIsLoading(false)
    //     if(callback?.ok) {
    //         toast.success('Logged in successfully')
    //         router.refresh()
    //         loginModal.onClose()
    //     }
    //     if (callback?.error) {
    //         toast.error(callback.error)
    //     }
    // })

const inviteBuddiesModal = () => {
    const inviteBuddiesModal = useInviteBuddiesModal();
    const [step, setStep] = useState(STEPS.FUNNY_NAME)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            funnyName: '',
            phoneNumber: '',
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // console.log(data)
        setIsLoading(true)
        axios.post('/api/invite', data)
        .then(() => {
            toast.success("Invite successful!")
            console.log(data)
        }).catch((err) => {
            toast.error("Please try again")
        }).finally(() => { 
            setIsLoading(false)
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {  
        if (step === STEPS.PHONE_NUMBER) {
            handleSubmit(onSubmit)()
            return
        }
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PHONE_NUMBER) {
            return "Invite"
        }
        return "Next"
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.FUNNY_NAME) {
            return undefined
        }
        return "Back"
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
            title={'Add Your Buddy\'s Name'}
            subtitle={'Clown on their name and it\'s how they\'ll be identified forever'}
            />
            <div className="
                grid 
                grid-cols-1 
                gap-3
                max-h-[50vh]
                overflow-y-auto
            ">
                <Input  
                id={'funnyName'}
                type="text"
                disabled={false}
                formatPrice={false}
                required={true}
                register={register}
                errors={errors}
                label="Funny Name"
                />
                {/* <Input
                label="Phone Number"
                /> */}
            </div>
        </div>
    )

    if (step === STEPS.PHONE_NUMBER) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title={'Add Their Phone Number'}
                subtitle={'This one you can\'t really mess around with unfortunately'}
                />
                <div className="
                    grid 
                    grid-cols-1 
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                ">
                    <Input  
                    id={'phoneNumber'}
                    type="text"
                    disabled={false}
                    formatPrice={false}
                    required={true}
                    register={register}
                    errors={errors}
                    label="Phone Number"
                    />
                    {/* <Input
                    label="Phone Number"
                    /> */}
                </div>
            </div>
        )
    }

            

    return (
        <Modal
        disabled={isLoading}
        isOpen={inviteBuddiesModal.isOpen}
        onClose={inviteBuddiesModal.onClose}
        // onSubmit={inviteBuddiesModal.onClose}
        // action={onNext}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.FUNNY_NAME ? undefined : onBack}
        // title="Invite your buddies"
        body={bodyContent}
        />
    )
}

export default inviteBuddiesModal;