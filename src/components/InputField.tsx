"use client";

import { InputFieldProps } from '@/utils/types';
import React, { useState } from 'react';
import Image from 'next/image';
import { passwordPattern } from '@/utils/constants';

const InputField: React.FC<InputFieldProps> = ({type, value, id, func, placeholder}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
        <div className="relative">
            <input 
                type={(type === 'password' && !isPasswordVisible) ? 'password': type === 'email' ? 'email' : 'text'} 
                value={ value } id={ id } 
                onChange={ func } 
                placeholder={ placeholder } 
                autoComplete="off"
                pattern= { type === 'password' ? passwordPattern : undefined }
            />
            { type === 'password' && (
                <button 
                    type="button" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2" 
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                    <Image 
                        src={ isPasswordVisible ? '/assets/show.png' : '/assets/hide.png' } 
                        alt="eye icon" 
                        width={20} 
                        height={20}
                    />
                </button>
            ) }
        </div>
    )
}

export default InputField;