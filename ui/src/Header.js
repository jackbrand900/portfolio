import './Header.css'
export default function Header(){
    return (
        <>
            <div className='header-box'>
                <h1 className='header-text line line1 top-line'>
                    <span className='typing'>Hello! My name is Jack Brand</span>
                </h1>
                <h2 className='header-text line line2 bottom-line'>
                    <span className='typing'>I'm a full-stack developer focusing on AI and ML</span>
                </h2>
            </div>
        </>
    );
}