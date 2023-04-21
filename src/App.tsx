import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Module from './components/Module';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Module />} />
				<Route
					path='*'
					element={
						<>
							<p>임시 페이지</p>
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
