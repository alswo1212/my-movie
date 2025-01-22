import Header from "@component/Header"
import Navi from "@component/Navi"

const Layout = ({ children }) => {
    
    return (
        <>
        <div className="section-wrap">
            <Header></Header>
            <div className="main-section">
                <Navi />
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