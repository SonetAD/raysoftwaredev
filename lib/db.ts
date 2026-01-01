import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Use __dirname to get the directory where this file is located (lib/)
// Then go up one level to the project root, and into 'data'
const projectRoot = path.resolve(__dirname, '..');
const dataDir = path.join(projectRoot, 'data');
const dbPath = path.join(dataDir, 'messages.db');

// Log the path for debugging (check EC2 logs to verify)
console.log('[DB] Database path:', dbPath);
console.log('[DB] Data directory:', dataDir);

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  console.log('[DB] Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
}

let db: Database.Database;
try {
  db = new Database(dbPath);
  console.log('[DB] Database connection established successfully');
} catch (error) {
  console.error('[DB] Failed to open database:', error);
  console.error('[DB] Attempted path:', dbPath);
  console.error('[DB] Directory exists:', fs.existsSync(dataDir));
  try {
    fs.accessSync(dataDir, fs.constants.W_OK);
    console.error('[DB] Directory writable: yes');
  } catch {
    console.error('[DB] Directory writable: no');
  }
  throw error;
}

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

export function saveMessage(
  name: string,
  email: string,
  message: string
): void {
  try {
    console.log('[DB] Saving message from:', email);
    const stmt = db.prepare(
      'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)'
    );
    const result = stmt.run(name, email, message);
    console.log('[DB] Message saved successfully, id:', result.lastInsertRowid);
  } catch (error) {
    console.error('[DB] Failed to save message:', error);
    console.error('[DB] Database path was:', dbPath);
    console.error('[DB] Database file exists:', fs.existsSync(dbPath));
    throw error;
  }
}

export function getAllMessages(): Message[] {
  try {
    console.log('[DB] Fetching all messages...');
    const stmt = db.prepare('SELECT * FROM messages ORDER BY created_at DESC');
    const messages = stmt.all() as Message[];
    console.log('[DB] Fetched', messages.length, 'messages');
    return messages;
  } catch (error) {
    console.error('[DB] Failed to fetch messages:', error);
    console.error('[DB] Database path was:', dbPath);
    console.error('[DB] Database file exists:', fs.existsSync(dbPath));
    throw error;
  }
}

export function markAsRead(id: number): void {
  try {
    console.log('[DB] Marking message as read, id:', id);
    const stmt = db.prepare('UPDATE messages SET read = 1 WHERE id = ?');
    stmt.run(id);
    console.log('[DB] Message marked as read successfully');
  } catch (error) {
    console.error('[DB] Failed to mark message as read:', error);
    throw error;
  }
}

export function deleteMessage(id: number): void {
  try {
    console.log('[DB] Deleting message, id:', id);
    const stmt = db.prepare('DELETE FROM messages WHERE id = ?');
    stmt.run(id);
    console.log('[DB] Message deleted successfully');
  } catch (error) {
    console.error('[DB] Failed to delete message:', error);
    throw error;
  }
}

export function getUnreadCount(): number {
  try {
    const stmt = db.prepare(
      'SELECT COUNT(*) as count FROM messages WHERE read = 0'
    );
    const result = stmt.get() as { count: number };
    console.log('[DB] Unread count:', result.count);
    return result.count;
  } catch (error) {
    console.error('[DB] Failed to get unread count:', error);
    throw error;
  }
}

export default db;
