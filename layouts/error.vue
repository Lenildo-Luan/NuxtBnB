<template>
    <div style="text-align: center;">
        <img src="https://media.giphy.com/media/JtLrtaN4VPoKXJRKGB/giphy.gif">
        <h1>ERROR!</h1>
        {{ error.message }} {{ error.statusCode }}
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            required: true,
        }
    }
}
</script>