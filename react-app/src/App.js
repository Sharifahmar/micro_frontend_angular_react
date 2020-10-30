import React, { Component } from 'react'
import './assets/sass/app.scss';

export class App extends Component {
  render() {
    return (
      <div>
        <div class="fg-actions d-flex justify-content-between">
          <div class="login-btn">
            <a class="text-decoration-none">
              <button class="btn btn-outline-primary">
                Register
                          </button>
            </a>
          </div>
          <div class="recover-pass ">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    )
  }
}


