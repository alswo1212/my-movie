import Header from "@component/Header"

const Layout = ({ children }) => {
    
    return (
        <>
        <div className="section-wrap">
            <Header></Header>
            <div className="main-section">
                메인 섹션임
                {children}
            </div>
        </div>
        </>
    )
}

export default Layout