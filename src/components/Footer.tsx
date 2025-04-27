const Footer = () => {
    return (
        <footer className="flex flex-col text-center w-screen">
            <h1>&copy; 2025 Ambot</h1>
            <p>APAC Solution Challenge Entry</p>
        </footer>
    )
};

const Loading= () => {
    return <>
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="spinner"></div>
        </div>
    </>
}
export { Footer, Loading };
