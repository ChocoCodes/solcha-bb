"use client"

import { useState, useEffect } from 'react';
import InputField from '@/components/InputField';
import { PostCategory } from '@/utils/constants';
import Image from 'next/image';
import { KANLAON_COORDS } from '@/utils/constants';
import { Checkbox } from "@/components/ui/checkbox";
import { 
    UserInputData, 
    ImageData, 
    CategoryKey 
} from '@/utils/types';
import {
    Card,
    CardHeader,
    CardContent,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/select"

export const AddPostForm = ({ onClose }: { onClose: () => void }) => {
    const [userInput, setUserInput] = useState<UserInputData>({
        title: '',
        description: '',
        category: PostCategory.INFORMATION // set only as default category
    });
    const [image, setImage] = useState<ImageData>({
        file: null,
        url: ''
    });
    const [postLocation, setPostLocation] = useState(KANLAON_COORDS);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _file = e.target.files?.[0];
        if (_file) {
            const _url = URL.createObjectURL(_file);
            setImage({
                file: _file,
                url: _url,
            })
        }
    }
    
    // Change the input data dynamically according to UserInputData type
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserInput(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const url = await uploadImage(image.file);
        console.log(`Submitted: ${userInput.title}, ${userInput.description}, ${userInput.category}, ${image.file?.name}, ${postLocation.lat}, ${postLocation.lng}`);
    }

    // Change the category dynamically according to CategoryKey type
    const handleCategoryChange = (value: string) => {
        setUserInput(prev => ({
            ...prev,
            category: value as CategoryKey,
        }));
    }

    // Handle checkbox change to request for user location
    const handleOnCheckedChange = () => {
        setIsChecked(prevChecked => {
            if(!prevChecked) requestUserLocation();
            else setPostLocation(KANLAON_COORDS);
            return !prevChecked;
        })
    }

    // Request user location if the checkbox is checked
    const requestUserLocation = () => {
        if(!navigator.geolocation) {
            alert('GeolocationNotSupportedError: System defined coordinates will be used.');
            return;
        }
        // Retrieve the user's location (Assuming the user allows it)
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setPostLocation({
                lat: latitude,
                lng: longitude
            })
        },
        (error) => {
            alert(`LocationRetrievalError: ${error.message}`);
            console.error('LocationRetrievalError: ', error);
            setPostLocation(KANLAON_COORDS);
        })
    }
    /*
    * Invoke an unmount function on every unmount or image change to revoke the object URL
    * a BLOB URL is created for the preview, which points to the file stored in memory -
    * release memory when image.url is changed or unmounted 
    */ 
    useEffect(() => {
        return () => {
            if(image.url) {
                URL.revokeObjectURL(image.url);
            }
        }
    }, [image.url]);

    return (
        <div className="fixed inset-0 backdrop-blur-xs bg-charcoal/10 flex items-center justify-center z-50">
            <Card className="border-none w-90 p-3 bg-charcoal border-2 border-white">
                <CardHeader className="flex items-center justify-between p-2 border-b-2 border-clear text-white">
                    <h1 className="text-2xl">New Post</h1>
                    <button onClick={ onClose } className="text-3xl">&times;</button>
                </CardHeader>
                <CardContent className="pb-10">
                    <form action="submit" onSubmit={handlePostSubmit} className="flex flex-col gap-5 text-white">
                        {image.url && (
                            <Image 
                                src={image.url} 
                                alt="Post Image" 
                                width={100} 
                                height={100}
                                className="w-40 h-40 object-cover mx-auto" 
                            />
                        )}
                        <div className="p-1 font-poppins flex gap-3 justify-between items-center">
                            <label className="px-2 py-1 bg-white text-charcoal rounded-sm text-md">
                                Upload
                                <input 
                                    type="file" 
                                    accept=".png, .jpg, .jpeg" 
                                    onChange={ handleImageChange }
                                    className="w-80 px-3 py-1 hidden"
                                />
                            </label>
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {image.file ? image.file.name : 'No image chosen.'}
                            </span>
                        </div>                        
                        <InputField 
                            type="text" 
                            name={"title"}
                            id="title" 
                            value={userInput.title} 
                            func={(e) => handleInputChange(e)} 
                            placeholder="Enter title"
                        />
                        <div className="rounded-md p-1 font-poppins border-[1px] border-ivory">
                            <textarea 
                                name={"description"} 
                                id={"description"} 
                                value={userInput.description} 
                                placeholder='Enter description'
                                className="w-80 px-3 py-1 placeholder:text-white focus:outline-none"
                                onChange={e => handleInputChange(e)}
                            >
                            </textarea>
                        </div>
                        <Select onValueChange={handleCategoryChange} value={userInput.category}>
                            <SelectTrigger className="text-white focus:outline-none border-ivory w-full">
                                <SelectValue placeholder="Select category"/>
                            </SelectTrigger>
                            <SelectContent className="text-white bg-charcoal">
                                {Object.values(PostCategory).map((category, index) => {
                                    return (
                                        <SelectItem 
                                            key={ index }
                                            value={category}
                                        >
                                            { category.replace('_', ' ') }
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                        <div className="flex items-center gap-2 w-full">
                            <Checkbox 
                                className="w-5 h-5" 
                                checked={isChecked} 
                                onCheckedChange={handleOnCheckedChange}
                            />
                            <span 
                                className="text-xs text-white"
                            >
                                Share the location of this bulletin post.
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-white text-charcoal rounded-sm py-2 text-lg"
                        >
                            Post
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}