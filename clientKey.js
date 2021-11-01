//Stripe Keys
const keys = (process.env.NODE_ENV === 'dev') ?
    //Test Keys
     {
        "d9182703-af59-4cce-bb5d-7e1d0f85f226":
            {
                name: "BT Test Account",
                product: process.env.BT_PRODUCT,
                account: process.env.BT_ACCOUNT

            },
    }
    :
    //Live Keys
    {
        "d9182703-af59-4cce-bb5d-7e1d0f85fa46":
            {
                name: "Nancy Ma International",
                product: process.env.MA_PRODUCT,
                account: process.env.MA_ACCOUNT

            },
        "0ffec302-c438-4bc5-9cff-2608e492b4e3":
            {
                name: "Migraine Mastery",
                product: process.env.MIGRAINE_PRODUCT,
                account: process.env.MIGRAINE_ACCOUNT
            },
        "fe90f5d0-f606-40a0-bfbd-144b32ca0304":
            {
                name: "PPP Test",
                product: process.env.MA_PPP_TEST_PRODUCT,
                account:  process.env.MA_ACCOUNT
            }
    }

module.exports = keys
