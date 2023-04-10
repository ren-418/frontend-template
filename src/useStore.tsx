import { useSelector, useDispatch } from 'react-redux';
import Slice from './reducer'
import {tips } from './util'
import config from './config.json'

export const proxy = config.REACT_APP_PROXY || 'http://127.0.0.1:5000'
const useStore = (): useStoreTypes => {
	const G = useSelector((state: StoreType) => state)
	const dispatch = useDispatch()
	const update = (payload: { [key: string]: any }) => dispatch(Slice.actions.update(payload))

	const call = async (url: string, params?: any, headerParams?: any): Promise<ServerResponse | null> => {
		try {
			const result = await fetch(proxy + url, { method: 'POST', headers: { 'content-type': 'application/json', ...headerParams}, body: params ? JSON.stringify(params) : null });
			if(result.status === 403) {
				update({currentAccountMail: "", currentAccountName: "", currentAccountAvatar: "", currentAccountAddress: "", token: "",  logined: false});
				return null;
			}
			return await result.json();
		} catch (error) {
			tips("error", "Server error");
		}
		return null
	}
	return { ...G, update, call };
}

export default useStore