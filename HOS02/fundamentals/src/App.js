// ~~ Part 1 ~~
//import React from 'react';
//import Counter from './Counter.js';
//
//function App() {
//  return (
//    <div>
//      <Counter />
//    </div>
//  );
//}
//
//export default App;



// ~~ Part 2 ~~

//import React from 'react';
//
//function MyButton() {
//  return (
//    <button>
//      I'm a button
//    </button>
//  );
//}
//
//function App() {
//  return(
//    <div>
//      <h1>Welcome to my app</h1>
//      <MyButton />
//    </div>
//  );
//}
//
//export default App;


// ~~ Part 3 ~~
//import React, { Component } from 'react';
//
//class Counter extends Component {
//  constructor(props) {
//    super(props);
//    this.state = {
//      count: 0
//    };
//  }
//  incrementCount() {
//    this.setState(prevState => ({ count: prevState.count + 1 }));
//  }
//
//  render(){
//    return(
//    <div>
//      <p>Count: {this.state.count}</p> 
//      <button onClick={() => this.incrementCount()}>Increment</button>
//    </div>
//    );
//  }
//}
//
//function App() {
//  return (
//    <div>
//    <Counter />
//    </div>
//  );
//}
//
//export default App;


// ~~ Part 4 (section 6)

//import React, { Component } from 'react';
//
//function AboutPage() {
//  return (
//    <>
//      <h1>About</h1>
//      <p>Hello there.<br />How do you do?</p>
//    </>
//  );
//}
//
//function MyButton() {
//  return (
//    <button>
//      I'm a button
//    </button>
//  );
//}
//
//function App(){
//  return (
//    <div>
//      <h1>Welcome to my app</h1>
//      <MyButton />
//      <AboutPage />
//    </div>
//  );
//}
//
//export default App;

// ~~ Part 5 (section 7)
//import React, { Component } from 'react';
//import './style.css'
//
//const user = {
//  name: 'Hedy Lamarr',
//  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
//  imageSize: 90,
//};
//
//function Profile() {
//  return (
//    <div>
//      <h1>{user.name}</h1> 
//      <img
//        className="avatar"
//        src={user.imageUrl}
//        alt={'Photo of ' + user.name}
//        style={{
//          width: user.imageSize,
//          height: user.imageSize
//        }}
//        />
//    </div>
//  );
//}
//
//function App() {
//  return (
//  <div>
//    <h1>Welcome to my app</h1>
//    <Profile />
//  </div>
//  );
//}
//
//export default App;

// ~~ Part 6 (section 8)

//import { useState } from 'react';
//
//function MyButton() {
//  const [count, setCount] = useState(0);
//
//  function handleClick(){
//    setCount(count + 1);
//  }
//
//  return (
//    <button onClick={handleClick}>
//    Clicked {count} times
//    </button>
//  );
//}
//
//function App(){
//  return (
//  <div>
//    <h1>Updating the screen</h1>
//    <MyButton />
//    <MyButton />
//  </div>
//  );
//}
//
//export default App;

// ~~ Part 7 (hooks)

import React, { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() =>{
    // this function will be called after every render
    document.title = `Count: ${count}`;

    //Clean up function
    return () => {
      // this function will be called before the component unmounts
      document.title = 'React App'; // reset the document title
    };
  }, [count]); // specify count as a dependency

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
  <div>
    <p>Count: {count}</p>
    <button onClick = {incrementCount}>Increment</button>
  </div>
  );
};

export default App;

