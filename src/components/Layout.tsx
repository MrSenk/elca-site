interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full">
            <div className="max-w-[1400px] mx-auto px-4 py-4 md:py-8 min-h-screen flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default Layout;
