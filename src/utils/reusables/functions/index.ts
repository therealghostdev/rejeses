import { WeekendSchedule } from "@/utils/types/types";

export function createEmailTemplate(
  name: string,
  email: string,
  message: string
) {
  return `
      <html>
        <body style="font-family: -apple-system, BlinkMacSystemFont, font-size: 30px; 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 30px;">
            <div style="background-color: #5a2d6e; color: white; text-align: center; padding: 15px; border-radius: 8px 8px 0 0; font-size: 20px;">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
            </div>
            <div style="margin-top: 18px;">
              <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 30px;">Name:</div>
              <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 30px;">${name}</div>
              
              <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 15px;">Email:</div>
              <div style="margin-bottom: 15px; word-wrap: break-word; font-size: 30px;">${email}</div>
              
              <div style="background-color: #f9f9f9; border-left: 4px solid #5a2d6e; padding: 15px; margin-top: 30px; font-size: 20px;">
                <div style="color: #666; font-weight: bold; margin-bottom: 5px; font-size: 30px;">Message:</div>
                <div style="word-wrap: break-word; font-size: 30px;">${message}</div>
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

export function calculateClassSchedule(
  startDate: Date,
  courseScheduleType: string
): Date[] {
  // If not weekend schedule, return weekday dates (Monday to Friday)
  if (courseScheduleType !== "weekend") {
    const weekSchedule: Date[] = [];
    const currentDate = new Date(startDate);

    // Add dates from Monday to Friday
    for (let i = 0; i < 5; i++) {
      weekSchedule.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekSchedule;
  }

  // For weekend scheduling
  const currentDate = new Date(startDate);
  const currentWeek = Math.ceil(currentDate.getDate() / 7);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  function getWeekendDates(week: number, month: number, year: number): Date[] {
    const dates: Date[] = [];
    const firstDayOfMonth = new Date(year, month, 1);
    let saturday = new Date(
      year,
      month,
      (week - 1) * 7 + (7 - firstDayOfMonth.getDay())
    );
    let sunday = new Date(saturday);
    sunday.setDate(saturday.getDate() + 1);

    // Adjust if Saturday falls in previous month
    if (saturday.getMonth() !== month) {
      saturday = new Date(year, month, saturday.getDate() + 7);
      sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);
    }

    dates.push(saturday, sunday);
    return dates;
  }

  function getNextMonthWeekends(year: number, month: number): WeekendSchedule {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    return {
      dates: [
        ...getWeekendDates(1, nextMonth, nextYear),
        ...getWeekendDates(2, nextMonth, nextYear),
      ],
      month: nextMonth,
      year: nextYear,
    };
  }

  // Determine which weekend pair to schedule based on current week
  if (currentWeek <= 2) {
    // Schedule for first and second weekends of current month
    return [
      ...getWeekendDates(1, currentMonth, currentYear),
      ...getWeekendDates(2, currentMonth, currentYear),
    ];
  } else if (currentWeek === 3 || currentWeek === 4) {
    // Schedule for third and fourth weekends of current month
    return [
      ...getWeekendDates(3, currentMonth, currentYear),
      ...getWeekendDates(4, currentMonth, currentYear),
    ];
  } else {
    // If we're in the fifth week or beyond, schedule for first and second weekends of next month
    const nextMonth = getNextMonthWeekends(currentYear, currentMonth);
    return nextMonth.dates;
  }
}

// issues with this
export function formatCourseSchedule(dates: (Date | string)[]): string {
  const getOrdinalSuffix = (day: number): string => {
    if (day % 10 === 1 && day !== 11) return `${day}st`;
    if (day % 10 === 2 && day !== 12) return `${day}nd`;
    if (day % 10 === 3 && day !== 13) return `${day}rd`;
    return `${day}th`;
  };

  // format individual dates
  const formatDate = (date: Date | string): string => {
    const parsedDate = typeof date === "string" ? new Date(date) : date; // Ensure it's a Date object
    const options = { weekday: "long", month: "long" } as const;
    const day = parsedDate.getDate();
    const formattedDate = `${parsedDate.toLocaleDateString(
      "en-US",
      options
    )}, ${getOrdinalSuffix(day)} ${parsedDate.getFullYear()}`;
    return formattedDate;
  };

  const formattedDates = dates.map(formatDate);

  return formattedDates.length > 1
    ? `${formattedDates.slice(0, -1).join(", ")} & ${
        formattedDates[formattedDates.length - 1]
      }`
    : formattedDates[0];
}
