import Header from "../components/Header";

function AboutPage(){
    
    return(
        <div>
            <Header active="about"/>
            <div className="App-header">
                <h1>About Genereactoni</h1>
                <img src="http://logo"alt="Creator"/>
                <p>Genereactoni is a project that was build as a part of bachelors work by Filip Volarić.<br />The purpose of Genereactoni is to help begginers develop a sense to model and create React applications.
                It can be used to model client applications for any modern framework (Vue.js, Angular etc.) but naming suits React.
                <br/>This project is a prototype and most likely will impove in the future.
                So far it will probably help you to visualize the React project structure and generate code that can help you speed up the development process.
                <br/> If you are new to developing React applications or you want to get started without watching hours of tutorials this project might help you get a better understanding by allowing you to use existing HTML.</p>
                <p>Full documentation: <a href="/">link</a></p>
                <p>The project is in early stages of development so if you have any questions or you want to report a bug that is annoying you feel free to contact me in the form below</p>
            </div>
        </div>
    )
}

export default AboutPage;