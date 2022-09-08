function Home() {
  return (
    <div>
      <nav class="top-bar">
        <div>
          <img src="logo.png" class="logo" />
          <h3 class="volunteer-hub-logo-text">Volunteer Hub</h3>
        </div>
        <div class="sign-up-log-in-btns">
          <a href="/sign-up" class="sign-up-btn">
            Sign Up
          </a>
          <a href="/log-in" class="log-in-btn">
            Log In
          </a>
        </div>
      </nav>

      {/* <!-- style="background-image: url('https://live.staticflickr.com/3005/2513481462_d900a71751.jpg');" --> */}
      <div class="volunteer-hub-div">
        <h1 class="volunteer-hub-text">Volunteer Hub</h1>
        <p class="volunteer-hub-description">
          An impactful application for finding volunteer opportunities and
          making a difference.
        </p>
        {/* <!-- Changing the world through volunteering. OR Changing the world 1 volunteer at a time. --> */}
      </div>

      <div class="features-content">
        <div class="find-volunteer">
          <h1 class="find-volunteer-h1">
            Find and post volunteer opportunities in your community and globally
            by location and other search tags
          </h1>
          <img src="logo.png" alt="" />
        </div>

        <div class="earn-hours">
          <img src="logo.png" alt="" />
          <h1 class="earn-hours-h1">Earn community service hours</h1>
        </div>

        <div class="message-others">
          <h1 class="message-others-h1">
            Communicate with those in your volunteer opportunities
          </h1>
          <img src="logo.png" alt="" />
        </div>

        <div class="sign-up-today">
          {/* <!-- <img src="logo.png" alt=""> --> */}
          <h1 class="sign-up-today-h1">Interested? Sign up today!</h1>
          <a href="/sign-up" class="sign-up-today-btn">
            Sign Up
          </a>
        </div>
      </div>

      <footer class="footer">
        {/* <!-- Maybe put some stuff in here --> */}
        <h1>Footer</h1>
      </footer>
    </div>
  );
}

export default Home;
