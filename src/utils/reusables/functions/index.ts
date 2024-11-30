export function createEmailTemplate(
  name: string,
  email: string,
  message: string
) {
  return `
      <html>
        <head>
          <style>
            body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
}

.container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
}
.header {
  background-color: #89c13e;
  color: white;
  text-align: center;
  padding: 15px;
  border-radius: 8px 8px 0 0;
   font-size: 20px;
}
.content {
  margin-top: 18px;
}
.label {
  color: #666;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 15px;
}
.value {
  margin-bottom: 15px;
  word-wrap: break-word;
   font-size: 15px;
}
.message {
  background-color: #f9f9f9;
  border-left: 4px solid #89c13e;
  padding: 15px;
  margin-top: 20px;
    font-size: 20px;
}
@media only screen and (max-width: 600px) {
  body {
    padding: 10px;
  }
  .container {
    padding: 15px;
  }
}
</style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="label">Name:</div>
              <div class="value">${name}</div>
              
              <div class="label">Email:</div>
              <div class="value">${email}</div>
              
              <div class="message">
                <div class="label">Message:</div>
                <div class="value">${message}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
}
