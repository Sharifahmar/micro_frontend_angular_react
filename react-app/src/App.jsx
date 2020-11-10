import React, { Component, lazy, Suspense } from 'react'
import './assets/sass/app.scss';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';

export class App extends Component {
  render() {
    const InnerLayoutComponent = lazy(() => import('./Layout/Inner-Layout/InnerLayoutComponent'));
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Suspense fallback={<Spinner color="success" />}>
            <InnerLayoutComponent />
          </Suspense>
        </BrowserRouter>
      </React.StrictMode>
    )
  }
}


