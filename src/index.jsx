import React from 'react'
import ReactDOM from 'react-dom/client'
import FactSlides from './FactSlides'
import MatchingGame from './MatchingGame'
import TechnologyStats from './TechnologyStats'

// setup each react component so it can be rendered in index.html

ReactDOM.createRoot(document.getElementById('root-FactSlides')).render(
	<React.StrictMode>
		<FactSlides />
	</React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root-MatchingGame')).render(
	<React.StrictMode>
		<MatchingGame />
	</React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root-TechnologyStats')).render(
	<React.StrictMode>
		<TechnologyStats />
	</React.StrictMode>
);