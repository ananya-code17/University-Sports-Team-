<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const canvas = document.createElement("canvas");
    canvas.id = "animationCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.alpha = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(173, 216, 230, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    init();
    animate();


const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            if (result.success) {
                window.location.href = 'dashboard.html';
            } else {
                alert('Login failed: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}
    
    // Dashboard Navigation
    const sidebarItems = document.querySelectorAll('.sidebar-menu li');
    const contentPages = document.querySelectorAll('.content-page');
    
    if (sidebarItems.length > 0) {
        sidebarItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active sidebar item
                sidebarItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content page
                const targetPage = this.getAttribute('data-page');
                contentPages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === targetPage) {
                        page.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Toggle Sidebar
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleSidebar && sidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // Logout Button
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
    
    // Performance Chart
    const performanceChartEl = document.getElementById('performanceChart');
    if (performanceChartEl) {
        const ctx = performanceChartEl.getContext('2d');
        
        // Sample data
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const teamData = [85, 87, 84, 86, 88, 90, 91, 92, 93, 92, 94, 93];
        const avgData = [80, 82, 81, 83, 82, 84, 85, 86, 87, 86, 88, 89];
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Team Performance',
                        data: teamData,
                        borderColor: '#3a86ff',
                        backgroundColor: 'rgba(58, 134, 255, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'League Average',
                        data: avgData,
                        borderColor: '#ff006e',
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        min: 75,
                        max: 100,
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            }
        });
    }
    
    // Team Radar Chart
    const teamRadarChart = document.getElementById('teamRadarChart');
    if (teamRadarChart) {
        const ctx = teamRadarChart.getContext('2d');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Speed',
                    'Strength',
                    'Endurance',
                    'Technique',
                    'Teamwork',
                    'Strategy'
                ],
                datasets: [{
                    label: 'Current Team',
                    data: [85, 90, 88, 92, 95, 89],
                    fill: true,
                    backgroundColor: 'rgba(58, 134, 255, 0.2)',
                    borderColor: '#3a86ff',
                    pointBackgroundColor: '#3a86ff',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#3a86ff'
                }, {
                    label: 'Optimal Team',
                    data: [92, 95, 90, 95, 98, 93],
                    fill: true,
                    backgroundColor: 'rgba(255, 0, 110, 0.2)',
                    borderColor: '#ff006e',
                    pointBackgroundColor: '#ff006e',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#ff006e'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 50,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
    
    // Performance Predictor Form
    const predictorForm = document.getElementById('predictorForm');
    const resultEmpty = document.querySelector('.result-empty');
    const resultContent = document.querySelector('.result-content');
    
    if (predictorForm && resultEmpty && resultContent) {
        predictorForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const data = {
                age: parseFloat(document.getElementById('age').value),
                gender: document.getElementById('gender').value,
                experience: parseFloat(document.getElementById('experience').value),
                height: parseFloat(document.getElementById('height').value),
                weight: parseFloat(document.getElementById('weight').value),
                vo2max: parseFloat(document.getElementById('vo2max').value),
                restingHR: parseFloat(document.getElementById('restingHR').value),
                trainingHours: parseFloat(document.getElementById('trainingHours').value)
            };
            
            try {
                const response = await fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                document.getElementById('predictionScore').textContent = result.prediction;
                resultEmpty.style.display = 'none';
                resultContent.style.display = 'block';
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
     
    // Team Optimization - Drag and Drop
    const athleteCards = document.querySelectorAll('.athlete-card');
    const positionMarkers = document.querySelectorAll('.position-marker');
    
    if (athleteCards.length > 0 && positionMarkers.length > 0) {
        athleteCards.forEach(card => {
            card.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', card.getAttribute('data-id'));
                setTimeout(() => {
                    card.classList.add('dragging');
                }, 0);
            });
            
            card.addEventListener('dragend', function() {
                card.classList.remove('dragging');
            });
        });
        
        positionMarkers.forEach(marker => {
            marker.addEventListener('dragover', function(e) {
                e.preventDefault();
                marker.classList.add('dragover');
            });
            
            marker.addEventListener('dragleave', function() {
                marker.classList.remove('dragover');
            });
            
            marker.addEventListener('drop', function(e) {
                e.preventDefault();
                marker.classList.remove('dragover');
                
                const athleteId = e.dataTransfer.getData('text/plain');
                const athlete = document.querySelector(`.athlete-card[data-id="${athleteId}"]`);
                
                if (athlete) {
                    // Clone the athlete card
                    const clone = athlete.cloneNode(true);
                    clone.classList.add('assigned');
                    
                    // Clear existing content
                    marker.innerHTML = '';
                    
                    // Add athlete to position
                    marker.appendChild(clone);
                    
                    // Update the position marker style
                    marker.style.background = 'rgba(58, 134, 255, 0.6)';
                    marker.style.border = 'none';
                }
            });
        });
    }
    
    // Optimize Team Button
    const optimizeTeamBtn = document.getElementById('optimizeTeam');
    if (optimizeTeamBtn) {
        optimizeTeamBtn.addEventListener('click', function() {
            // In a real app, this would trigger the ML optimization algorithm
            alert('Team optimization complete! The suggested lineup has been generated.');
            
            // Update stats for demo purposes
            document.querySelectorAll('.stat-value').forEach(stat => {
                // Randomly increase the stats slightly
                const currentValue = parseFloat(stat.textContent);
                const newValue = (currentValue + Math.random() * 2).toFixed(1);
                stat.textContent = newValue;
            });
        });
    }
    
    // Calendar Navigation
    const prevWeekBtn = document.getElementById('prevWeek');
    const nextWeekBtn = document.getElementById('nextWeek');
    const currentWeekEl = document.getElementById('currentWeek');
    
    if (prevWeekBtn && nextWeekBtn && currentWeekEl) {
        const weeks = [
            'May 8 - May 14, 2023',
            'May 15 - May 21, 2023',
            'May 22 - May 28, 2023',
            'May 29 - June 4, 2023'
        ];
        let currentWeekIndex = 1; // start with the second week
        
        prevWeekBtn.addEventListener('click', function() {
            if (currentWeekIndex > 0) {
                currentWeekIndex--;
                currentWeekEl.textContent = weeks[currentWeekIndex];
            }
        });
        
        nextWeekBtn.addEventListener('click', function() {
            if (currentWeekIndex < weeks.length - 1) {
                currentWeekIndex++;
                currentWeekEl.textContent = weeks[currentWeekIndex];
            }
        });
    }
    
    // Add Training Session Button
    const addSessionBtn = document.getElementById('addSessionBtn');
    if (addSessionBtn) {
        addSessionBtn.addEventListener('click', function() {
            // In a real app, this would open a modal to add a new session
            alert('In a full implementation, this would open a form to add a new training session to the calendar.');
        });
    }
    
   // Contact Form Submission
   const contactForm = document.getElementById('contactForm');
   if (contactForm) {
       contactForm.addEventListener('submit', async function(e) {
           e.preventDefault();
           
           const contactData = {
               name: document.getElementById('name').value,
               email: document.getElementById('contactEmail').value,
               subject: document.getElementById('subject').value,
               message: document.getElementById('message').value
           };
           
           try {
               const response = await fetch('http://127.0.0.1:5000/contact', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(contactData)
               });
               const result = await response.json();
               alert(result.message);
               contactForm.reset();
           } catch (error) {
               console.error('Error:', error);
           }
       });
   }
});
//for connections
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get the email and password values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Define an array of valid users
    const validUsers = [
        { email: "ananyamycutie@gmail.com", password: "merijaan" },
        { email: "mihikapargai@gmail.com", password: "hello123" },
        { email: "admin@example.com", password: "adminpass" }
        // Add more users as needed
    ];

    // Check if any user credentials match
    const isValidUser = validUsers.some(user => user.email === email && user.password === password);

    if (isValidUser) {
        // Redirect if any match found
        window.location.href = "s.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});

document.getElementById('predictorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get input values
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const trainingHours = document.getElementById('trainingHours').value;

    // Prepare the data to send to the backend
    const data = {
        features: [age, gender, height, weight, trainingHours]
    };

    // Send a POST request to the backend
    fetch('http://127.0.0.1:5000', { // Adjust the URL if your backend is hosted elsewhere
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Handle the response from the backend
        if (result.error) {
            alert(result.error); // Show error message
        } else {
            // Display the prediction result
            document.getElementById('predictionScore').innerText = result.Performance_Score.toFixed(2);
            document.querySelector('.result-empty').style.display = 'none'; // Hide the empty result message
            document.querySelector('.result-content').style.display = 'block'; // Show the result content
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while predicting performance score.');
    });
});



    document.getElementById('predictorForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get input values
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        const trainingHours = document.getElementById('trainingHours').value;

        // Prepare the data to send to the backend
        const data = {
            features: [age, gender, height, weight, trainingHours]
        };

        // Send a POST request to the backend
        fetch('http://127.0.0.1:5000', { // Adjust the URL if your backend is hosted elsewhere
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // Handle the response from the backend
            if (result.error) {
                alert(result.error); // Show error message
            } else {
                // Display the prediction result
                document.getElementById('predictionScore').innerText = result.Performance_Score.toFixed(2);
                document.getElementById('accuracyScore').innerText = result.Accuracy_Score.toFixed(2);
                document.querySelector('.result-empty').style.display = 'none'; // Hide the empty result message
                document.querySelector('.result-content').style.display = 'block'; // Show the result content
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while predicting performance score.');
        });
=======
document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const canvas = document.createElement("canvas");
    canvas.id = "animationCanvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.alpha = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(173, 216, 230, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    init();
    animate();


const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const result = await response.json();
            if (result.success) {
                window.location.href = 'dashboard.html';
            } else {
                alert('Login failed: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}
    
    // Dashboard Navigation
    const sidebarItems = document.querySelectorAll('.sidebar-menu li');
    const contentPages = document.querySelectorAll('.content-page');
    
    if (sidebarItems.length > 0) {
        sidebarItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active sidebar item
                sidebarItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content page
                const targetPage = this.getAttribute('data-page');
                contentPages.forEach(page => {
                    page.classList.remove('active');
                    if (page.id === targetPage) {
                        page.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Toggle Sidebar
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleSidebar && sidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // Logout Button
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
    
    // Performance Chart
    const performanceChartEl = document.getElementById('performanceChart');
    if (performanceChartEl) {
        const ctx = performanceChartEl.getContext('2d');
        
        // Sample data
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const teamData = [85, 87, 84, 86, 88, 90, 91, 92, 93, 92, 94, 93];
        const avgData = [80, 82, 81, 83, 82, 84, 85, 86, 87, 86, 88, 89];
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Team Performance',
                        data: teamData,
                        borderColor: '#3a86ff',
                        backgroundColor: 'rgba(58, 134, 255, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'League Average',
                        data: avgData,
                        borderColor: '#ff006e',
                        borderDash: [5, 5],
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        min: 75,
                        max: 100,
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            }
        });
    }
    
    // Team Radar Chart
    const teamRadarChart = document.getElementById('teamRadarChart');
    if (teamRadarChart) {
        const ctx = teamRadarChart.getContext('2d');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Speed',
                    'Strength',
                    'Endurance',
                    'Technique',
                    'Teamwork',
                    'Strategy'
                ],
                datasets: [{
                    label: 'Current Team',
                    data: [85, 90, 88, 92, 95, 89],
                    fill: true,
                    backgroundColor: 'rgba(58, 134, 255, 0.2)',
                    borderColor: '#3a86ff',
                    pointBackgroundColor: '#3a86ff',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#3a86ff'
                }, {
                    label: 'Optimal Team',
                    data: [92, 95, 90, 95, 98, 93],
                    fill: true,
                    backgroundColor: 'rgba(255, 0, 110, 0.2)',
                    borderColor: '#ff006e',
                    pointBackgroundColor: '#ff006e',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#ff006e'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 50,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
    
    // Performance Predictor Form
    const predictorForm = document.getElementById('predictorForm');
    const resultEmpty = document.querySelector('.result-empty');
    const resultContent = document.querySelector('.result-content');
    
    if (predictorForm && resultEmpty && resultContent) {
        predictorForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const data = {
                age: parseFloat(document.getElementById('age').value),
                gender: document.getElementById('gender').value,
                experience: parseFloat(document.getElementById('experience').value),
                height: parseFloat(document.getElementById('height').value),
                weight: parseFloat(document.getElementById('weight').value),
                vo2max: parseFloat(document.getElementById('vo2max').value),
                restingHR: parseFloat(document.getElementById('restingHR').value),
                trainingHours: parseFloat(document.getElementById('trainingHours').value)
            };
            
            try {
                const response = await fetch('http://127.0.0.1:5000/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                document.getElementById('predictionScore').textContent = result.prediction;
                resultEmpty.style.display = 'none';
                resultContent.style.display = 'block';
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
     
    // Team Optimization - Drag and Drop
    const athleteCards = document.querySelectorAll('.athlete-card');
    const positionMarkers = document.querySelectorAll('.position-marker');
    
    if (athleteCards.length > 0 && positionMarkers.length > 0) {
        athleteCards.forEach(card => {
            card.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', card.getAttribute('data-id'));
                setTimeout(() => {
                    card.classList.add('dragging');
                }, 0);
            });
            
            card.addEventListener('dragend', function() {
                card.classList.remove('dragging');
            });
        });
        
        positionMarkers.forEach(marker => {
            marker.addEventListener('dragover', function(e) {
                e.preventDefault();
                marker.classList.add('dragover');
            });
            
            marker.addEventListener('dragleave', function() {
                marker.classList.remove('dragover');
            });
            
            marker.addEventListener('drop', function(e) {
                e.preventDefault();
                marker.classList.remove('dragover');
                
                const athleteId = e.dataTransfer.getData('text/plain');
                const athlete = document.querySelector(`.athlete-card[data-id="${athleteId}"]`);
                
                if (athlete) {
                    // Clone the athlete card
                    const clone = athlete.cloneNode(true);
                    clone.classList.add('assigned');
                    
                    // Clear existing content
                    marker.innerHTML = '';
                    
                    // Add athlete to position
                    marker.appendChild(clone);
                    
                    // Update the position marker style
                    marker.style.background = 'rgba(58, 134, 255, 0.6)';
                    marker.style.border = 'none';
                }
            });
        });
    }
    
    // Optimize Team Button
    const optimizeTeamBtn = document.getElementById('optimizeTeam');
    if (optimizeTeamBtn) {
        optimizeTeamBtn.addEventListener('click', function() {
            // In a real app, this would trigger the ML optimization algorithm
            alert('Team optimization complete! The suggested lineup has been generated.');
            
            // Update stats for demo purposes
            document.querySelectorAll('.stat-value').forEach(stat => {
                // Randomly increase the stats slightly
                const currentValue = parseFloat(stat.textContent);
                const newValue = (currentValue + Math.random() * 2).toFixed(1);
                stat.textContent = newValue;
            });
        });
    }
    
    // Calendar Navigation
    const prevWeekBtn = document.getElementById('prevWeek');
    const nextWeekBtn = document.getElementById('nextWeek');
    const currentWeekEl = document.getElementById('currentWeek');
    
    if (prevWeekBtn && nextWeekBtn && currentWeekEl) {
        const weeks = [
            'May 8 - May 14, 2023',
            'May 15 - May 21, 2023',
            'May 22 - May 28, 2023',
            'May 29 - June 4, 2023'
        ];
        let currentWeekIndex = 1; // start with the second week
        
        prevWeekBtn.addEventListener('click', function() {
            if (currentWeekIndex > 0) {
                currentWeekIndex--;
                currentWeekEl.textContent = weeks[currentWeekIndex];
            }
        });
        
        nextWeekBtn.addEventListener('click', function() {
            if (currentWeekIndex < weeks.length - 1) {
                currentWeekIndex++;
                currentWeekEl.textContent = weeks[currentWeekIndex];
            }
        });
    }
    
    // Add Training Session Button
    const addSessionBtn = document.getElementById('addSessionBtn');
    if (addSessionBtn) {
        addSessionBtn.addEventListener('click', function() {
            // In a real app, this would open a modal to add a new session
            alert('In a full implementation, this would open a form to add a new training session to the calendar.');
        });
    }
    
   // Contact Form Submission
   const contactForm = document.getElementById('contactForm');
   if (contactForm) {
       contactForm.addEventListener('submit', async function(e) {
           e.preventDefault();
           
           const contactData = {
               name: document.getElementById('name').value,
               email: document.getElementById('contactEmail').value,
               subject: document.getElementById('subject').value,
               message: document.getElementById('message').value
           };
           
           try {
               const response = await fetch('http://127.0.0.1:5000/contact', {
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(contactData)
               });
               const result = await response.json();
               alert(result.message);
               contactForm.reset();
           } catch (error) {
               console.error('Error:', error);
           }
       });
   }
});
//for connections
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get the email and password values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Define an array of valid users
    const validUsers = [
        { email: "ananyamycutie@gmail.com", password: "merijaan" },
        { email: "mihikapargai@gmail.com", password: "hello123" },
        { email: "admin@example.com", password: "adminpass" }
        // Add more users as needed
    ];

    // Check if any user credentials match
    const isValidUser = validUsers.some(user => user.email === email && user.password === password);

    if (isValidUser) {
        // Redirect if any match found
        window.location.href = "s.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});

document.getElementById('predictorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get input values
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const trainingHours = document.getElementById('trainingHours').value;

    // Prepare the data to send to the backend
    const data = {
        features: [age, gender, height, weight, trainingHours]
    };

    // Send a POST request to the backend
    fetch('http://127.0.0.1:5000', { // Adjust the URL if your backend is hosted elsewhere
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Handle the response from the backend
        if (result.error) {
            alert(result.error); // Show error message
        } else {
            // Display the prediction result
            document.getElementById('predictionScore').innerText = result.Performance_Score.toFixed(2);
            document.querySelector('.result-empty').style.display = 'none'; // Hide the empty result message
            document.querySelector('.result-content').style.display = 'block'; // Show the result content
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while predicting performance score.');
    });
});



    document.getElementById('predictorForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get input values
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        const trainingHours = document.getElementById('trainingHours').value;

        // Prepare the data to send to the backend
        const data = {
            features: [age, gender, height, weight, trainingHours]
        };

        // Send a POST request to the backend
        fetch('http://127.0.0.1:5000', { // Adjust the URL if your backend is hosted elsewhere
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // Handle the response from the backend
            if (result.error) {
                alert(result.error); // Show error message
            } else {
                // Display the prediction result
                document.getElementById('predictionScore').innerText = result.Performance_Score.toFixed(2);
                document.getElementById('accuracyScore').innerText = result.Accuracy_Score.toFixed(2);
                document.querySelector('.result-empty').style.display = 'none'; // Hide the empty result message
                document.querySelector('.result-content').style.display = 'block'; // Show the result content
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while predicting performance score.');
        });
>>>>>>> aabcc364fd18c3985bb63f96b2c78ccb33d0f85b
    });