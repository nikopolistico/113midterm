<template>
  <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="card shadow-lg p-4" style="width: 100%; max-width: 400px;">
      <h1 class="text-center mb-4">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            v-model="username"
            id="username"
            class="form-control"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="mb-3 position-relative">
          <label for="password" class="form-label">Password</label>
          <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="password"
            id="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
          <!-- Eye Icon for Show/Hide Password -->
          <i
            :class="passwordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'"
            class="position-absolute top-50 end-0 translate-middle-y me-3"
            style="cursor: pointer; font-size: 1.5rem;"
            @click="togglePasswordVisibility"
          ></i>
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
      <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
        {{ errorMessage }}
      </div>
      <p class="text-center mt-3">
        Don't have an account? <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',  // Store the username entered by the user
      password: '',  // Store the password entered by the user
      errorMessage: null,  // To store error messages
      passwordVisible: false,  // To toggle password visibility
    };
  },
  methods: {
    // Toggle the visibility of the password
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },

    // Login method: Send POST request to backend to authenticate user
    async login() {
      this.errorMessage = null;  // Reset error message before trying to log in

      try {
        const response = await axios.post('https://one13midterm.onrender.com/login', {
          username: this.username,
          password: this.password,
        });

        // If login is successful, show a success message
        alert(response.data.message);  // You can redirect to a different page or handle it here
        this.$router.push({ name: 'landing', query: { username: this.username } }); // Redirect to LandingPage with username as query parameter

      } catch (error) {
        // If login fails, show an error message
        this.errorMessage = error.response?.data?.error || 'An error occurred';
      }
    },
  },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
