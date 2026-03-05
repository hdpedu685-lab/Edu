// src/lib/data.ts
import { Course, User } from "./types"

// Fix: Wrap the object in an array and name it 'courses' to satisfy the import
export const courses: Course[] = [];

// Re-export as mockCourse just in case other files use that name
export const mockCourse = courses[0];

export const mockUser: User = {
  name: "",
  email: "",
  coursesPurchased: [],
}
