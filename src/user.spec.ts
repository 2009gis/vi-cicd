import { describe, it, expect, beforeEach } from 'vitest';
import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a new user with auto-incremented ID', () => {
      const user1 = userManager.addUser('John Doe', 'john@example.com');
      const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
      expect(user1.name).toBe('John Doe');
      expect(user1.email).toBe('john@example.com');
    });

    it('should store users in internal array', () => {
      userManager.addUser('John Doe', 'john@example.com');
      const users = userManager.getAllUsers();

      expect(users).toHaveLength(1);
      expect(users[0].name).toBe('John Doe');
    });
  });

  describe('findUserById', () => {
    it('should find existing user by ID', () => {
      const addedUser = userManager.addUser('John Doe', 'john@example.com');
      const foundUser = userManager.findUserById(addedUser.id);

      expect(foundUser).toBeDefined();
      expect(foundUser?.name).toBe('John Doe');
    });

    it('should return undefined for non-existent user ID', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user and return true', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false when trying to delete non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });

    it('should not affect other users when deleting', () => {
      const user1 = userManager.addUser('John Doe', 'john@example.com');
      const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

      userManager.deleteUser(user1.id);

      expect(userManager.getAllUsers()).toHaveLength(1);
      expect(userManager.findUserById(user2.id)).toBeDefined();
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      const users = userManager.getAllUsers();
      expect(users).toEqual([]);
    });

    it('should return array of all users', () => {
      userManager.addUser('John Doe', 'john@example.com');
      userManager.addUser('Jane Doe', 'jane@example.com');

      const users = userManager.getAllUsers();

      expect(users).toHaveLength(2);
      expect(users[0].name).toBe('John Doe');
      expect(users[1].name).toBe('Jane Doe');
    });
  });
});
