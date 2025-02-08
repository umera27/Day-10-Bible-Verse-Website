fetchData();

//const btn = document.getElementById("btn");
//const btn2 = document.getElementById("btn2");
const selectColor=document.getElementById("selectColor");

function toggleContentDisplay(contentBody) {
    contentBody.style.display = contentBody.style.display === "none" || contentBody.style.display === "" ? "block" : "none";
}


selectColor.addEventListener('change', function () {
const selectedColor=selectColor.value;
   if (selectedColor==="black") {
       document.body.style.backgroundColor = "hsl(0, 0%, 10%)";
    document.body.style.color = "white";
    document.getElementById('img').style.filter="invert(1)";
    document.getElementById('selectColor').style.backgroundColor="black";
    document.getElementById('selectColor').style.color="white";
   }
    else{
        document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    document.getElementById('img').style.filter="invert(0)";
    document.getElementById('selectColor').style.backgroundColor="white";
    document.getElementById('selectColor').style.color="Black";
    }   
});


async function fetchData() {
    try {
        const response = await fetch('bibleverse.json');
        if (!response.ok) {
            throw new Error("Couldn't fetch data");
        }
        const data = await response.json();
        const section = document.querySelector('section');

        data.forEach(post => {
            const contentHeaderDiv = document.createElement('div');
            contentHeaderDiv.className = "content-header";
          //  contentHeaderDiv.id = "content-header";

            const showButton = document.createElement('button');
            showButton.innerText="";
            
//showButton.style.width="40px";
//showButton.style.height="40px";
            const contentBodyDiv = document.createElement('div');
            contentBodyDiv.className = "content-body";
            contentBodyDiv.id = "content-body";

            const buttons = ['button1', 'button2', 'button3'].map((className, index) => {
                const button = document.createElement('button');
                button.className = className;
                button.innerText = post.lists[index];
                return button;
            });

            const contentDiv = document.createElement('div');
            contentDiv.className = "content";

            const paragraphs = post.contents.map((content, index) => {
                const p = document.createElement('p');
          p.className = `content${index + 1}`;
          p.innerHTML = `<q>${content}</q>`;
                return p;
            });

            contentHeaderDiv.innerHTML = `<h4>${post.title}</h4>`;
            contentHeaderDiv.appendChild(showButton);

            buttons.forEach(button => contentBodyDiv.appendChild(button));
            paragraphs.forEach(p => contentDiv.appendChild(p));

            section.appendChild(contentHeaderDiv);
            section.appendChild(contentBodyDiv);
            section.appendChild(contentDiv);
        });

    } catch (err) {
        console.error(err);
        
    }
}


document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        const target = event.target;

        
        if (target.tagName === 'BUTTON' && target.innerText === "") {
            const contentBody = target.closest('.content-header').nextElementSibling;
            toggleContentDisplay(contentBody);
        }

        
        if (target.classList.contains('button1') || target.classList.contains('button2') || target.classList.contains('button3')) {
            const contentDiv = target.closest('.content-body').nextElementSibling;
            const paragraphs = contentDiv.querySelectorAll('p');

            paragraphs.forEach((p, index) => {
                if (target.classList.contains('button1') && p.classList.contains('content1')) {
                    p.style.display = "block";
                } else if (target.classList.contains('button2') && p.classList.contains('content2')) {
                    p.style.display = "block";
                } else if (target.classList.contains('button3') && p.classList.contains('content3')) {
                    p.style.display = "block";
                } else {
                    p.style.display = "none";
                }
            });
        }
    });
});
