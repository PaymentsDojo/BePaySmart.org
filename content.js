

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
        }
    }

    module.exports = function(page){
    return content[page]
}