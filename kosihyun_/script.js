document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Chat bubble reveal animation
    var bubbleOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const bubbleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, bubbleOptions);

    var bubbles = document.querySelectorAll('.bubble');
    for (var i = 0; i < bubbles.length; i++) {
        var b = bubbles[i];
        b.classList.add('reveal-item', 'reveal-bubble');
        b.style.transitionDelay = (i * 150) + 'ms';
        bubbleObserver.observe(b);
    }

    // 2. Statistics number count-up observer
    var statsObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('stats-large-number')) {
                    animateValue(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    var statsNumbers = document.querySelectorAll('.stats-large-number');
    statsNumbers.forEach(function(num) {
        statsObserver.observe(num);
    });

    // 3. Timeline steps observer
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.15 });

    var timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach(function(step, idx) {
        step.classList.add('reveal-item', 'reveal-timeline');
        step.style.transitionDelay = (idx * 200) + 'ms';
        timelineObserver.observe(step);
    });

    // 4. Cards observer
    const cardObserver = new IntersectionObserver((entries, observer) => {
        for(let j=0; j<entries.length; j++) {
            let entry = entries[j];
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        }
    }, { root: null, threshold: 0.15 });

    var cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.classList.add('reveal-item', 'reveal-card');
        card.style.transitionDelay = `${index * 150}ms`;
        cardObserver.observe(card);
    });

    // 5. Count-up value animation helper
    function animateValue(obj) {
        var origText = obj.textContent;
        var match = origText.match(/\d+/);
        if (match == null) {
            return; 
        }
        
        var targetVal = parseInt(match[0], 10);
        var suffix = origText.replace(match[0], '');
        
        var start = null;
        var duration = 1500;

        function animateStep(timestamp) {
            if (!start) start = timestamp;
            var progress = (timestamp - start) / duration;
            
            if (progress > 1) {
                progress = 1;
            }
            
            var current = Math.floor(progress * targetVal);
            obj.textContent = current + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(animateStep);
            } else {
                obj.textContent = origText;
            }
        }
        
        window.requestAnimationFrame(animateStep);
    }
});
