const Home = () => {
    const handleClick = () => {
        console.log('hello, all');
    }

    return ( 
        <div className="Home">
            <h2>Home Page</h2>
            <button onClick={handleClick}>Click me</button>
        </div>
     );
}
 
export default Home;