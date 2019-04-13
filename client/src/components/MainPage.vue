<template>

<div class="mainpage">
    <div class="carousel1">
    <!-- <v-carousel
        delimiter-icon="stop"
        prev-icon="mdi-arrow-left"
        next-icon="mdi-arrow-right"
        :style="{'height': this.carouselHeight}">
        <v-carousel-item
        v-for="(item, i) in items"
        :key="i" style="height: auto"
        :src="item.src"></v-carousel-item>
    </v-carousel> -->
    <v-parallax
        transition="fade-transition"
        v-scroll="onScroll" id="parallax2" v-bind:style="{ opacity: 40-offsetTop}"
        height="650"
        src="http://genchi.info/images/pixel-wallpaper-17.png"
    >
    <h1 class="font-weight-black display-4" v-bind:style="{ opacity: 10-offsetTop}">OldMMOFriendFinder</h1>
    <v-timeline>
        <v-timeline-item
        color="light-blue lighten-5"
        fill-dot
        right
        >
        <v-card v-scroll="onScroll" id="firstcard" v-bind:style="{ opacity: 10-offsetTop}">
            <v-card-title class="light-blue lighten-4">
            <v-icon
                dark
                size="42"
                class="mr-3"
            >
                mdi-magnify
            </v-icon>
            <h2 class="display-1 white--text font-weight-light">Step 1</h2>
            </v-card-title>
            <v-container>
            <v-layout>
                <v-flex>
                Register, Login and boom! You are now closer to finding your lost MMO friends.
                </v-flex>
            </v-layout>
            </v-container>
        </v-card>
        </v-timeline-item>

        <v-timeline-item
        color="light-blue lighten-2"
        fill-dot
        left
        small
        >
        <v-card v-scroll="onScroll" id="firstcard2" v-bind:style="{ opacity: 10-offsetTop}">
            <v-card-title class="light-blue lighten-2 justify-end">
            <h2 class="display-1 mr-3 white--text font-weight-light">Step 2</h2>
            <v-icon
                dark
                size="42"
            >mdi-home-outline</v-icon>
            </v-card-title>
            <v-container>
            <v-layout>
                <v-flex >
                    Manage your profile, setting up all your MMO usernames. Make sure to assign each of them the respective MMO game.
                </v-flex>
            </v-layout>
            </v-container>
        </v-card>
        </v-timeline-item>

        <v-timeline-item
        color="light-blue darken-1"
        fill-dot
        right
        >
        <v-card v-scroll="onScroll" id="firstcard3" v-bind:style="{ opacity: 10-offsetTop}">
            <v-card-title class="light-blue darken-1">
            <v-icon
                class="mr-3"
                dark
                size="42"
            >
                mdi-email-outline
            </v-icon>
            <h2 class="display-1 white--text font-weight-light">Step 3</h2>
            </v-card-title>
            <v-container>
            <v-layout>
                <v-flex>
                    Once you have managed your profile, you can search for your friends MMO in game names.
                </v-flex>
            </v-layout>
            </v-container>
        </v-card>
        </v-timeline-item>
    </v-timeline>
    <h2></h2>
    </v-parallax>
    </div>
    <div class="carousel2">
    <v-parallax
        transition="fade-transition"
        v-scroll="onScroll" id="parallax2" v-bind:style="{ opacity: offsetTop-39 }"
        height="500"
        src="http://genchi.info/images/pixel-wallpaper-17.png"
    >
        <v-timeline-item
        color="light-blue darken-3"
        fill-dot
        left
        small
        >
            <v-card v-scroll="onScroll" id="lastcard2" v-bind:style="{ opacity: offsetTop-150 }">
                <v-card-title class="light-blue darken-3 justify-end">
                <h2 class="display-1 mr-3 white--text font-weight-light">Step 4</h2>
                <v-icon
                    dark
                    size="42"
                >
                    mdi-account-multiple-outline
                </v-icon>
                </v-card-title>
                <v-container>
                <v-layout>
                    <v-flex>
                        Now, wait for an email or notification to your account to pop up!
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card>
            </v-timeline-item>

            <v-timeline-item
            color="light-blue darken-4"
            fill-dot
            right
            >
            <v-card v-scroll="onScroll" id="lastcard" v-bind:style="{ opacity: offsetTop-150 }">
                <v-card-title class="light-blue darken-4">
                <v-icon
                    class="mr-3"
                    dark
                    size="42"
                >
                    mdi-phone-in-talk
                </v-icon>
                <h2 class="display-1 white--text font-weight-light">Step 5</h2>
                </v-card-title>
                <v-container>
                <v-layout>
                    <v-flex>
                        YOU HAVE NOW RECONCILED WITH YOUR LONG LOST MMO BUDDY!
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card>
        </v-timeline-item>
        <h1 v-scroll="onScroll" id="lastcard" v-bind:style="{ opacity: offsetTop-230 }">{{ msg }}</h1>
    </v-parallax>
    </div>
  </div>

</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
    return {
        msg: 'Enjoy your time!',
        offsetTop: 0
        //carouselHeight: 0,
        // items: [
        //     {
        //         src: 'https://s3.amazonaws.com/ext-asset/fb-image.jpg'
        //     },
        //     {
        //         src: 'https://www.idcgames.com/media_xml/mediaFiles/wallpaper-16071418042016-1920x1080.jpg'
        //     },
        //     {
        //         src: 'https://1.bp.blogspot.com/-sp9QgSc5UyY/WvRTpdXNGUI/AAAAAAAAC6g/xcFvfrzT11AzGUKDgabCC7zRhWKy5IuRACLcBGAs/s1600/lineage-2-revolution-mobile-mmorpg-lancamento-1440x500.png'
        //     },
        //     {
        //         src: 'http://www.oddonegames.com/home/wp-content/uploads/2017/02/S-1.jpg'
        //     }
        //     ]
        }
    },
    methods: {
        onScroll (e) {
            this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
        }
        // getCarouselHeight () {
        //     var item = document.getElementsByClassName('v-image__image--cover')
        //     this.carouselHeight = item[0].clientHeight + 'px'
        // }
    },
    mounted () {
        // this.getCarouselHeight()
    }
}
</script>

<style scoped>
.title {
    padding: 20px;
    height: 330px;
    overflow: hidden;
}

.font-weight-black.display-4 {
    font-size: 50px !important;
}

.mainpage {
    object-fit: fill  !important;
    margin: 0;
    height: 100vh;
}

.container.fluid {
    background-image: url('http://genchi.info/images/pixel-wallpaper-17.png') !important;
}

.v-timeline-item__dot, .v-timeline-item__inner-dot{
    opacity: 0 !important;
}

.carousel1 {
    background-color: #79c9f9;
}

.carousel2 {
    background-color: #6992f2;
}
</style>
