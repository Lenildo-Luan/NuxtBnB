<template>
    <div>
        <div style="display: flex;">
            <img v-for="image in home.images" :key="image" :src="image" width="200px" height="150px">
        </div>
        {{home.title}} <br>
        ${{ home.pricePerNight }} / night <br>
        <img src="/images/marker.svg" width="20px" height="20px"> {{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }} <br/>
        <img src="/images/star.svg" width="20px" height="20px"> {{ home.reviewValue }} <br>
        {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{home.bathroom}} bath <br>
        <div style="height: 800px; width: 800px;" ref="map"></div>
        <div v-for="review in reviews" :key="review.objectID">
            <img :src="review.reviewer.image"> <br>
            {{ review.reviewer.name }} <br>
            {{ formateDate(review.date) }} <br>
            <short-text :text="review.comment" :target="150" /> <br>
        </div>
        <img :src="user.image"> <br>
        {{ user.name }} <br>
        {{ formateDate(user.joined) }} <br>
        {{ user.reviewCount }} <br>
        {{ user.description }} <br>
    </div>
</template>

<script>
import homes from '~/data/homes'
export default {
    head() {
        return {
            title: this.home.title,
        }
    },
    mounted() {
        this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng);
    },
    async asyncData({params, $dataApi, error}) {
        const responses = await Promise.all([
            $dataApi.getHome(params.id),
            $dataApi.getReviewsByHomeId(params.id),
            $dataApi.getUsersByHomeId(params.id),
        ])

        const badResponse = responses.find((response) => !response.ok);
        if(badResponse) return error({statusCode: badResponse.status, message: badResponse.statusText})

        return {
            home: responses[0].json,
            reviews: responses[1].json.hits,
            user: responses[2].json.hits[0],
        };
    },
    methods: {
        formateDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString(undefined, {month: 'long', year: 'numeric'});
        }
    }
}
</script>