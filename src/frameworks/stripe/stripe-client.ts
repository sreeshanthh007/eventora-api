import Stripe from "stripe";

import { config } from "@shared/config";

export const stripe = new Stripe(config.stripe.secretKey as string,{
    apiVersion:"2025-08-27.basil"
});


export default stripe
