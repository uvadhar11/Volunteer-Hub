function Features() {
  return (
    <div>
      <nav className="top-bar">
        <div>
          <img src="logo.png" className="logo" />
          <h3 className="volunteer-hub-logo-text">Volunteer Hub</h3>
        </div>
        <div className="sign-up-log-in-btns">
          <a href="/sign-up" className="sign-up-btn">
            Sign Up
          </a>
          <a href="/log-in" className="log-in-btn">
            Log In
          </a>
        </div>
      </nav>

      {/* <!-- style="background-image: url('https://live.staticflickr.com/3005/2513481462_d900a71751.jpg');" --> */}
      <div className="volunteer-hub-div">
        <h1 className="volunteer-hub-text">Volunteer Hub</h1>
        <p className="volunteer-hub-description">
          An impactful application for finding volunteer opportunities and
          making a difference.
        </p>
        {/* <!-- Changing the world through volunteering. OR Changing the world 1 volunteer at a time. --> */}
      </div>

      <div className="features-content">
        <div className="find-volunteer">
          <h1 className="find-volunteer-h1">
            Find and post volunteer opportunities in your community and globally
            by location and other search tags
          </h1>
          <img src="logo.png" alt="" />
        </div>

        <div className="earn-hours">
          <img src="logo.png" alt="" />
          <h1 className="earn-hours-h1">Earn community service hours</h1>
        </div>

        <div className="message-others">
          <h1 className="message-others-h1">
            Communicate with those in your volunteer opportunities
          </h1>
          <img src="logo.png" alt="" />
        </div>

        <div className="sign-up-today">
          {/* <!-- <img src="logo.png" alt=""> --> */}
          <h1 className="sign-up-today-h1">Interested? Sign up today!</h1>
          <a href="/sign-up" className="sign-up-today-btn">
            Sign Up
          </a>
        </div>
      </div>

      <footer className="footer">
        {/* <!-- Maybe put some stuff in here --> */}
        <h1>Footer</h1>
      </footer>
    </div>
  );
}

export default Features;
