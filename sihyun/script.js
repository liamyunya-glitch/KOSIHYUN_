document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. 말풍선(bubble) 나타나는 효과 ---
    // IntersectionObserver 옵션 설정 
    var bubbleOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // 말풍선 관찰자 생성
    const bubbleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 클래스 추가해서 화면에 보이게 함
                entry.target.classList.add('active');
                // console.log('말풍선 보임 ->', entry.target); // 디버깅용
                
                // 
                observer.unobserve(entry.target);
            }
        });
    }, bubbleOptions);

    // 말풍선 찾아서 등록하기
    var bubbles = document.querySelectorAll('.bubble');
    // console.log("찾은 말풍선 개수: " + bubbles.length);
    for (var i = 0; i < bubbles.length; i++) {
        var b = bubbles[i];
        b.classList.add('reveal-item', 'reveal-bubble');
        
        // 딜레이 설정
        b.style.transitionDelay = (i * 150) + 'ms';
        bubbleObserver.observe(b);
    }



    // --- 2. 숫자 올라가는 효과 (stats) ---
    var statsObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // 숫자가 대문짝만하게 써진 넘버이면 애니메이션 시작!
                if (entry.target.classList.contains('stats-large-number')) {
                    // console.log('숫자 카운트 애니메이션 시작!!');
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



    // --- 3. 타임라인 단계별 효과 ---
    
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



    // --- 4. 카드(card) 나타나는 효과 ---
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



    // --- 5. 대망의 숫자 카운트 기능 (여기 건들면 오류 ) ---
    function animateValue(obj) {
        var origText = obj.textContent;
        // console.log("원래 글자: " + origText);
        
        var match = origText.match(/\d+/);
        if (match == null) {
            // console.log("숫자 없어서 리턴");
            return; 
        }
        
        var targetVal = parseInt(match[0]);
        var suffix = origText.replace(match[0], ''); // %, 명 이런 단위
        
        var start = null;
        var duration = 1500; // 1.5초

        function animateStep(timestamp) {
            if (!start) start = timestamp;
            var progress = (timestamp - start) / duration;
            
            if (progress > 1) {
                progress = 1; // 1 넘어가면 안되니까 강제로 고정
            }
            
            // 소수점 떼고 정수만
            var current = Math.floor(progress * targetVal);
            obj.textContent = current + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(animateStep);
            } else {
                // 다 끝나면 혹시 모르니까 원래 글자로 덮어씌움
                obj.textContent = origText;
                // console.log("카운팅 완!!");
            }
        }
        
        window.requestAnimationFrame(animateStep);
    }
});
