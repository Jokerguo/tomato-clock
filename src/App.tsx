import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './App.scss';
import Index from './components/Index/Index';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact={true} path="/" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/signUp" component={SignUp}/>
      </Router>
    );
  }
}

export default App;

// export default function App() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li><Link to="/">主页</Link> </li>
//           <li><Link to="/about">关于</Link></li>
//           <li><Link to="/topics">话题</Link></li>
//         </ul>
//
//
//       </div>
//     </Router>
//   );
// }

