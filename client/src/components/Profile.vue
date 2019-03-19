<template>
    <v-layout column>
        <v-flex xs6>
            <panel username="User">
                {{username}}
            </panel>
            <panel gamenames="Games">
                <!-- unique identifier for gamename is ign -->
                <div v-for="gamename in gamenames"
                    :key="gamename.ign">
                    {{gamename.game}}:
                    {{gamename.ign}}
                </div>
            </panel>
        </v-flex>
    </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
export default {
    components: {
        Panel
    },
    data () {
        return {
            username: null,
            gamenames: null
        }
    },
    mounted () {
        // do request for backend for username and gamenames from user
    }
}
</script>

<style scoped>

</style>
