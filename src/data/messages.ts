export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const initialMessages: ContactMessage[] = [
  {
    "id": 3,
    "name": "Juan Carlos Chahuayo Martinez",
    "email": "juancarloschmm@gmail.com",
    "subject": "xd",
    "message": "dfdf",
    "read": false,
    "createdAt": "2026-10-13T11:41:57.212Z"
  }
];
