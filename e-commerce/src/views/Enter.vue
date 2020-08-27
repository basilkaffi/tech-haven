<template>
    <div class="enter">
        <form>
            <h2 class="text-center" v-if="enter==='register'">Daftar</h2>
            <h2 class="text-center" v-else-if="enter==='login'">Masuk</h2>
            <div class="form-group">
                <input type="text" v-if="enter==='register'" v-model="username" class="form-control" placeholder="Name...">
            </div>
            <div class="form-group">
                <input type="email" v-model="userEmail" class="form-control" placeholder="Email...">
            </div>
            <div class="form-group">
                <input type="password" v-model="userPass" class="form-control" placeholder="Password...">
            </div>
            <div class="btn-container form-group">
                <button class="btn btn-info" v-if="enter==='register'" @click.prevent="register">Daftar</button>
                <button class="btn btn-info" v-else-if="enter==='login'" @click.prevent="login">Masuk</button>
                <button class="btn btn-outline-info" @click.prevent="back">Kembali</button>
            </div>
            <p v-if="enter==='register'">Already have an account? <a @click.prevent="showLogin">login</a></p>
            <p v-else-if="enter==='login'">Doesn't have an account? <a @click.prevent="showRegister">register</a></p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Enter',
    data() {
        return {
            username: null,
            userEmail: null,
            userPass: null
        }
    },
    computed: {
        enter() {
            return this.$route.params.enter;
        }
    },
    methods: {
        showLogin(){
            this.$router.push({name: 'Enter', params: { enter: 'login' }})
        },
        showRegister(){
            this.$router.push({name: 'Enter', params: { enter: 'register' }})
        },
        back(){
            this.$router.push('/products')
        },
        register() {
            const data = {
                name: this.username,
                email: this.userEmail,
                password: this.userPass
            }
            this.username = null
            this.userEmail = null
            this.userPass = null
            this.$store.dispatch('register', data)
        },
        login() {
            const data = {
                email: this.userEmail,
                password: this.userPass
            }
            this.userEmail = null
            this.userPass = null
            this.$store.dispatch('login', data)
        }
    }
}
</script>

<style lang="scss">
    .enter {   
        width: 100%;
        max-width: 300px;
        margin: auto;
        transform: translateY(50%);
        color: darkslategray;
        form {
            padding: 5vh 2vw 1vh 2vw;
            border-radius: 1rem;
            background-color: white;
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        }
        h2 {
            margin-bottom: 5vh;
        }
        .btn-container {
            display: flex;
            justify-content: space-between;
        }
        a {
            cursor: pointer;
        }
        p {
            text-align: center;
        }
    }
</style>