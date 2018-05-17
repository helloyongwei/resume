!function() {
		let liTags = document.querySelectorAll('nav.menu > ul > li')
		for (let i = 0; i < liTags.length; i++) {
			liTags[i].onmouseenter = function(event) {
				let li = event.currentTarget
				li.classList.add('active')
			}
			
			liTags[i].onmouseleave = function(event) {
				let li = event.currentTarget
				li.classList.remove('active')
			}
		}

		var view = document.querySelector('nav.menu')
		var controller = {
			view: null,
			aTags: null,
			initAnimation: function() {
				function animate(time) {
					requestAnimationFrame(animate);
					TWEEN.update(time);
				}
				requestAnimationFrame(animate);
			},
			scrollToElement: function(elem){
				let top = elem.offsetTop
						
				let currentTop = window.scrollY
				let targetTop = top - 80
				let s = targetTop - currentTop
				var coords = {y: currentTop};
				var t = Math.abs((s/100)*300)
				if (t > 500) {
					t = 500
				}
				var tween = new TWEEN.Tween(coords)
					.to({y: targetTop}, t)
					.easing(TWEEN.Easing.Quadratic.InOut)
					.onUpdate(function() {
						window.scrollTo(0, coords.y)
					})
					.start()
			},
			bindEvents: function() {
				let aTags = this.view.querySelectorAll('nav.menu > ul > li > a')
				for (let i = 0; i < aTags.length; i++) {
					aTags[i].onclick = (event) => {
						event.preventDefault()
						let a = event.currentTarget
						let href = a.getAttribute('href')
						let elem = document.querySelector(href)
						this.scrollToElement(elem)
					}
				}
			},
			init: function(view) {
				this.view = view
				this.initAnimation()
				this.bindEvents()
			}
		}
	controller.init(view)
}.call()