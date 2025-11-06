import { GRAVITY, JUMP_FORCE, TERMINAL_VELOCITY, BIRD_SIZE, CANVAS_HEIGHT } from '@/constants/game';

export class Bird {
  x: number;
  y: number;
  velocity: number;
  size: number;
  rotation: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.size = BIRD_SIZE;
    this.rotation = 0;
  }

  flap() {
    this.velocity = JUMP_FORCE;
  }

  update() {
    // Physics update is now handled by setTargetY
    // This method kept for compatibility
    
    // Rotation based on velocity (visual feedback)
    this.rotation = Math.min(Math.max(this.velocity * 3, -30), 90);
  }

  setTargetY(targetY: number, smoothing: number = 0.2) {
    // Smoothly move bird to target Y position (nose position)
    const clampedTarget = Math.max(0, Math.min(CANVAS_HEIGHT - this.size, targetY));
    
    // Calculate velocity for visual rotation
    const deltaY = clampedTarget - this.y;
    this.velocity = deltaY * 0.3;
    
    // Smooth interpolation
    this.y += deltaY * smoothing;
    
    // Clamp to canvas bounds
    if (this.y < 0) this.y = 0;
    if (this.y > CANVAS_HEIGHT - this.size) this.y = CANVAS_HEIGHT - this.size;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
    ctx.rotate((this.rotation * Math.PI) / 180);

    // Draw bird body (circle with gradient)
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size / 2);
    gradient.addColorStop(0, '#FF8C42');
    gradient.addColorStop(1, '#FF6B35');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Add glow effect
    ctx.shadowColor = '#FF6B35';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw wing
    ctx.fillStyle = '#FFB347';
    ctx.beginPath();
    ctx.ellipse(-5, 0, this.size / 4, this.size / 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw eye
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.size / 6, -this.size / 6, this.size / 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(this.size / 6 + 2, -this.size / 6, this.size / 16, 0, Math.PI * 2);
    ctx.fill();

    // Draw beak
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(this.size / 3, 0);
    ctx.lineTo(this.size / 2 + 5, -3);
    ctx.lineTo(this.size / 2 + 5, 3);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.size,
      top: this.y,
      bottom: this.y + this.size,
    };
  }

  reset(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.rotation = 0;
  }
}
