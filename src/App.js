import React, {Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/form/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/face/FaceRecognition';
import Signin from './components/login/Signin';
import Register from './components/login/Register';

const particleOptions = {
  "particles": {
    "number": {
      "value": 200
    }
  }
};

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }

  loadUser = (data) =>{
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  calculateFaceLocation = (data) =>{
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      width: (ClarifaiFace.right_col - ClarifaiFace.left_col) * width,
      height: (ClarifaiFace.bottom_row - ClarifaiFace.top_row) * height,
      left: ClarifaiFace.left_col * width,
      top: ClarifaiFace.top_row * height
    };
  }

  displayFaceBox = (box) =>{
    this.setState({box}); //same as this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onSubmit = () =>{
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3001/imageapi', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
      })
      .then(response => response.json())
      .then(response => {
        if (response){
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json() )
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          });
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(console.log);
  };

  onRouteChange = (route, isSignedIn) =>{
    if (route === 'signout'){
      this.setState(initialState);
    } else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render(){
    const {isSignedIn, imageUrl, route, box } = this.state;
    console.log(this.state.user.name);
    return (
      <div className="App">
        <Particles className='particles' 
          params={particleOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          (route === 'register')
            ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : (
                (route === 'home')
                  ? <div>
                      <Logo />
                      <Rank name={this.state.user.name} entries={this.state.user.entries} />
                      <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
                      <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </div>
                  : <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )      
        }
      </div>
    );
  }
}

export default App;
