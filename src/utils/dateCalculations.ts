/**
 * Date calculation utilities for tracking mode
 * Calculates day number based on surgery date
 */

/**
 * Calculate the recovery day number based on surgery date
 * Returns 0 on surgery day, 1 the next day, etc.
 * 
 * @param surgeryDate - The date of surgery
 * @param currentDate - The current date (defaults to today)
 * @returns Recovery day number (0-28+)
 */
export function calculateRecoveryDay(
  surgeryDate: Date,
  currentDate: Date = new Date()
): number {
  // Normalize dates to midnight for consistent calculation
  const surgery = new Date(surgeryDate);
  surgery.setHours(0, 0, 0, 0);
  
  const current = new Date(currentDate);
  current.setHours(0, 0, 0, 0);
  
  // Calculate difference in milliseconds
  const diffTime = current.getTime() - surgery.getTime();
  
  // Convert to days
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Day 0 is surgery day, negative means before surgery
  return Math.max(0, diffDays);
}

/**
 * Check if a date is in the future
 * 
 * @param date - The date to check
 * @returns True if date is in the future
 */
export function isFutureDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  return checkDate > today;
}

/**
 * Check if a date is today
 * 
 * @param date - The date to check
 * @returns True if date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  
  return checkDate.getTime() === today.getTime();
}

/**
 * Format relative day label for exploring mode
 * 
 * @param dayNumber - The day number (0-28)
 * @returns Formatted label (e.g., "Day 0", "Week 2", "Day 14")
 */
export function formatRelativeDay(dayNumber: number): string {
  if (dayNumber === 0) return "Day 0 – Surgery Day";
  if (dayNumber === 7) return "Week 1";
  if (dayNumber === 14) return "Week 2";
  if (dayNumber === 21) return "Week 3";
  if (dayNumber === 28) return "Week 4";
  
  return `Day ${dayNumber}`;
}

/**
 * Get greeting based on time of day
 * 
 * @returns Time-appropriate greeting
 */
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/**
 * Calculate days until surgery
 * 
 * @param surgeryDate - The date of surgery
 * @returns Number of days until surgery (negative if past)
 */
export function daysUntilSurgery(surgeryDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const surgery = new Date(surgeryDate);
  surgery.setHours(0, 0, 0, 0);
  
  const diffTime = surgery.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Check if it's time to auto-advance (after midnight)
 * This would be used in real implementation to auto-advance at 00:01
 * 
 * @param lastCheckDate - The last time we checked
 * @returns True if a new day has started
 */
export function shouldAutoAdvance(lastCheckDate: Date): boolean {
  const now = new Date();
  const last = new Date(lastCheckDate);
  
  // If the dates are different, it's a new day
  return now.toDateString() !== last.toDateString();
}

/**
 * Get phase name from day number
 * 
 * @param dayNumber - The day number (0-28)
 * @returns Phase name
 */
export function getPhaseFromDay(dayNumber: number): string {
  if (dayNumber === 0) return "Surgery";
  if (dayNumber >= 1 && dayNumber <= 7) return "Early Recovery";
  if (dayNumber >= 8 && dayNumber <= 14) return "Healing Phase";
  if (dayNumber >= 15 && dayNumber <= 21) return "Strengthening";
  if (dayNumber >= 22 && dayNumber <= 28) return "Final Phase";
  return "Extended Recovery";
}
