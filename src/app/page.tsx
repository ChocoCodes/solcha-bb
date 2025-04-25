"use client";

import MaskedImage from '@/components/MaskedImage';
import InputField from '@/components/InputField';
import {Footer, Loading} from '@/components/Footer';
import { useState } from 'react';
export default function Home() {
  const [password, setPassword] = useState('');
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  return (
    <>
      <InputField type="password" id="password" value={password} func={handlePasswordChange} placeholder="Password" />
    </>
  );
}
