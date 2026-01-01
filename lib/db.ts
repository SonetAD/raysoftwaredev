import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'messages.db');

// Ensure the data directory exists
import fs from 'fs';
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Initialize the messages table
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    read INTEGER DEFAULT 0
  )
`);

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: number;
}

export function saveMessage(name: string, email: string, message: string): void {
  const stmt = db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
  stmt.run(name, email, message);
}

export function getAllMessages(): Message[] {
  const stmt = db.prepare('SELECT * FROM messages ORDER BY created_at DESC');
  return stmt.all() as Message[];
}

export function markAsRead(id: number): void {
  const stmt = db.prepare('UPDATE messages SET read = 1 WHERE id = ?');
  stmt.run(id);
}

export function deleteMessage(id: number): void {
  const stmt = db.prepare('DELETE FROM messages WHERE id = ?');
  stmt.run(id);
}

export function getUnreadCount(): number {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM messages WHERE read = 0');
  const result = stmt.get() as { count: number };
  return result.count;
}

export default db;



