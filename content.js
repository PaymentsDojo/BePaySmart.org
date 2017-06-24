

content = {
    "blockchain":{
        "title":"BLOCKCHAIN",
        "teaserText": "Blockchain is going to to be a big buzzword in a few years. It's a secure, fast, public yet private, de-centralised system that can transfer anything from euros to houses!",
        "youtubeLink": "https://www.youtube.com/embed/IhP3J0j9JmY",
        "paragraphs": [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque finibus aliquam vulputate. Nunc vitae libero a sapien rutrum dignissim. Donec mattis pharetra libero. Mauris laoreet erat quis augue efficitur dignissim. Curabitur volutpat auctor eros tincidunt mattis. Aenean nec euismod magna. Nullam ut nisi dictum sapien vestibulum vestibulum at quis erat. Aenean in turpis eu libero sagittis ultricies. Sed sagittis est eget enim tincidunt elementum. Donec non viverra tortor. Aenean at neque quis leo gravida elementum in quis metus. Phasellus vel pretium nisl, nec rutrum velit.",
            "Maecenas consequat, justo et pharetra sollicitudin, nisi ante varius diam, nec aliquet dui augue elementum nibh. In rhoncus, massa mattis varius vulputate, quam tellus condimentum urna, in laoreet ante erat vitae tellus. Donec quis justo fringilla, vehicula odio vitae, varius massa. In a tincidunt dui. Nam sed consequat augue. Nulla nec arcu ex. Ut in lacus libero. Curabitur at justo in risus maximus commodo pulvinar nec sapien. Integer maximus et nisl id tincidunt. Nullam gravida, tortor sed consectetur fermentum, lectus elit varius odio, ac venenatis dolor justo eget risus. Suspendisse lectus dolor, egestas sed velit vel, posuere condimentum sem. Vestibulum luctus elit nec ipsum viverra, eget facilisis ante sodales. Morbi mauris leo, blandit vel scelerisque eget, tempor eget felis."
        ]
    }
}

module.exports = function(page){
    return content[page]
}