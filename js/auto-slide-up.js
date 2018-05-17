!function() {
    window.addEventListener('scroll', function(x) {
        findClosestAndRemoveOffset()
    })

    function findClosestAndRemoveOffset() {
        let specialTags = document.querySelectorAll('[data-x]')
        let minIndex = 0
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i
            }
        }
        let id = specialTags[minIndex].id
        let a = document.querySelector('a[href="#' + id + '"]')
        let li = a.parentNode
        let brothersAndme = li.parentNode.children
        for (let i = 0; i < brothersAndme.length; i++) {
            brothersAndme[i].classList.remove('highlight')
        }
        li.classList.add('highlight')
    }
}.call()