import { unWrap, getErrorResponse } from '~/utils/fetchUtils'

export default function({ $config, $dataApi }, inject) {

    let stripe
    addScript()

    inject('stripe', {
        checkout,
    })

    function addScript() {
        const script = document.createElement('script')
        script.src = "https://js.stripe.com/v3/"
        script.onload = initStripe
        document.head.appendChild(script)
    }

    function initStripe() {
        stripe = window.Stripe($config.stripe.key)
    }

    async function createSession(home, start, end) {
        try {
            return unWrap(await fetch(`/api/stripe/create-session`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    home,
                    start,
                    end,
                })
            }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function checkout(homeId, start, end) {
        const home = (await $dataApi.getHome(homeId)).json
        console.log(home)
        const id = (await createSession(home, start, end)).json.id
        await stripe.redirectToCheckout({ sessionId: id })
    }
}