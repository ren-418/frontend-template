import {NotificationManager} from 'react-notifications';
import config from './config.json'


export const tips = (type="success", html: string) => {
	switch (type) {
	case 'info':
		NotificationManager.info(html, "Info");
		break;
	case 'success':
		NotificationManager.success(html, "Success");
		break;
	case 'warning':
		NotificationManager.warning(html, "Warning",  3000);
		break;
	case 'error':
		NotificationManager.error( html, "Error", 5000, () => {
		});
		break;
	}
}
export const proxy = config.REACT_APP_PROXY || 'http://127.0.0.1:5000/'
export const Now = () => Math.round(new Date().getTime() / 1000);

export const TF = (time: number, offset: number = 2) => {
	// let iOffset = Number(offset);
	let date= new Date(time);
	let y = date.getUTCFullYear();
	let m = date.getUTCMonth() + 1;
	let d = date.getUTCDate();
	let hh = date.getUTCHours();
	let mm = date.getUTCMinutes();
	let ss = date.getUTCSeconds();
	let dt = ("0" + m).slice(-2) + "-" + ("0" + d).slice(-2);
	let tt = ("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2) + ":" + ("0" + ss).slice(-2);
	return y + '-' + dt + ' ' + tt;
}

export const NF = (num: number, p: number = 2) => num.toLocaleString('en', { maximumFractionDigits: p });
export const validateEmail = (email: string): boolean => email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
export const validateUsername = (username: string): boolean => username.match(/^[a-zA-Z ]{3,20}$/) !== null;
export const validateNumber = (number : string) : boolean =>   parseFloat(number) > 0;
export const validatePhone = (number : string) : boolean =>  /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(number);
export const validatePassword = (number : string) : boolean =>  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*?&#]{8,30}$/g.test(number);
export const validateUrl = (str : string) :boolean => {
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
	  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
	  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
	  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
	  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
	  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	return !!pattern.test(str);
  }


export const toLocaleSting = (time) => {
	let date= new Date(time);
	let y = date.getUTCFullYear();
	let m = date.getUTCMonth() + 1;
	let d = date.getUTCDate();
	let hh = date.getUTCHours();
	let mm = date.getUTCMinutes();
	let ss = date.getUTCSeconds();
	let dt = ("0" + m).slice(-2) + "-" + ("0" + d).slice(-2);
	let tt = ("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2) + ":" + ("0" + ss).slice(-2);
	return y + '-' + dt + 'T' + tt;

}

export const copyToClipboard = (text: string) => {
	var textField = document.createElement('textarea')
	textField.innerText = text
	document.body.appendChild(textField)
	textField.select()
	document.execCommand('copy')
	textField.remove()
	if (text.length > 40) {
		text = text.substring(0, 15) + "..." + text.substring(text.length - 5);
	}
	tips("info", "Copied: " + text);
};

export const ellipsis = (address: string, start: number=6) => {
	if (!address || address === null) return ''
	const len = (start ) + 7;
	return address.length > len ? `${address?.slice(0, start)}...${address?.slice(-4)}` : address
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getFormattedDate(date, prefomattedDate = false as any, hideYear = false) {
	const day = date.getDate();
	const month = MONTH_NAMES[date.getMonth()];
	const year = date.getFullYear();
	const hours = date.getHours();
	let minutes = date.getMinutes();
	if (minutes < 10) {
	  // Adding leading zero to minutes
	  minutes = `0${ minutes }`;
	}
	if (prefomattedDate) {
	  return `${ prefomattedDate } at ${ hours }:${ minutes }`;
	}
	if (hideYear) {
	  return `${ day }. ${ month } at ${ hours }:${ minutes }`;
	}
	// 10. January 2017. at 10:20
	return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
  }
  
export function timeAgo(dateParam) {
	if (!dateParam) {
	  return null;
	}
  
	const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
	const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
	const today: any = new Date();
	const yesterday = new Date(today - DAY_IN_MS);
	const seconds = Math.round((today - date) / 1000);
	const minutes = Math.round(seconds / 60);
	const isToday = today.toDateString() === date.toDateString();
	const isYesterday = yesterday.toDateString() === date.toDateString();
	const isThisYear = today.getFullYear() === date.getFullYear();
  
	if (seconds < 5) {
	  return 'Now';
	} else if (seconds < 60) {
	  return `${ seconds } seconds ago`;
	} else if (seconds < 90) {
	  return 'About a minute ago';
	} else if (minutes < 60) {
	  return `${ minutes } minutes ago`;
	} else if (isToday) {
	  return getFormattedDate(date, 'Today'); // Today at 10:20
	} else if (isYesterday) {
	  return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
	} else if (isThisYear) {
	  return getFormattedDate(date, false, true); // 10. January at 10:20
	}
  
	return getFormattedDate(date); // 10. January 2017. at 10:20
  }
  
  
function stripHexPrefix(value: string) {
	return value.slice(0, 2) === '0x' || value.slice(0, 2) === '0X' ? value.slice(2) : value
}
export const isByte32String = (address: string) => {
	try {
		if (typeof address !== 'string') return ''
		if (!/^(0x)?[0-9a-f]{64}$/i.test(address)) throw new Error(`Given address "${address}" is not a valid Ethereum address.`)
		return true
	} catch (err) {
		// console.log(err)
		return false
	}
}
