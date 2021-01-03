import React, { useEffect, useState } from "react";
import { cipher, decipher, salt } from "./encrypt";

export const App = (props: any) => {
	const { code } = props.match.params;
	const myCipher = cipher(salt);
	const myDecipher = decipher(salt);

	const synth = window.speechSynthesis;
	const [text, setText] = useState(code === undefined ? "" : myDecipher(code));
	const [voice, setVoice] = useState(13);
	const [voices, setVoices] = useState(Array<SpeechSynthesisVoice>());

	useEffect(() => {
		getVoices();
		if (!!code && code !== "") {
			//console.log(myDecipher(code));
			setTimeout(() => speakFunction(), 999);
		}
	}, []);

	useEffect(() => {
		//console.log(text, voice);
	}, [text, voice]);

	useEffect(() => {
		for (let i: number = 0; i < voices.length; i++) {
			//console.log("Setting default voice");
			if (voices[i].lang.includes("ja-JP")) {
				//console.log(i);
				setVoice(i);
				break;
			}
		}
	}, [voices]);

	const getVoices = async () => setVoices(await synth.getVoices());

	const speakFunction = () => {
		//console.log(voice);
		if (text === "") return;
		//check if speaking
		if (synth.speaking) {
			console.error("Already speaking, wait!");
			return;
		}
		let speakText = new SpeechSynthesisUtterance(text);
		speakText.onend = (e) => {
			//console.log("Done speaking!");
		};

		//speak error
		speakText.onerror = (e) => {
			console.error("something went wrong");
		};

		//loop through voices to find selectedVoice
		speakText.voice = voices[voice];

		//speak
		synth.speak(speakText);
	};

	const copyCode = () => navigator.clipboard.writeText(myCipher(text));

	return (
		<div className='root blackbg'>
			<br />
			<br />
			<input
				className='container'
				type='text'
				name='text'
				value={text}
				onChange={(event) => setText(event.target.value)}
			/>
			<br />
			<br />

			<select
				className='container'
				value={voice}
				onChange={(event) => setVoice(Number(event.target.value))}
			>
				{voices.length > 0 &&
					voices.map(function (v, i) {
						return (
							<option key={i} value={i}>
								{v.name} ({v.lang})
							</option>
						);
					})}
			</select>
			<div className='container full'>
				<div className='half'>
					<button onClick={speakFunction}>Speak</button>
				</div>
				<div className='half'>
					<button onClick={copyCode}>Share Link</button>
				</div>
			</div>
		</div>
	);
};

export default App;
