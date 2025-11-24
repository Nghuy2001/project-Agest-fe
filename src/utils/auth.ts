export const redirectToGoogleLogin = (role: 'candidate' | 'employer') => {
  if (!role) throw new Error("Role is required");
  if (typeof window === "undefined") return;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not defined");

  window.location.href = `${baseUrl}/auth/google?role=${role}`;
};