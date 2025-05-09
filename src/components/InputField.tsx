"use client";

import { InputFieldProps } from '@/utils/types';
import React, { useState } from 'react';
import Image from 'next/image';
import { passwordPattern } from '@/utils/constants';

const InputField: React.FC<InputFieldProps> = ({type, name, value, id, func, placeholder, className}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
        <div className="relative rounded-md p-1 font-poppins border-[1px] border-ivory">
            <input 
                type={(type === 'password' && !isPasswordVisible) ? 'password': type === 'email' ? 'email' : 'text'}
                name={ name } 
                value={ value } 
                id={ id } 
                onChange={ func } 
                placeholder={ placeholder } 
                className={`w-80 px-3 py-1 placeholder:text-white focus:outline-none ${ className ? className : ''}`}
                autoComplete="off"
                pattern= { type === 'password' ? passwordPattern : undefined }
                required
            />
            { type === 'password' && (
                <button 
                    type="button" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 pr-3" 
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    <Image 
                        src={ isPasswordVisible ? '/assets/show.png' : '/assets/hide.png' } 
                        alt="eye icon" 
                        width={15} 
                        height={15}
                    />
                </button>
            ) }
        </div>
    )
}

export default InputField;