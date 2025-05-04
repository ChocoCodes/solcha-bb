type HeaderProps = {
    currentPage: string;
};

export const Header = ({ currentPage }: HeaderProps) => {
    return (
        <header className="text-center py-8 pl-5">
            <h1 className="text-4xl font-bold text-left">{ currentPage }</h1>
        </header>
    )
}