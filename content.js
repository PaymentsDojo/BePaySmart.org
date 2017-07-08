

    content = {
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
        }
    }

    module.exports = function(page){
    return content[page]
}