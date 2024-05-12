import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()
const apiKey = process.env.STRIPE_KEY
const stripe = new Stripe(apiKey);

export const createPayment = async(uid,productId,qty, price,name)=>{

    const session = await stripe.checkout.sessions.create({
        success_url: `${process.env.SELF_ADDRESS}/pay/paymentSuccess?uid=${uid}&productId=${productId}&qty=${qty}&price=${price}&name=${name}`,
        cancel_url : `${process.env.SELF_ADDRESS}/pay/paymentFail`,     
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: price*100.00,
                    product_data: {
                        name: name
                    },
                },
                quantity: qty,
            },
        ],
        mode: "payment",
        allow_promotion_codes: true,
    });
    return session?.url;

}