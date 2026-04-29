export async function sendBookingConfirmation(booking: { name: string, email: string }) {
  console.log("Triggering email for:", booking.name);
  // Implementation: Use SendGrid/NodeMailer
  return { success: true };
}

export async function sendReviewRequest(booking: { name: string, email: string }) {
  console.log("Triggering review SMS/email for:", booking.name);
  // Implementation: Use Twilio/SendGrid
  return { success: true };
}