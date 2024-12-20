export function createEmailTemplate(
  name: string,
  email: string,
  message: string
) {
  return `
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 30px;">
            <div style="background-color: #322138; color: white; text-align: center; padding: 15px; border-radius: 8px 8px 0 0; font-size: 20px;">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
            </div>
            <div style="margin-top: 18px;">
              <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Name:</div>
              <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${name}</div>
              
              <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Email:</div>
              <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${email}</div>
              
              <div style="background-color: #f9f9f9; border-left: 4px solid #322138; padding: 15px; margin-top: 20px; font-size: 20px;">
                <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Message:</div>
                <div style="word-wrap: break-word; font-size: 15px;">${message}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
}

export const getNextMondayDates = (count: number) => {
  const dates = [];
  const today = new Date();
  // Calculate the closest Monday
  const dayOfWeek = today.getDay();
  const daysUntilMonday = (dayOfWeek === 0 ? 1 : 8) - dayOfWeek; // Sunday to Monday or the next Monday
  let currentMonday = new Date(today);
  currentMonday.setDate(today.getDate() + daysUntilMonday);

  // Generate dates for each card
  for (let i = 0; i < count; i++) {
    dates.push(new Date(currentMonday));
    currentMonday.setDate(currentMonday.getDate() + 7); // Move to the next Monday
  }

  return dates;
};

export function formatDate(courseDate: Date) {
  const day = courseDate.getDate();
  const month = courseDate.toLocaleString("en-US", { month: "long" });
  const year = courseDate.getFullYear();

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
}

export function formatPrice(price: number | undefined): string {
  if (price && price >= 1000) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return price?.toString() || "";
  }
}

export function createCourseEmailTemplate(
  firstName: string,
  lastName: string,
  courseType: string,
  startDate: string,
  amount: number,
  currency: string
) {
  return `
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 30px;">
            <div style="background-color: #89c13e; color: white; text-align: center; padding: 15px; border-radius: 8px 8px 0 0; font-size: 20px;">
              <h1 style="margin: 0;">Course Registration Confirmation</h1>
            </div>
            <div style="margin-top: 18px;">
              <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Dear ${firstName} ${lastName},</div>
              <p style="margin-bottom: 15px; font-size: 15px;">
                Thank you for registering for the <strong>${courseType}</strong> program. Below are your registration details:
              </p>

              ${
                courseType.includes("Mentoring")
                  ? `<p style="margin-bottom: 15px; font-size: 15px;">
                      You have registered for the mentoring program. As a result, you will be contacted soon regarding the program details.
                    </p>`
                  : ""
              }
              
              
              <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Program Type:</div>
              <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${courseType}</div>
              
              <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Start Date:</div>
              <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${
                courseType.includes("Mentoring")
                  ? "You will be contacted"
                  : startDate
              }</div>
              
              <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Amount Paid:</div>
              <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 15px;">${
                currency === "naira" ? "NGN" : "$"
              } ${formatPrice(amount)}</div>
              
              <div style="background-color: #f9f9f9; border-left: 4px solid #89c13e; padding: 15px; margin-top: 20px; font-size: 15px;">
            ${
              !courseType.includes("Mentoring")
                ? `<p style="margin: 0;">
                    If you have any questions, feel free to contact us. We look forward to seeing you on <strong>${startDate}</strong>.
                  </p>`
                : `<p style="margin: 0;">
                    If you have any questions, feel free to contact us. We look forward to seeing you in class.
                  </p>`
            }
</div>

            </div>
          </div>
        </body>
      </html>
    `;
}
