export const dialogflowConfig = {
    "type": "service_account",
    "project_id": "leavehandler-qhaeqp",
    "private_key_id": "692ac4ce337c4c34951de0bfcab2d83ef3273243",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZzHeTRnRsLDkf\nJZjgMFsOp+1Q6JXkK3T6vEh09UQTRn/mx0c6S9BkWy2tSVqR516BEoi50us7D9cb\n0JybUgsOILSFEvYmWa2fHVbMCLuMpn818WD/PpEkQ7ouxY4i6PsyBiWlg4awX4bE\n4VLiIyUG2FkdauE5gwDPrg0Gje/cAY0S7bc0n5TCE2dbJy2vTFN920QnNErq+fOJ\nq02s1j0xMSAPrb1N65/CJ2eIDQNcDGZCRnoTULOMUcud4NzimL2Kuup8Pl9coPqd\n5eWPnpQc5TcPPjVpUwmTt+KbhFRDJ0X1cBmgKCCuFceL0K3EY4Y7Z/bTI2ksxCl0\ngl3ihPjTAgMBAAECggEAAxpUSHHZg20B3KgRdyguiT/qiUY2/yArXiMZOSlWsJuc\nLjJ/7kcEOgRz2yMkui1nUu7A/zy6WIYPlM2Hsvgb64tFvHDvts4nmLu3RS2JVntM\nwVJQr8eOvnXZ4i6y/rD+WyZr74wMetjG4mkqCsoLY1STuG/nCNsNQ5LW4VVbqcZe\nfE+zp+LN5mZj8X6M89Gtx69OoHStl4TLuMEvdrArf3+J9ktYB7P95FSpp8e/V5zX\nPu7dWuJcEAjw6CThfyLGIHpAU1nXVRO3beCU1YiiMkGTkvlkz/bz6L5C+PS6tOwV\njNP4nPFmLwJdFDvjV8zVcaoEdsC9wzGtXSPrXnOEAQKBgQDxm4VP90wVzTDHvt/S\nduhh8fpTMWCXuns+Iag5ea85HBEFKcA887W2cW7E4VDmYuZQ/pKcpsznhSf0nl+s\naCGJ9eXySqim87bp6P5dzmHQcG7D0jiyPwG+Lt6xq+WvYWydmhx5ccq0+wNAqbyG\nmudc7dTpCbnJ/2kJInwIvKd20wKBgQDmxd2U9Yur9XIFXaDkq3e0HrpgzXAQuZLu\nvlC0omPtDOO/uxIP7Cn1Sol6lv7j1+v+ejxU2xc7snA7DaNJhCu6UkiMRdQ7CXvL\nW2zF9sIvXkpC1JCVh2xKeNE57K92RiOiKng+9ZrN1pEWBzHKNNxs+3c8ATMCLTxD\npjbQy982AQKBgFEAZw2MR4H3rScKo1eYbgiIa/iAUXYNG0yVVCUQ2uI2uq4UdVL6\nEi38kbqIH+tdtQHql5TVh1UHm4GzpzfSIYxzWIiG50wx4V1CtCUXEEwlpb0ZOdDo\nttjgNeEzVGocK6IbDPjaYa+TiF+hiIdIX9EUG5GVpShH7RsW6Ka1OR/pAoGBAKY0\nG0INFmriexwiMp5+X9f5yYGuc+eXv5rytm1iB1XS0rRjpr6Q+CcRZ7JCzZCLEgxV\nPN5gbHsyKGJfkBqCdnvahyV/pTpfuijbz5tD/Nbgsdsv/HG09ukr2oQ9UqF8Im3I\n6JFvke5telDDHbjkGVzkPxuYQYRvz9do/lGig0ABAoGARlwcWFZVYNRB2F76KagH\nJCUKgQW5DnOdlKJWM1s8o8tWhaZVEQKdr4dTOYoLnYt/ms3ESl/cB7ybh6TVJQ32\nEJuaPU5IpjFJ3byjvcpYoERBj8hOwLxzQspJiMSKzcXIiNSGFGNYjEHyFeI9Holx\nOHZZ93mQbfN0WwisxWvDRmA=\n-----END PRIVATE KEY-----\n",
    "client_email": "dialogflow-ffevul@leavehandler-qhaeqp.iam.gserviceaccount.com",
    "client_id": "103069810815825406686",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dialogflow-ffevul%40leavehandler-qhaeqp.iam.gserviceaccount.com"
}


export const chartConfigs = [
    {
        backgroundColor: 'white', //#e53935
        backgroundGradientFrom: '#e53935',
        backgroundGradientTo:  '#AE0808', //'#b71c1c',
        color: (opacity = .5) => `rgb(255, 255, 255, ${opacity})`,
        //color: (opacity = 1) => `red`,
        style: {
            borderRadius: 16,
            fontSize : 18,
            fontWeight : 'bold'
        }
    },
    {
        backgroundColor: '#d20602',
        backgroundGradientFrom: '#e53935',
        backgroundGradientTo: '#ef5350',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },
    {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },

    {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
    },
    {
        backgroundColor: '#b90602',
        backgroundGradientFrom: '#e53935',
        backgroundGradientTo: '#ef5350',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },
    {
        backgroundColor: '#000000',
        backgroundGradientFrom: '#000000',
        backgroundGradientTo: '#000000',
        color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
    }, {
        backgroundColor: '#ffff',
        backgroundGradientFrom: '#ffff',
        backgroundGradientTo: '#ffff',
        color: (opacity = 1) => `rgba(${51}, ${179}, ${255}, ${opacity})`,
        style: {
            borderRadius: 16,
            fontSize : 18,
            fontWeight : 'bold',
            color : "black" 
        }
    },
    {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        }
    },

    {
        backgroundColor: '#ff3e03',
        backgroundGradientFrom: '#ff3e03',
        backgroundGradientTo: '#ff3e03',
        color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`
    }
]
