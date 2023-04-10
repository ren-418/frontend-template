import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './assets/style/index.scss'

import Loading from './components/Loading';
import Home from './pages/Home';
import Farm from './pages/Farm';
import FarmDetail from './pages/FarmDetail';
import Affiliate from './pages/Affiliate';
import { Now } from './util';
import useStore from './useStore';


function App() {
	// @ts-ignore
	const {loading, logined, lasttime, updated, lang, update} = useStore()
	React.useEffect(() => {
		if(logined)  {
			if(lasttime + 43200 < Now()) { //session expiration 12 hours, logout
				update({
					currentAccountMail: "", 
					currentAccountName: "", 
					currentAccountAddress: "", 
					token: "", 
					logined: false
				});
			}
			update({lasttime: Now(), updated: updated + 1})
		}
		update({loading: true})
		setTimeout(() => {
			update({loading: false})
		}, 3000);
	}, [])

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/farm" component={Farm}></Route>
				<Route exact path="/farm-detail" component={FarmDetail}></Route>
				<Route exact path="/affiliate" component={Affiliate}></Route>
				<Route exact path="*" component={Home}></Route>
			</Switch>
			<NotificationContainer/>
			<Loading width={150} height={150} color={"white"} opacity={0.7} show={!!loading}/>
		</BrowserRouter>
	)
}

export default App
