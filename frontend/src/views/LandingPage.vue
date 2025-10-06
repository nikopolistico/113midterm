<template>
  <div class="container-fluid p-0">
    <!-- Hero Section -->
    <section class="hero text-white text-center py-5">
      <div class="container">
        <!-- Avatar Section -->
        <div class="mb-4">
          <img
            :src="avatarUrl"
            alt="User Avatar"
            class="rounded-circle mb-3"
            style="width: 100px; height: 100px; object-fit: cover;"
          />
        </div>

        <h1 class="display-4 mb-3">Welcome to Your Dashboard</h1>
        <p class="lead">Hello, {{ username }}! You have successfully logged in.</p>
        <p class="mb-4">Explore the features and options available to you.</p>
        <router-link to="/" class="btn btn-light btn-lg">Go Back to Home</router-link>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features py-5 bg-light">
      <div class="container">
        <div class="row">
          <!-- Feature Item 1 -->
          <div class="col-lg-4 mb-4">
            <div class="card shadow-lg">
              <div class="card-body text-center">
                <h4 class="card-title">Profile Settings</h4>
                <p class="card-text">Update your profile, change settings, and more.</p>
                <router-link to="/profile" class="btn btn-primary">Manage Profile</router-link>
              </div>
            </div>
          </div>

          <!-- Feature Item 2 -->
          <div class="col-lg-4 mb-4">
            <div class="card shadow-lg">
              <div class="card-body text-center">
                <h4 class="card-title">Notifications</h4>
                <p class="card-text">Check your latest notifications and alerts.</p>
                <router-link to="/notifications" class="btn btn-primary">View Notifications</router-link>
              </div>
            </div>
          </div>

          <!-- Feature Item 3 -->
          <div class="col-lg-4 mb-4">
            <div class="card shadow-lg">
              <div class="card-body text-center">
                <h4 class="card-title">Help Center</h4>
                <p class="card-text">Get support or learn more about the platform.</p>
                <router-link to="/help" class="btn btn-primary">Go to Help Center</router-link>
              </div>
            </div>
          </div>

          <!-- Feature Item 4 -->
          <div class="col-lg-4 mb-4">
            <div class="card shadow-lg">
              <div class="card-body text-center">
                <h4 class="card-title">Messages</h4>
                <p class="card-text">Read and send messages to other users.</p>
                <router-link to="/messages" class="btn btn-primary">View Messages</router-link>
              </div>
            </div>
          </div>

          <!-- Feature Item 5 -->
          <div class="col-lg-4 mb-4">
            <div class="card shadow-lg">
              <div class="card-body text-center">
                <h4 class="card-title">Account Settings</h4>
                <p class="card-text">Change your account settings and preferences.</p>
                <router-link to="/account-settings" class="btn btn-primary">Manage Account</router-link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="bg-dark text-white text-center py-3">
      <p class="mb-0">© 2025 Your Company. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      username: this.$route.query.username,  // Get username from query parameters
      avatarUrl: this.$route.query.avatarUrl || 'https://avatar.iran.liara.run/public', // Default avatar if none provided
    };
  },
};
</script>

<style scoped>
/* Hero Section */
.hero {
  background: #4c5799; /* Primary color */
  color: white;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 700;
}

.hero p {
  font-size: 1.2rem;
}

/* Features Section */
.features .card {
  border-radius: 8px;
}

.features .card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.features .btn-primary {
  margin-top: 10px;
}

/* Footer Section */
footer {
  background: #343a40;
  color: white;
}

footer p {
  font-size: 1rem;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .features .col-lg-4 {
    margin-bottom: 30px;
  }
}
</style>
