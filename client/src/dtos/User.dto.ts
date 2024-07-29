export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface Task {
  id: number;
  user_id: number;
  description: string;
  is_done: any;
}
