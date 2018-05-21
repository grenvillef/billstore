module.exports = {

    'facebookAuth' : {
            'clientID'      : 'your-secret-clientID-here', // your App ID
                    'clientSecret'  : 'your-client-secret-here', // your App Secret
                            'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
                                },

                                    'twitterAuth' : {
                                            'consumerKey'       : 'your-consumer-key-here',
                                                    'consumerSecret'    : 'your-client-secret-here',
                                                            'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
                                                                },

        'googleAuth' : {
                'clientID'      : '42373270037-iqvr64ea9rvl31d8lcdfcmgap2p7pdfv.apps.googleusercontent.com',
                'clientSecret'  : 'QDUpG6ql-pty2vw69Omi4YAX',
                'callbackURL'   : 'http://www.billstore.nl:3000/auth/google/callback'
        }

};



