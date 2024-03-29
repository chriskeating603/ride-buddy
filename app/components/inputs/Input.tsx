'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled: boolean;
    // formatPrice: boolean;
    required: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = (
    {id, label, type, disabled, 
        // formatPrice, 
        required, register, errors}
) => {
    return ( 
    
        <div className="w-full relative">
            {/* {formatPrice && ( */}
                {/* <BiDollar size={24} 
                className="text-neutral-500 absolute top-5 left-2" />  */}
                {/* )} */}
            <input 
                id={id}
                disabled={disabled}
                {...register(id, {required})}
                placeholder=" "
                type={type}
                className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-9
                ${errors[id] ? 'border-red-500' : 'border-neutral-200'}
                ${errors[id] ? 'focus:border-red-500' : 'focus:border-black'}
                `}
            />

            <label 
                className={`
                    absolute
                    text-md
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    z-10
                    origin-[0]
                    left-9
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    ${errors[id] ? 'text-red-500' : 'text-neutral-500'}

                
                `}>
                {label}
            </label>
        </div> );
    }
 
export default Input;

