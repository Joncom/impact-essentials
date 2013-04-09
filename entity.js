/*
 * Plugin for ImpactJS which adds useful methods to all entities.
 * @author   Jonathan Commins
 * @modified April 8, 2013
 * @version  1.7
 *
 * Version History:
 * 1.0 - Created.
 * 1.1 - Added isTouchingTile method.
 * 1.2 - Added isOnScreen method.
 * 1.3 - Added angleToCoord method.
 * 1.4 - Modified setVelocityByCoord to be more performant.
 * 1.5 - Added new method setAccelByCoord.
 * 1.6 - Added setVelocityByTile method.
 * 1.7 - Added setAccelByAngle method.
 */
ig.module('plugins.joncom.entity')
.requires('impact.entity')
.defines(function() {
    ig.Entity.inject({
        angleToCoord: function(x, y) {
            var centerX = this.pos.x + this.size.x/2;
            var centerY = this.pos.y + this.size.y/2;
            var angle = Math.atan2(y - centerY, x - centerX);
            return angle;
        },
        setVelocityByCoord: function(x, y, velocity) {
            var distance_x = x - (this.pos.x + this.size.x/2);
            var distance_y = y - (this.pos.y + this.size.y/2);
            this.vel.x = (distance_x >= 0 ? 1 : -1) * velocity * (Math.abs(distance_x) / (Math.abs(distance_x) + Math.abs(distance_y)));
            this.vel.y = (distance_y >= 0 ? 1 : -1) * velocity * (Math.abs(distance_y) / (Math.abs(distance_x) + Math.abs(distance_y)));
        },
        setVelocityByTile: function(tileX, tileY, velocity) {
            var tilesize = ig.game.collisionMap.tilesize;
            var tileCenterX = tileX * tilesize + tilesize / 2;
            var tileCenterY = tileY * tilesize + tilesize / 2;
            var entityCenterX = this.pos.x + this.size.x / 2;
            var entityCenterY = this.pos.y + this.size.y / 2;
            var distanceX = tileCenterX - entityCenterX;
            var distanceY = tileCenterY - entityCenterY;
            this.vel.x = (distanceX >= 0 ? 1 : -1) * velocity * (Math.abs(distanceX) / (Math.abs(distanceX) + Math.abs(distanceY)));
            this.vel.y = (distanceY >= 0 ? 1 : -1) * velocity * (Math.abs(distanceY) / (Math.abs(distanceX) + Math.abs(distanceY)));
        },
        setVelocityByAngle: function(angle, velocity) {
            var slope = Math.tan(angle);
            var x_factor = (Math.abs(angle) < 1.57 ? 1 : -1); // 1.57 rads ~~ 90 degrees
            var y_factor = (angle > 0 ? 1 : -1);
            var rise = (Math.abs(slope) / (1 + Math.abs(slope)));
            var run = (1 / (1 + Math.abs(slope)));
            this.vel.y = y_factor * velocity * rise;
            this.vel.x = x_factor * velocity * run;
        },
        setAccelByCoord: function(x, y, accel) {
            var distance_x = x - (this.pos.x + this.size.x/2);
            var distance_y = y - (this.pos.y + this.size.y/2);
            this.accel.x = (distance_x >= 0 ? 1 : -1) * accel * (Math.abs(distance_x) / (Math.abs(distance_x) + Math.abs(distance_y)));
            this.accel.y = (distance_y >= 0 ? 1 : -1) * accel * (Math.abs(distance_y) / (Math.abs(distance_x) + Math.abs(distance_y)));
        },
        setAccelByAngle: function(angle, accel) {
            var slope = Math.tan(angle);
            var x_factor = (Math.abs(angle) < 1.57 ? 1 : -1); // 1.57 rads ~~ 90 degrees
            var y_factor = (angle > 0 ? 1 : -1);
            var rise = (Math.abs(slope) / (1 + Math.abs(slope)));
            var run = (1 / (1 + Math.abs(slope)));
            this.accel.y = y_factor * accel * rise;
            this.accel.x = x_factor * accel * run;
        },
        isTouchingTile: function(x, y) {
            var tilesize = ig.game.collisionMap.tilesize;
            return (
                this.pos.x + this.size.x - 1 >= x * tilesize &&
                this.pos.x < x * tilesize + tilesize &&
                this.pos.y + this.size.y - 1 >= y * tilesize &&
                this.pos.y < y * tilesize + tilesize
            );
        },
        isOnScreen: function() {
            return (
                this.pos.x + this.size.x - 1 >= ig.game.screen.x &&
                this.pos.x < ig.game.screen.x + ig.system.width &&
                this.pos.y + this.size.y - 1 >= ig.game.screen.y &&
                this.pos.y < ig.game.screen.y + ig.system.height
            );
        }
    });
});