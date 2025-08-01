export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  creationDate?: string;
  authors: string[];
}

export type CourseFormPayload = Omit<Course, 'id'> & { creationDate?: string };

export interface CourseWithResolvedAuthors extends Course {
  authors: string[];
}
