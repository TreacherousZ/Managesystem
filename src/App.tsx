import "./App.less";
import Router from './router'
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from 'antd'
import AntdGlobal from './utils/AntdGlobal'


function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#ed6c00'
				}
			}}>
			<AntdApp>
				<AntdGlobal />
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</AntdApp>

		</ConfigProvider>
	)
}

export default App;
