

    content = {
        "blockchain":{
            "title":"BLOCKCHAIN",
            "teaserText": "A new way to securely store information!",
            "youtubeLink": "https://www.youtube.com/embed/IhP3J0j9JmY",
            "paragraphs": [
                "Blockchain is a new way of transferring information. It uses multiple servers to store the same information so that if one is attacked the data is not lost.",
                "Put it like this, a just sounds like a kind of database with built-in validation — which it is.",
                "However, the clever bit is that the data is not stored in a one single location or managed by any particular person. Instead, it is said to be distributed, existing on several computers at the same time in such a way that anybody with an interest can maintain a copy. "
            ]
        },
        "biometrics": {
            "title": "BIOMETRICS",
            "teaserText": "Security using your physical traits.",
            "youtubeLink": "https://www.youtube.com/embed/88Rjg8gM_DI",
            "paragraphs": [
                "Biometrics is using a person’s physical traits ( fingerprints , iris , veins etc) to identify them.This has many uses , such as allowing someone to access their accounts without them having to remember their passwords, while still being as secure ( or even more) as a password.",
                "<h3>Types of biometrics:</h3><br> Fingerprint recognition<br> Iris recognition<br> Facial recognition<br> Voice recognition",
                "Which biometrics to use depends on how secure you need to be. You may even want a combination of them.",
                "<h3>Biometrics in practice</h3>",
                "Biometrics isn’t just useful for businesses , it’s useful for even the common person, If you have ever reused a password or got frustrated at how many you had to remember, Biometrics can help you!"
            ]
        }
    }

    module.exports = function(page){
    return content[page]
}