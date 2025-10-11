<template>
  <div class="container-fluid p-0">
    <!-- Hero Section -->
    <section class="hero text-white text-center py-5">
      <div class="container">
        <!-- Avatar Section -->
        <div class="mb-4">
          <img
            :src="adminAvatar"
            alt="Admin Avatar"
            class="rounded-circle mb-3"
            style="width: 100px; height: 100px; object-fit: cover;"
          />
        </div>

        <h1 class="display-4 mb-3">Welcome, Administrator</h1>
        <p class="lead">You are managing all user credentials.</p>
        <p class="mb-4">Manage user accounts, credentials, and other settings.</p>
        <router-link to="/" class="btn btn-light btn-lg">Go Back to Home</router-link>
      </div>
    </section>

    <!-- Users Management Section -->
    <section class="users-management py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-4">Manage Users</h2>
        <div class="row">
          <!-- User List -->
          <div class="col-12">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.status }}</td>
                    <td>
                      <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
import VueCookies from 'vue-cookies';
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      adminAvatar: this.$route.query.avatarUrl || 'https://avatar.iran.liara.run/public', // Admin's default avatar
      users: [],  // Array to store users data
      token: VueCookies.get('token') || '',  // Admin's token from cookies
    };
  },
  created() {
    // Log the token and check if it's found
    const token = VueCookies.get('token');
    if (!token) {
      console.log('No token found in cookies');
      this.$router.push({ name: '/' });  // Redirect to login if no token is available
    } else {
      console.log('Token from cookies:', token);  // Log the token if available
      this.fetchUsers();  // Fetch all users when the component is created
    }
  },
  methods: {
    // Method to fetch all users from the API
    async fetchUsers() {
      try {
<<<<<<< HEAD
        const response = await axios.get('http://localhost:3000/users/', {
=======
        const response = await axios.get('https://one13midterm-1.onrender.com/users/', {
>>>>>>> 66a66899a0c91ef4502c8d1ddb876d2135714737
          headers: { 'Authorization': `Bearer ${this.token}` },
        });
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    // Method to delete user
    async deleteUser(id) {
      try {
<<<<<<< HEAD
        await axios.delete(`http://localhost:3000/users/${id}`, {
=======
        await axios.delete(`https://one13midterm-1.onrender.com/users/${id}`, {
>>>>>>> 66a66899a0c91ef4502c8d1ddb876d2135714737
          headers: { 'Authorization': `Bearer ${this.token}` },
        });
        this.fetchUsers();  // Refresh the user list after deletion
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
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

/* Users Management Section */
.users-management .table th, .users-management .table td {
  text-align: center;
}

.users-management .btn-sm {
  margin-right: 5px;
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
}
</style>
