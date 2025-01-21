import Header from "@component/Header"

const Layout = ({ children }) => {
    
    return (
        <>
        <div className="section-wrap">
            <Header></Header>
            <div className="main-section">
                {children}
            </div>
            <footer style={{
                width:'100%',
                height:100
            }}></footer>
        </div>
        </>
    )
}

export default Layout