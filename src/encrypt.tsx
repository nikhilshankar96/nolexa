export const salt: string = "salty";

export const cipher = (salt: string) => {
	const textToChars = (text: string) =>
		text.split("").map((c) => c.charCodeAt(0));
	const byteHex = (n: any) => ("0" + Number(n).toString(16)).substr(-2);
	const applySaltToChar = (code: number) =>
		textToChars(salt).reduce((a, b) => a ^ b, code);

	return (text: any) =>
		text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
};

export const decipher = (salt: string) => {
	const textToChars = (text: string) =>
		text.split("").map((c) => c.charCodeAt(0));
	const applySaltToChar = (code: number) =>
		textToChars(salt).reduce((a, b) => a ^ b, code);
	return (encoded: any) =>
		encoded
			.match(/.{1,2}/g)
			.map((hex: string) => parseInt(hex, 16))
			.map(applySaltToChar)
			.map((charCode: any) => String.fromCharCode(charCode))
			.join("");
};

export const encodeVoice = (v: number) => String.fromCharCode(v + 96);

export const decodeVoice = (v: string) => v.charCodeAt(0) - 96;
