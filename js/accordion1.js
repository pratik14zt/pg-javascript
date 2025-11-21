 const accordion = document.getElementsByClassName('accordion-item');

    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener('click', function () {

            // 1️⃣ Close all other accordion items
            for (let j = 0; j < accordion.length; j++) {
                if (j !== i) {
                    accordion[j].classList.remove('active');
                }
            }

            // 2️⃣ Toggle the clicked one
            this.classList.toggle('active');
        });
    }