import image1 from '../images/logo.png'

const Navbar = () => {
    return (
            <div className='logo'>
            <img src={image1} alt='pocket-watch-logo'/>
            <h1>Pocket-Watch</h1>
            <div className='links'>
                <a href="/Home">Home</a>
                <a href="/Weather">Weather</a>
                <a href="/News">News</a>
            </div>
          </div>
     );
}
 
export default Navbar;