import React from 'react';
import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux';
import { ActionCableProvider} from "react-actioncable-provider"
import store from './redux/store';
import App from './App';


ReactDOM.render(<Provider store={store}><ActionCableProvider url={'ws://localhost:3000/cable'}><App /></ActionCableProvider> </Provider>, document.querySelector("#root"));