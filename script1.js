<<<<<<< HEAD
function sendMail() {
    const params = {
      from_name: document.getElementById("name").value,
      reply_to: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };
  
    emailjs.send("service_7rph7np", "template_1cvg3gl", params)
      .then(response => {
        alert("Email sent successfully!");
        document.getElementById("contactForm").reset();
      })
      .catch(error => {
        alert("Failed to send email.");
        console.error("EmailJS Error:", error);
      });
  }
  
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    sendMail();
  });
=======
function sendMail() {
    const params = {
      from_name: document.getElementById("name").value,
      reply_to: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };
  
    emailjs.send("service_7rph7np", "template_1cvg3gl", params)
      .then(response => {
        alert("Email sent successfully!");
        document.getElementById("contactForm").reset();
      })
      .catch(error => {
        alert("Failed to send email.");
        console.error("EmailJS Error:", error);
      });
  }
  
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    sendMail();
  });
>>>>>>> aabcc364fd18c3985bb63f96b2c78ccb33d0f85b
  