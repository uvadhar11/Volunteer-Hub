function LogIn() {
  return (
    <div>
      <nav className="top-bar">
        <div>
          <img src="../logo.png" className="logo" />
          <h3 className="volunteer-hub-logo-text">Volunteer Hub</h3>
        </div>
        <div className="LI-sign-up-btn">
          <a href="/sign-up" className="sign-up-btn">
            Sign Up
          </a>
        </div>
      </nav>

      {/* <!-- Log in to an existing account -->
            <!-- Log in label (center the div, white background, background image maybe like a space one)-->
            <!-- email or username (firstName + LastName)-->
            <!-- password input field --> */}

      <form className="log-in-form">
        <h1>Log In</h1>

        <label>Email</label>
        <input required />

        <label>Password</label>
        <input type="password" required />

        <input
          type="button"
          value="Log In"
          className="log-in-form-submit-btn"
        />
      </form>

      <button className="log-in-forgot-password-btn">Forgot Password?</button>

      <footer className="footer">
        {/* <!-- Maybe put some stuff in here --> */}
        <h1>Footer</h1>
      </footer>
    </div>
  );
}

export default LogIn;
