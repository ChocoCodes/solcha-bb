import {
    Card,
    CardHeader,
    CardContent,
} from '@/components/ui/card';
import InputField from '@/components/InputField';

export const AddPostForm = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <Card className="border-none w-80 px-5 py-2">
                <CardHeader className="flex items-center justify-between p-2 border-b-2 border-lightgray">
                    <h1 className="text-2xl">New Post</h1>
                    <button onClick={ onClose } className="text-3xl"> &times; </button>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
    )
}