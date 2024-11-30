export function createEmailTemplate(
  name: string,
  email: string,
  message: string
) {
  return `
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 30px;">
            <div style="background-color: #89c13e; color: white; text-align: center; padding: 15px; border-radius: 8px 8px 0 0; font-size: 20px;">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
            </div>
            <div style="margin-top: 18px;">
              <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Name:</div>
              <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${name}</div>
              
              <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Email:</div>
              <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${email}</div>
              
              <div style="background-color: #f9f9f9; border-left: 4px solid #89c13e; padding: 15px; margin-top: 20px; font-size: 20px;">
                <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Message:</div>
                <div style="word-wrap: break-word; font-size: 15px;">${message}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
}
