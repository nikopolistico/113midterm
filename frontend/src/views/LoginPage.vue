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
import VueCookies from 'vue-cookies';

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
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },

    async login() {
      this.errorMessage = null;  // Reset error message before trying to log in

      try {
        // Send login request to backend
        const response = await axios.post('https://one13midterm-1.onrender.com/login', {
          username: this.username,
          password: this.password,
        });
         // Log the response data to see if the token is in the response
        console.log('Login response:', response.data);
        // Set the token in cookies for 1 hour
        VueCookies.set('token', response.data.token, { expires: '1h', path: 'admin', secure: false, sameSite: 'Lax' });

        // Optionally, store the username in query params and redirect to admin dashboard
        this.$router.push({ name: 'admin', query: { username: this.username } });
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'An error occurred';
      }
    },
  },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
