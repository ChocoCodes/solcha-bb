import Image from 'next/image';
const MaskedImage = () => {
    return (    
        <div className="relative w-full h-60">
            <Image
            src="/assets/Kanlaon.png"
            alt="Image of Mount Kanlaon"
            className="object-fit mask sm opacity-70 backdrop-blur-lg"
            fill
            priority
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center justify-center w-screen">
                <Image 
                    src='/assets/BB-logo.svg'
                    alt='logo'
                    width={100}
                    height={100}
                    loading="lazy"
                /> 
                <Image 
                    src="/assets/BB-logo-text.svg" 
                    alt="logo" 
                    width={125} 
                    height={125} 
                    loading='lazy'
                /> 
            </div>
        </div>
    );
}

export default MaskedImage;