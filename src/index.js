
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/src/sweetalert2.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import './assets/css/style.scss'
import './assets/css/media.scss'

import {BrowserRouter} from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminProvider } from './context/AdminContextDetail';

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          refetchOnWindowFocus: false,
          retry: 0
      }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
  <App />
      </AdminProvider>
  <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </BrowserRouter>
);
