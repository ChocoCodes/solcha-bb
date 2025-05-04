type HeaderProps = {
    currentPage: string;
};

export const Header = ({ currentPage }: HeaderProps) => {
    return (
        <header className="text-center py-8 pl-2 border-b-2 border-gray-500">
            <h1 className="text-4xl font-bold text-left">{ currentPage }</h1>
        </header>
    )
}