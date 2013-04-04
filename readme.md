## Installation ##
1. Download plugin and place in `/lib/plugins/joncom/` folder.
2. Load plugin within Impact `requires` call.

## Methods ##

#angleToCoord(x, y)#
Returns angle in radians between point (x, y) and center of entity.

#setVelocityByCoord(x, y, velocity)#
Will set `entity.vel.x` and `y` causing entity to travel at a speed of `velocity`, toward point (`x`, `y`).

#setVelocityByAngle(angle, velocity)#
Will set `entity.vel.x` and `y` causing entity to travel at a speed of `velocity`, in the direction defined by `angle`.

#isTouchingTile(x, y)#
Returns `true` if any part of the entity is overlapping tile (x, y). Otherwise returns `false`.

#isOnScreen()#
Returns `true` if the entity overlaps the screen. Otherwise returns `false`.