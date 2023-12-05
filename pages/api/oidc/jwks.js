export default function handler(req, res) {
  res.status(200).json({
    "keys": [
      {
        "crv": "P-256",
        "kty": "EC",
        "x": "ipUEV1fw7UtxoMreatjixQ4fnqGiqgDaIRsqYT-Fsuw",
        "y": "Y9mh7MqMwb8OwweqtF9bm3NI6toclkDCcKg59M7btqk",
        "kid": "SCCK-PH-UAT-20210623-BDJ4R",
      }
    ]
   })
}
