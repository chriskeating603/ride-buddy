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
import { on } from "events";
import { useRouter } from "next/navigation"; // not next/router

enum STEPS {
    FUNNY_NAME = 0,
    PHONE_NUMBER = 1
}

const InviteBuddiesModal = () => {
    const router = useRouter()
    const InviteBuddiesModal = useInviteBuddiesModal();
    const [step, setStep] = useState(STEPS.FUNNY_NAME)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            funnyName: '',
            phoneNumber: '',
        },
    })

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PHONE_NUMBER) {
            return onNext()
        }
        setIsLoading(true)
        axios.post('/api/invite', data)
        .then(() => {
            toast.success("Invite successful!")
            router.refresh()
            reset()
            setStep(STEPS.FUNNY_NAME)
            InviteBuddiesModal.onClose()
            console.log(data)
            // handleSendSMS()
        }).catch((err) => {
            toast.error("Please try again", err)
        }).finally(() => { 
            setIsLoading(false)
        })

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
            center={true}
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
                // formatPrice={false}
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
                center={true}
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
                    // formatPrice={false}
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
        isOpen={InviteBuddiesModal.isOpen}
        onClose={InviteBuddiesModal.onClose}
        // onSubmit={InviteBuddiesModal.onClose}
        // action={onNext}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.FUNNY_NAME ? undefined : onBack}
        // title="Invite your buddies"
        body={bodyContent}
        />
    )
}

export default InviteBuddiesModal;