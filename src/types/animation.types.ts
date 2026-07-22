/**
 * Animation state type definitions for pause/resume functionality
 */

export interface AnimationState {
  /** Whether the animation is currently playing */
  isPlaying: boolean;
  /** Whether the animation is paused */
  isPaused: boolean;
  /** Current step index in the animation sequence */
  currentStep: number;
  /** Total number of animation steps */
  totalSteps: number;
}

export type AnimationControlAction = 'play' | 'pause' | 'resume' | 'reset';

export interface AnimationControlState extends AnimationState {
  /** Pending timeouts for cleanup */
  timeoutIds: number[];
}
