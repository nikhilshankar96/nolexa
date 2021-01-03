import React, { useState, useEffect } from "react";

interface Props {}

const App = (props: Props) => {
	const [text, setText] = useState("");
	const [voice, setVoice] = useState(13);

	// let voices: Array<SpeechSynthesisVoice>;
	// const [voices, setVoices] = useState(Array<SpeechSynthesisVoice>());
	const synth = window.speechSynthesis;
	const voices: Array<SpeechSynthesisVoice> = synth.getVoices();

	useEffect(() => {
		// if (voices.length === 0) getVoices();
		console.log(text, voice);
	}, [text, voice]);

	// const getVoices = async () => setVoices(await synth.getVoices());

	const onClickHandler = () => {
		if (text === "") return;
		//check if speaking
		if (synth.speaking) {
			console.error("Already speaking, wait!");
			return;
		}
		let speakText = new SpeechSynthesisUtterance(text);
		speakText.onend = (e) => {
			console.log("Done speaking!");
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

	return (
		<div className='App'>
			<header className='App-header'>
				<input
					type='text'
					name='text'
					value={text}
					onChange={(event) => setText(event.target.value)}
				/>
				<select
					id='cars'
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
				<button onClick={onClickHandler}>Speak</button>
			</header>
		</div>
	);
};

export default App;
