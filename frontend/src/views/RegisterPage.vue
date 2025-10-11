<template>
  <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="card shadow-lg p-4" style="width: 100%; max-width: 400px;">
      <h1 class="text-center mb-4">Register</h1>
      <form @submit.prevent="register">
        <!-- Username Field -->
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <div class="input-group">
            <input
              type="text"
              v-model="username"
              id="username"
              class="form-control"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <div class="input-group">
            <input
              type="email"
              v-model="email"
              id="email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <!-- Password Field with Icon Inside -->
        <div class="mb-3 position-relative">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <input
              :type="passwordVisible ? 'text' : 'password'"
              v-model="password"
              id="password"
              class="form-control ps-5"  
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
        </div>

        <!-- Confirm Password Field with Icon Inside -->
        <div class="mb-3 position-relative">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <div class="input-group">
            <input
              :type="confirmPasswordVisible ? 'text' : 'password'"
              v-model="confirmPassword"
              id="confirmPassword"
              class="form-control ps-5"
              placeholder="Confirm your password"
              required
            />
            <i
              :class="confirmPasswordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'"
              class="position-absolute top-50 end-0 translate-middle-y me-3"
              style="cursor: pointer; font-size: 1.5rem;"
              @click="toggleConfirmPasswordVisibility"
            ></i>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>

      <!-- Error and Success Messages -->
      <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
        {{ successMessage }}
      </div>

      <!-- Login Link -->
      <p class="text-center mt-3">
        Already have an account? <router-link to="/">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
      errorMessage: null,
      successMessage: null,
      passwordVisible: false,  // To toggle password visibility
      confirmPasswordVisible: false,  // To toggle confirm password visibility
    };
  },
  methods: {
    // Toggle password visibility
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    // Toggle confirm password visibility
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
    async register() {
      this.errorMessage = null;
      this.successMessage = null;

      // Check if passwords match
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      try {
        const response = await axios.post('https://one13midterm-1.onrender.com/register', {
          username: this.username,
          password: this.password,
          email: this.email,
        });

        this.successMessage = response.data.message;
      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'An error occurred';
      }
    },
  },
};
</script>

<style scoped>
/* Optional custom styles */
.container {
  margin-top: 50px;
}

.card {
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-group {
  position: relative;
}

i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

/* Space for the icon inside the input */
.form-control.ps-5 {
  padding-left: 2.5rem;  /* Increase the left padding to give space for the lock icon */
}

</style>
