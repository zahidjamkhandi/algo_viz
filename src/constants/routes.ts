/**
 * Centralized route constants for algo_viz application
 * 
 * This file defines all application routes in a single location to:
 * - Prevent hardcoded route strings throughout the codebase
 * - Enable easy route updates without touching multiple files
 * - Support future visualizer modules without architectural changes
 * - Maintain type safety with TypeScript
 */

export const ROUTES = {
  HOME: '/',
  SORT: '/sort',
  SEARCH: '/search',
  PATHFINDING: '/pathfinding',
  GRAPHS: '/graphs',
  TREES: '/trees',
  DYNAMIC_PROGRAMMING: '/dynamic-programming',
} as const;

/**
 * Type for route values
 * Ensures only valid routes can be used throughout the application
 */
export type RouteValue = (typeof ROUTES)[keyof typeof ROUTES];
