import React, { Component, lazy, Suspense } from 'react'
import './assets/sass/app.scss';
import { BrowserRouter } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

export class App extends Component {
  render() {
    const InnerLayoutComponent = lazy(() => import('./Layout/Inner-Layout/InnerLayoutComponent'));
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Suspense fallback={<Spinner animation="border" variant="secondary" />}>
            <InnerLayoutComponent />
          </Suspense>
        </BrowserRouter>
      </React.StrictMode>
    )
  }
}


