class Auth {
    
  constructor() {
    this.authenticated = '';
    
    if (localStorage.getItem('login')) {
      this.authenticated = true
    } else {
      this.authenticated = false
    }
  }

  loginAuth(cb) {
      this.authenticated = true
      cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();