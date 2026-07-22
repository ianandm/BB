import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  "DC",
] as const;

export const checkoutSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .optional()
    .transform((value, ctx) => {
      if (!value || value.trim() === "") return undefined;
      const parsed = parsePhoneNumberFromString(value, "US");
      if (!parsed || !parsed.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid phone number",
        });
        return z.NEVER;
      }
      return parsed.number; // E.164, e.g. +12065551234
    }),
  name: z.string().min(2, "Enter the recipient's full name").max(120),
  line1: z.string().min(3, "Enter a street address").max(200),
  line2: z.string().max(200).optional().or(z.literal("")),
  city: z.string().min(2, "Enter a city").max(100),
  state: z.enum(US_STATES, {
    message: "Use a 2-letter state code (e.g. WA)",
  }),
  zip: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Enter a valid ZIP code (e.g. 98052)"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
