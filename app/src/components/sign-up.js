function SignUp() {
  return (
    <div>
      <nav className="top-bar">
        <div>
          <img src="app\src\logo.png" alt="logo" className="logo" />
          <h3 className="volunteer-hub-logo-text">Volunteer Hub</h3>
        </div>
        <div className="SU-log-in-btn">
          <a href="/log-in" className="log-in-btn">
            Log In
          </a>
        </div>
      </nav>

      {/* <!-- Account Creation Form --> */}
      <form className="account-creation-form">
        {/* <!-- Account Creation Title --> */}
        <h1 className="account-creation-text">Account Creation</h1>

        {/* <!-- Name Div --> */}
        <div className="account-creation-items-style account-creation-name-div">
          <label>First Name</label>
          <input required />
          <label>Last Name</label>
          <input required />
          <p>
            {" "}
            <i>
              * Please be accurate; this will go on volunteer hour
              certificates/other awards and will be your username.
            </i>{" "}
          </p>
        </div>

        {/* <!-- Email Div --> */}
        <div className="account-creation-items-style account-creation-email-div">
          <label>Email</label>
          <input required />
          <p>
            {" "}
            <i>
              * This will be used to send email notifications, volunteer
              opportunity communications, used in log in, and for account
              changes/recovery.
            </i>
          </p>
        </div>

        {/* <!-- Contact Information --> */}
        <div className="account-creation-items-style">
          <label>
            <b>
              All of the following <u>contact information fields</u> are not
              required but good to have if applicable.
            </b>
          </label>
          <label>Phone Number</label>
          <input type="number" min="0" max="9" />

          <label>Discord</label>
          <input />

          <label>Whatsapp</label>
          <input />

          <label>Facebook</label>
          <input />

          <label>Snapchat</label>
          <input />

          <label>Instagram</label>
          <input />

          <label>Twitter</label>
          <input />

          <p>
            {" "}
            <i>
              * This and email will be shown to other users for communication
              regarding volunteer opportunities.
            </i>{" "}
          </p>
        </div>

        {/* <!-- Date of Birth Div --> */}
        <div className="account-creation-items-style account-creation-DOB-div">
          <label>Date of Birth</label>
          <input type="date" required />
          <p>
            {" "}
            <i>
              * Please be accurate; this will be used for determining volunteer
              opportunity eligibility.
            </i>{" "}
          </p>
        </div>

        <div className="account-creation-items-style account-creation-grade-level-div">
          <label>Grade Level</label>
          <input list="Grade Level" required />
          <datalist id="Grade Level">
            <option>Not started school yet (before preschool)</option>
            <option>Preschool</option>
            <option>TK (Transitional Kindergarten)</option>
            <option>Kindergarten</option>
            <option>1st grade</option>
            <option>2nd grade</option>
            <option>3rd grade</option>
            <option>4th grade</option>
            <option>5th grade</option>
            <option>6th grade</option>
            <option>7th grade</option>
            <option>8th grade</option>
            <option>9th grade</option>
            <option>10th grade</option>
            <option>11th grade</option>
            <option>12th grade</option>
            <option>College/University</option>
            <option>Out of school</option>
          </datalist>
          <p>
            {" "}
            <i>
              * Please be accurate; this will be used for determining volunteer
              opportunity eligibility.
            </i>{" "}
          </p>
        </div>

        {/* <!-- Password Div --> */}
        <div className="account-creation-items-style account-creation-password-div">
          <label>Password</label>
          <input type="password" required />

          <label>Re-confirm Password</label>
          <input type="password" required />
        </div>

        {/* <!-- submit form button --> */}
        <input
          className="account-creation-form-submit-btn"
          type="submit"
          value="Create Account"
        />
      </form>

      <footer className="footer">
        {/* <!-- Maybe put some stuff in here --> */}
        <h1>Footer</h1>
      </footer>
    </div>
  );
}

export default SignUp;
