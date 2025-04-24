import Image from 'next/image';
const MaskedImage = () => {
    return (    
        <div className="relative w-full h-60">
            <Image
            src="/assets/Kanlaon.png"
            alt="Image of Mount Kanlaon"
            className="object-fit masked-sm"
            fill
            priority
            />
        </div>
    );
}

export default MaskedImage;