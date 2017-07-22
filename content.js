    content = {
        "introduction":{
          "title": "Introduction",
          "teaserText": "Welcome to the Drogheda Digital Payments website",
          "youtubeLink": "https://www.youtube.com/embed/IhP3J0j9JmY",
          "paragraphs": [
            "Welcome to the Drogheda Digital Payments website! In this website you will find how digital payments are already affecting our everyday lives, and how new types are sure to affect it even more. Brace yourselves as you embark on a journey to find out what, and why, digital payments are, and why we use them."
          ] 
        },
        "histcurrency":{
            
        },
        "moneyobsolete":{
            "title": "Why is money becoming obsolete?",
            "teaserText": "We've used it for so long, why are we dropping it now?",
            "youtubeLink": "https://www.youtube.com/embed/IhP3J0j9JmY",
            "paragraphs": [
                "As has been told in the History of Currency section, currency has existed in some form or another for as long as humans have been around – through bartering to coins to cash. Physical cash and money are becoming quite obsolete and you may be asking yourself, why?",
                "The growth of technology has led to many advances! Making purchases via card or electronic transfer are much more convenient and save time. Even more time can be saved as all transactions move towards biometric payments – time can be saved by not having to swipe your card, enter your PIN etc. All the security you need will be held within yourself alone. How many times have you lost money and just can’t find it?",
                "That problem just doesn’t exist with biometric payments, as you’ll always have yourself when making a purchase. With the rise of credit cards, contactless payments and crpytocurrencies like Bitcoin, the need for cash is becoming obsolete.  There are quite a few factors in making the progress away from cash quite difficult. The human race are attached to cash as it’s been around for so long and it is universally used by lots of vendors and users. The restrictions that are also in place for the youth having bank accounts also play a part in people being attached to cash. It can be seen that the progress away from cash more of a slog than a sprint."
            ]
        },
        "blockchain":{
            "title":"BLOCKCHAIN",
            "teaserText": "A new way to securely store information!",
            "youtubeLink": "https://www.youtube.com/embed/IhP3J0j9JmY",
            "paragraphs": [
                "Blockchain is a new way of storing information. It uses multiple servers to store the same information so that if one is attacked the data is not lost.",
				"Put it like this, a just sounds like a kind of database with built-in validation—which it is. ",
				"However, the clever bit is that the data is not stored in a one individual location or managed by any single person. Instead, it is said to be distributed, existing on several computers at the same time in such a way that anybody with an interest can maintain a copy. ",
				"Better still, the block validation system ensures that nobody can change the records. Rather, old transactions are preserved forever and new transactions are added to the data irreversibly.",
				"Effectively a blockchain is a kind of independent, transparent, and permanent database coexisting in multiple locations and shared by a community. Therefore, it’s sometimes referred to as a mutual distributed ledger (MDL). ",
				"Blockchains are incredibly secure against attacks, as a potential attacker would have to attack all the servers at once, rather than attacking one and everything going down. There could be thousands of different machines, and all would have to be attacked!",
				"This would require tons upon tons of power to attack, and that is simply too impractical.", 
				"There’s nothing new about MDLs, their origins traceable to 1976. But for a long time, they were regarded as complicated and not altogether safe.",
				"But if the registry was not owned by a central third party but sitting on multiple machines and everybody had copies, it would have resilience and looking up transactions would be quick. With the data being immutable once entered in the ledger, it would provide a permanent record that financial regulators and auditors could quickly fall in love with.",
				"In other words, it’s a souped-up audit trail for anything you like, not just a cryptocurrency. It’s not just one system. Indeed, the situation can be compared of the database revolution of the 1970s: there wasn’t just one type or structure for a database, you created the specific database you wanted for your own purposes."	
            ]
        },
        "contactless":{
            
        },
        "smartphones":{
            
        },
        "biometrics": {
            "title": "BIOMETRICS",
            "teaserText": "Security using your physical traits.",
            "youtubeLink": "https://www.youtube.com/embed/88Rjg8gM_DI",
            "paragraphs": [
                "Biometrics is using a person’s physical traits ( fingerprints , iris , veins etc) to identify them.This has many uses , such as allowing someone to access their accounts without them having to remember their passwords, while still being as secure ( or even more) as a password.",
                "<h3>Types of biometrics:</h3> Fingerprint recognition<br> Iris recognition<br> Facial recognition<br> Voice recognition",
                "Which biometrics to use depends on how secure you need to be. You may even want a combination of them.",
                "<h3>Fingerprint:</h3>Analysing the ridges on somebody's finger and comparing them",
                "<h3>Iris:</h3>Analysing the eye patterns and veins and comparing them",
                "<h3>Facial:</h3>Analysing the facial patterns and comparing them",
                "<h3>Voice:</h3>A little more complicated, turning a voice into a computer readable format and comparing it",    
                "<h3>Biometrics in practice:</h3>",
                "Biometrics isn’t just useful for businesses , it’s useful for even the common person, If you have ever reused a password or got frustrated at how many you had to remember, Biometrics can help you!"
            ]
        },
        "futuredigital": {
            "title": "THE FUTURE OF DIGITAL PAYMENTS",
            "teaserText": "So we’ve seen blockchain, biometrics and smartphones. But where else is the future going?",
            "youtubeLink": "https://www.youtube.com/embed/y6Sxv-sUYtM",
            "paragraphs": [
                "We’ve only covered a few select points in the website. The digital payments landscape is rapidly changing, with new updates being unveiled every day. For example, Microsoft have launched the Microsoft cloud, allowing small businesses anywhere that there’s internet, allowing people in poorer countries to accept digital payments anywhere.",
                "Robots are also going to be big in the digital payments landscape. Robots have already taken over many tasks such as building cars (and many other production lines) , and are destined to take over other tasks such as ordering in a restaurant.",
                "To summarize, the future is a big place. Almost every prediction from 30 years ago was too optimistic (flying cars), or too pessimistic (smartphones). The truth is, no one really knows  what’s going to happen in the future. No one.",
            ]
        }
    }

    module.exports = function(page){
    return content[page]
}