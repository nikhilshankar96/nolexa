import React, { useEffect, useState } from "react";
import { cipher, decipher, salt, encodeVoice, decodeVoice } from "./encrypt";
import img from "./assets/robot-01-icon.png";

export const App = (props: any) => {
	const { code } = props.match.params;
	const myCipher = cipher(salt);
	const myDecipher = decipher(salt);
	const url = "https://nolexa.nikhil-shankar.vercel.app/";

	const synth = window.speechSynthesis;
	const [voice, setVoice] = useState(
		!!code ? decodeVoice(code.substring(0, 1)) : 0
	);
	const [text, setText] = useState(
		code === undefined ? "" : myDecipher(code.slice(1))
	);
	const [voices, setVoices] = useState(Array<SpeechSynthesisVoice>());

	useEffect(() => {
		getVoices();
		if (!!code && code !== "") {
			speakFunction();
			setTimeout(() => speakFunction(), 666);
		}
	}, []);

	useEffect(() => {
		if (!!code && code !== "") {
			speakFunction();
			setTimeout(() => speakFunction(), 666);
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
		//speak error
		speakText.onerror = (e) => {
			console.error("something went wrong");
		};

		//loop through voices to find selectedVoice
		speakText.voice = voices[voice];

		//speak
		synth.speak(speakText);
	};

	const copyCode = () => {
		if (!!text) {
			navigator.clipboard.writeText(url + encodeVoice(voice) + myCipher(text));
			alert("Copied to clipboard, send it to someone!");
		}
	};
	if (!synth.speaking) speakFunction();

	return (
		<div className='container row'>
			<h1 className=' center	'>Nolexa</h1>
			<div className='center'>
				<img className='responsive-img' src={img} style={{ maxHeight: 400 }} />
			</div>
			<div className='col s12'>
				<input
					style={{ color: "white" }}
					type='text'
					name='text'
					value={text}
					onChange={(event) => setText(event.target.value)}
					placeholder={"Type something"}
				/>
			</div>
			<div className='col s12'>
				<select
					value={voice}
					onChange={(event) => setVoice(Number(event.target.value))}
					className='browser-default'
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
			</div>
			<br />
			<div className='row container col s12 center' style={{ marginTop: 20 }}>
				<div className='col s6  center'>
					<button
						className='waves-effect waves-light btn-large cyan'
						onClick={speakFunction}
					>
						Speak
					</button>
				</div>
				<div className='col s6  center '>
					<button
						className='waves-effect waves-light btn-large purple'
						onClick={copyCode}
					>
						Share
					</button>
				</div>
			</div>
			<div className='col s12 responsive-text '>
				<p
					className='red  center'
					style={{ padding: 10, borderRadius: 8, fontSize: 9 }}
				>
					Nolexa is merely a dumb app built on a boring sunday afternoon, I take
					no responsibility for whatever whoever sent you. Doesn't work on some
					browsers.
				</p>
			</div>
		</div>
	);
};

export default App;
