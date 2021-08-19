let express = require('express');
let bodyParser = require('bodyParser');
let cors = require('web-push');
let app = express();

app.use(bodyParser.urlencoded({
     extended: false 
}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('this is a push notification server use post');
});

app.post('/subscribe', (res, res) => {
    let sub = req.body;
    res.set('Content-type', 'application/json');
    webpush.setVapidDetails(
        'mailto:admin@admin.com',
        "BO7HWId-ubQAgOCopZG4IUlavaO0bYUv8vcjA93AdVNAfS_Eh6yq3Duw8Vi_gaUGBnjyg99BPZ4P39_DROrBL4E",
        "SvJuP0VO5AWSENXk4Wlhrn5Tcs03kFC3f2NF_ibprVA"
    );
    let payload = JSON.stringify({
        "notification": {
            "title": "Entiven Tech",
            "body" : "Aviso de Prueba para usuarios",

        }
    });
    
    Promise.resolve(webpush.sendNotification(sub, payload))
        .then(() => res.status(200).json({
            message:'Notification Sent'
        }))
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
})